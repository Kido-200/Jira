import React, { ReactNode } from "react";

//ReactElement就是jsx通过React.createElement创建出来的值,所以babel编译前我们写的就是jsx
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

//其实有个库react-error-boundary可以直接用
//React.PropsWithChildren相当于{children:ReactNode}
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };

  //当子组件抛出异常,这里会接受到并且调用
  //返回值会作为新state
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    } else {
      return children;
    }
  }
}

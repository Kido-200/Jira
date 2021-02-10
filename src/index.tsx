import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { loadDevTools } from "jira-dev-tool";
//必须写在jira-dev-tool后面引入,因为他也用到了antd,不然的话我们自定义主题没用
import "antd/dist/antd.less";
import { AppProviders } from "context";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      {/* 注意了AppProviders是我们自己写的函数组件,App作为他的children必须要在他里面手动渲染children */}
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

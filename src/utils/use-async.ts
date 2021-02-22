import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

//D是data的类型
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [mountedRef, dispatch]
  );
};

//处理异步请求的 Error和Loading问题
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const [retry, setRetry] = useState(() => {
    return () => {};
  });
  /**不能写成let retry = () => {}
   * 因为react一直都有人触发重新渲染
   * 当别人触发重新渲染，整个组件重新更新
   * 这个retry就又被初始化成了空函数,而run一般是useEffect的deps改变才会触发
   * 这样就丢失了保存的oldPromise了
   */

  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: "error",
        data: null,
      }),
    [safeDispatch]
  );

  //用来触发异步请求,更新state
  //传入一个Promise会把promise返回的data保存在data里
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promise类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) run(runConfig?.retry(), runConfig);
      });
      // state会出现在deps里,而dispatch改变state导致无限循环,我们可以用函数dispatch解决
      // dispatch({ ...state, stat: "loading" });
      safeDispatch({ stat: "loading" });
      return (
        promise
          .then((data) => {
            //组件还在,没被卸载,才去修改state  不然state都已经被卸载掉了去修改state会报错
            setData(data);
            return data;
          })
          //catch会消化异常,如果不主动抛出,外面会接受不到异常
          .catch((error) => {
            setError(error);
            //默认不抛出,即外面不用写catch
            if (config.throwOnError) return Promise.reject(error);
            return error;
          })
      );
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    //retry被调用时重新跑一遍run,让state刷新一遍
    retry,
    setError,
    ...state,
  };
};

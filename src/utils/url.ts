import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { clearnObject } from "utils";

// 返回url中指定键的参数值 以及修改他的函数
// [{} , ()=>{}]
//注意这是来自react-router-dom的方法，必须在BrowserRouter或HashRouter下使用
//因为他也是用context实现的BrowserRouter相当于Provider
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  //返回一个URLSearchParams  这个对象不能直接获取属性,必须用get,has这种函数
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    //只有searchParams改变的时候改变param
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      //searchParams keys是hook的,会进行复用,所以可以传
      [searchParams, keys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      //Object.fromEntries把map或键值对列表返回成对象
      //...Object.fromEntries(searchParams)这样就可以兼容setParams({某个属性的修改}),外面就不用每次传整个完整的Params了

      const o = clearnObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;

      return setSearchParams(o);
    },
  ] as const;
};

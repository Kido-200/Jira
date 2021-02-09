import { useEffect, useState } from "react";
import { callbackify } from "util";

//单独处理0  null undefined会被 !value排除
export const isFalsy = (value: any) => (value === 0 ? false : !value);
//在一个函数里,改变传入的对象本身是不好的
export const clearnObject = (object: object) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    //@ts-ignore
    const value = object[key];
    //注意不能写成!value因为value为0也会被删掉,显然不能删,注意这是个坑
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

//useDebounce作用是防抖保存value更新后的值
//注意value需要是一个useState创建的state,这样他的改变才能触发重新渲染才能触发effect调用
export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

//单独处理0  null undefined会被 !value排除
export const isFalsy = (value) => (value === 0 ? false : !value);
//在一个函数里,改变传入的对象本身是不好的
export const clearnObject = (object) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    //注意不能写成!value因为value为0也会被删掉,显然不能删,注意这是个坑
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

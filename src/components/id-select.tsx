import { Select } from "antd";
import React from "react";
import { Raw } from "types";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  //id就是Option.value的类型,这是服务端决定的
  options?: { name: string; id: number }[];
}

/**
 * value可以传入多种类型的值
 * onChange只会回调number|undefined 类型
 * 当isNaN(Number(value))为true,选择默认类型
 * 选择默认类型,onChange回调undefined
 * @param props
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      {...restProps}
      //外面传进来的value是unknown,自己改成number与Option里的value一致(服务端决定的Option)
      value={options?.length ? toNumber(value) : 0}
      //这里传进来的value是下面Option的value类型,也就是unknown
      //给外面传过去的value要对这个unknown进行改造,改造成number||undefined(0的情况)
      onChange={(value) => onChange(toNumber(value) || undefined)}
    >
      {defaultOptionName ? (
        //Option里的value始终保持是number类型
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option value={option.id} key={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import { UserSelect } from "components/user-select";
import React from "react";
import { Project } from "../../types/project";
import { User } from "../../types/user";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    //引入了emotion的css必须在文件开头指定jsx
    <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          // 受控组件写法
          value={param.name}
          onChange={(evt) =>
            setParam({
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        {/* 当Option value和Select value相同时被选中 
          不管你setParam是什么类型,他通过searchParams.get得到的一定是string
          因为user.id是number类型
          所以后面点击 Select=string  Option=number
          永远匹配不到了,匹配不到Option则显示Select value
        */}
        <UserSelect
          //UserSelect已经保证了这个value最终传给Select会是一个number
          value={param.personId}
          //UserSelect已经保证了这个value一定是个number||undefined(选defalut的情况)
          //为什么是undefined的呢,因为undefined的情况personId就会在urlParam被过滤
          //因为setParam对传入的props进行了clearnObject
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
          defaultOptionName="负责人"
        />
      </Form.Item>
    </Form>
  );
};
export default SearchPanel;

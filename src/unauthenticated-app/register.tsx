import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
    } else {
      run(register(values)).catch(onError);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      {/* 这个name是antd用来推断给handleSubmit传的对象的属性名 */}
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder="确认密码" type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;

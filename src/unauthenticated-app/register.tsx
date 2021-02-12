import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";

const RegisterScreen = () => {
  const { register, user } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
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
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;

import styled from "@emotion/styled";
import { Button, Drawer, Input, Spin, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import React, { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/project";
import { useProjectModal, useProjectsQueryKey } from "./util";

export const ProjectModal = () => {
  //用这个hook管理modal开关行为与状态
  const {
    projectModalOpen,
    close,
    editingProject,
    isLoading,
  } = useProjectModal();
  //antd提供的form的ref
  const [form] = useForm();

  //根据editingProject判断是增加project还是修改  ,运行返回对应的useMutation的返回值
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  //获得react-query包装后对应的请求方式
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(
    useProjectsQueryKey()
  );
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const title = editingProject ? "编辑项目" : "创建项目";

  //别忘了useEffect在react commit阶段后异步调用
  //为了编辑的时候能提前填好
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    //不管是否隐藏都渲染执行一次
    <Drawer
      forceRender={true}
      onClose={close}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "请输入项目名称",
                  },
                ]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>

              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[
                  {
                    required: true,
                    message: "请输入部门名",
                  },
                ]}
              >
                <Input placeholder={"请输入部门名"} />
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        {/* <Button onClick={close}>关闭</Button> */}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

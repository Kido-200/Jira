import { Dropdown, Menu, Modal } from "antd";
import Table, { TableProps } from "antd/lib/table";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { useDeleteProject, useEditProject } from "utils/project";
import { Project } from "../../types/project";
import { User } from "../../types/user";
import { useProjectModal, useProjectsQueryKey } from "./util";

//TableProps传入一个泛型RecordType也就是dataSource的类型
//TableProps自带了Table上所有的属性?
interface ListProps extends TableProps<Project> {
  users: User[];
}

//用TableProps配合这里的props能完成属性透传
//Table里直接 {...props}就可以了
const List = ({ users, ...props }: ListProps) => {
  //不能在这种事件触发和if语句等调用hook,所以我们只能用effect返回出一个方法来调用
  const { mutate } = useEditProject(useProjectsQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      pagination={false}
      // 别忘了rowKey
      //在 Table 中，dataSource 和 columns 里的数据值都需要指定 key 值。
      //如果 dataSource[i].key 没有提供，你应该使用 rowKey 来指定 dataSource 的主键
      rowKey="id"
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            //星星亮不亮是后台pin属性决定,所以onChange要触发请求操作数据库
            //不能在这种事件触发和if语句等调用hook,所以我们只能用effect返回出一个方法来调用
            //id是形成dom的时候就知道的,pin是要等服务器返回的 可以用柯里化来区分 这是一种编程风格
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
          key: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗?",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={editProject(project.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item
            key={"delete"}
            onClick={() => confirmDeleteProject(project.id)}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

export default List;

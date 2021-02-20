import Table, { TableProps } from "antd/lib/table";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "./search-panel";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

//TableProps传入一个泛型RecordType也就是dataSource的类型
//TableProps自带了Table上所有的属性?
interface ListProps extends TableProps<Project> {
  users: User[];
}

//用TableProps配合这里的props能完成属性透传
//Table里直接 {...props}就可以了
const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      // 别忘了rowKey
      rowKey="id"
      columns={[
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
      ]}
      {...props}
    />
  );
};

export default List;

import React, { useState } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { useDebounce, useDocumentTitle } from "utils";

import styled from "@emotion/styled";
import { Typography } from "antd";

import { useProjects } from "../../utils/project";
import { useUsers } from "utils/user";

const ProjectListScrren = () => {
  const [param, setParam] = useState({
    //项目的名称  input管理
    name: "",
    //select选择的负责人
    personId: "",
  });

  //比起传统的防抖保存函数,我们的effect因为是根据值改变而调用的,所以在hook里的防抖只需要保存dep值就好了
  const debouncedParam = useDebounce(param, 500);
  //select内容,所有项目负责人名称

  const { isLoading, error, data: list } = useProjects(debouncedParam);
  //解构赋值,把data赋值给users
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScrren;

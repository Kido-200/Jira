import React from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { useDebounce, useDocumentTitle } from "utils";

import styled from "@emotion/styled";
import { Typography } from "antd";

import { useProjects } from "../../utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";

const ProjectListScrren = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500));
  //解构赋值,把data赋值给users
  const { data: users } = useUsers();

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

// ProjectListScrren.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScrren;

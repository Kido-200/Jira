import React from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { useDebounce, useDocumentTitle } from "utils";

import styled from "@emotion/styled";
import { Button, Typography } from "antd";

import { useProjects } from "../../utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";
import { Row } from "components/lib";

const ProjectListScrren = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();
  //只有param改变才会去重新请求list,又因为pin改变不会改变url,就不会重新请求了
  //而 pin改变就是不会改变url的所以我们给useAsync添加一个retry实现重新调用run去请求projects更新
  //注意这个run必须是对应的projects的useAsync的hook对应的run,只有这个run能改变这个组件的projects
  //不然就是生成了一个新data和dom上的无关的
  const { isLoading, error, data: list, retry } = useProjects(
    useDebounce(param, 500)
  );
  //解构赋值,把data赋值给users
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        projectButton={props.projectButton}
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

// ProjectListScrren.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScrren;

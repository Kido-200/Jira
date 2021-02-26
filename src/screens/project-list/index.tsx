import React from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { useDebounce, useDocumentTitle } from "utils";

import styled from "@emotion/styled";
import { Button, Typography } from "antd";

import { useProjects } from "../../utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";

const ProjectListScrren = (props: {}) => {
  useDocumentTitle("项目列表", false);

  //{name:,personId?} name必须存在,即使url里不存在param里的name=''也有意义表示搜索所有
  //而personId=''就从param里删除 = undefined因为他没有意义
  //发请求发的是这个param而不是完完全全的url里的值,因为url不存在name而发请求发name=""表示获取全部
  const [param, setParam] = useProjectsSearchParams();
  //只有param改变才会去重新请求list,又因为pin改变不会改变url,就不会重新请求了
  //而 pin改变就是不会改变url的所以我们给useAsync添加一个retry实现重新调用run去请求projects更新
  //注意这个run必须是对应的projects的useAsync的hook对应的run,只有这个run能改变这个组件的projects
  //不然就是生成了一个新data和dom上的无关的
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500));
  //解构赋值,把data赋值给users
  const { data: users } = useUsers();
  const { open } = useProjectModal();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />

      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

// ProjectListScrren.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScrren;

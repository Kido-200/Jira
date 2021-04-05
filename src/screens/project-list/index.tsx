import React from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { useDebounce, useDocumentTitle } from "utils";

import styled from "@emotion/styled";

import { useProjects } from "../../utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";

const ProjectListScrren = () => {
  useDocumentTitle("项目列表", false);

  //{name:,personId?} name必须存在,即使url里不存在param里的name=''也有意义表示搜索所有
  //而personId=''就从param里删除 = undefined因为他没有意义
  //发请求发的是这个param而不是完完全全的url里的值,因为url不存在name而发请求发name=""表示获取全部
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500));
  //解构赋值,把data赋值给users 返回的是负责人
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
  /* 父亲开了flex  子元素变成由内容撑开宽度,所以要设置flex:1膨胀到最大 */
  flex: 1;
`;

export default ProjectListScrren;

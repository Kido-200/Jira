import React, { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { clearnObject, useDebounce, useMount } from "utils";

import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL;

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
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const client = useHttp();

  //返回input对应的项目  如果为空返回所有项目
  useEffect(() => {
    client("projects", {
      data: clearnObject(debouncedParam),
    }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScrren;

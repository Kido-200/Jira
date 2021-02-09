import React, { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { clearnObject, useDebounce, useMount } from "utils";

import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListScrren = () => {
  const [param, setParam] = useState({
    //项目的名称  input管理
    name: "",
    //select选择的负责人
    personId: "",
  });
  //比起传统的防抖保存函数,我们的effect因为是根据值改变而调用的,所以在hook里的防抖只需要保存dep值就好了
  const paramDebounce = useDebounce(param, 500);
  //select内容,所有项目负责人名称
  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  //返回input对应的项目  如果为空返回所有项目
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(clearnObject(paramDebounce))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [paramDebounce]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectListScrren;

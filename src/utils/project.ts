import { useEffect } from "react";
import { clearnObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { Project } from "../screens/project-list/list";

//就实现了直接调用这个就能异步获取到projects列表
//并且具有error和loading判断
//param改变一次调用一次
//更加抽象了
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  //返回input对应的项目  如果为空返回所有项目
  useEffect(() => {
    run(client("projects", { data: clearnObject(param || {}) }));
  }, [param]);
  return result;
};

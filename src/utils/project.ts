import { useCallback, useEffect } from "react";
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

  const fetchProjects = useCallback(
    () => client("projects", { data: clearnObject(param || {}) }),
    [client, param]
  );

  //返回input对应的项目  如果为空返回所有项目
  //fetchProjects()执行完传进去的promise你保存了也没用
  //因为resolve只会调用一次,只有resolve调用的时候Promise才会执行后续then
  //所以只能传完整的fetch进去
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param, fetchProjects]);
  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (id: number, params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

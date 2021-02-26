import { useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

  //param改变则重新触发useQuery请求数据并重新渲染
  //<returnDataType,errorType>
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     })
  //   );
  // };

  //修改数据用useMutation,注意iuseMutation不会触发重新渲染
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      //需要在修改数据完后手动触发渲染 这里queryClient让projects无效重新请求projects并渲染
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

//获取project详情
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      //id有值的时候才触发上面函数  undefined这种不触发
      enabled: !!id,
    }
  );
};

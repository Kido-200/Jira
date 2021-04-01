import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectsSearchParams } from "screens/project-list/util";
import { useHttp } from "utils/http";
import { Project } from "../screens/project-list/list";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

//就实现了直接调用这个就能异步获取到projects列表
//并且具有error和loading判断
//param改变一次调用一次
//更加抽象了
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  //param改变则重新触发useQuery请求数据并重新渲染
  //<returnDataType,errorType>
  //useQuery返回{data,isLoading,error}
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

//project数据部分更新
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  //修改数据用useMutation,注意useMutation不会触发重新渲染
  //useMutation返回一个对象{mutate,mutateAsync, error, isLoading: mutateLoading}
  //调用mutate就是下面这个函数
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

//添加project
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
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

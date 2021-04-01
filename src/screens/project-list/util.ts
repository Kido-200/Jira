import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProject } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

//项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param, setParam] = useUrlQueryParam(keys);

  return [
    //{name:,personId?} name必须存在name=''也有意义表示搜索所有 而personId=''请求的时候不用带上
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  //同步获取url中editingProjectId(正在编辑的详情Id)
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const setUrlParams = useSetUrlSearchParam();

  //异步请求获得editingProjectId对应数据内容
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => {
    setProjectCreate({ projectCreate: true });
  };
  //undefined这样就可以让false的时候不在url显示
  const close = () => {
    //react的state不是立刻更新的上面这样会出错
    // setProjectCreate({ projectCreate: undefined })
    // setEditingProjectId({editingProjectId:undefined})
    //这样就好了 一起修改
    setUrlParams({ projectCreate: "", editingProjectId: "" });
  };

  //改变url中editingProjectId
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};

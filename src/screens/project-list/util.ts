import { useMemo, useState } from "react";
import { useUrlQueryParam } from "utils/url";

//项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param, setParam] = useUrlQueryParam(keys);

  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  //这样就可以让false的时候不在url显示
  const close = () => setProjectCreate({ projectCreate: undefined });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};

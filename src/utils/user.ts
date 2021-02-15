import { useEffect } from "react";
import { User } from "screens/project-list/search-panel";
import { clearnObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

//和project同理
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  //返回input对应的项目  如果为空返回所有项目
  useEffect(() => {
    run(client("users", { data: clearnObject(param || {}) }));
  }, [param]);
  return result;
};

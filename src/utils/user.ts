import { useEffect } from "react";
import { User } from "types/user";
import { clearnObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

//和project同理
export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  //返回对应负责人  如果为空返回所有
  useEffect(() => {
    run(client("users", { data: clearnObject(param || {}) }));
  }, [param]);
  return result;
};

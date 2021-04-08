import { useEffect } from "react";
import { useQuery } from "react-query";
import { User } from "types/user";
import { clearnObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

//和project同理

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["projects", param], () =>
    client("users", { data: param })
  );
};

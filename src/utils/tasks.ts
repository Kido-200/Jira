import { useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";

//获取看板数据
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  //param改变则重新触发useQuery请求数据并重新渲染
  //<returnDataType,errorType>
  //useQuery返回{data,isLoading,error}
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};

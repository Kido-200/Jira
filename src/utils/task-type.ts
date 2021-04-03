import { useQuery } from "react-query";
import { TaskType } from "types/task-type";
import { useHttp } from "./http";

//获取看板数据
export const useTaskTypes = () => {
  const client = useHttp();

  //param改变则重新触发useQuery请求数据并重新渲染
  //<returnDataType,errorType>
  //useQuery返回{data,isLoading,error}
  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};

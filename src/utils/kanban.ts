import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";

//获取看板数据 每次获取数据都要传Partial<数据类型> 因为是根据这玩意儿在数据库找的对应数据呀
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  //param改变则重新触发useQuery请求数据并重新渲染
  //<returnDataType,errorType>
  //useQuery返回{data,isLoading,error}
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};

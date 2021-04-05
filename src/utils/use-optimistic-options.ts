import { QueryKey, useQueryClient } from "react-query";

//用来生成useMutation后面的那个对象做乐观更新
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    //需要在修改数据完后手动触发渲染 这里queryClient让projects无效重新请求projects并渲染
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    //乐观更新Optimistic Updates   在Mutate发生的时候直接把缓存的数据改了
    async onMutate(target: any) {
      //从key里拿到缓存的数据
      const previousItems = queryClient.getQueryData(queryKey);
      //设置这个key对应缓存  可能是undefined 所以要判断
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        //return值作为缓存值
        return callback(target, old);
      });
      //返回的会到context对象里
      return { previousItems };
    },
    //在Mutate发生异常的时候调用  回滚机制
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));

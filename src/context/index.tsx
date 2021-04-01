import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { QueryClient, QueryClientProvider } from "react-query";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  /*两种写法相同 所以要给最里层Provider的props里加入children
   */
  // return <AuthProvider children={children}  />
  return (
    //react-query要client这个context来做缓存的
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

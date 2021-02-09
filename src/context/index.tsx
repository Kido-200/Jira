import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  /*两种写法相同 所以要给最里层Provider的props里加入children
   */
  // return <AuthProvider children={children}  />
  return <AuthProvider>{children}</AuthProvider>;
};

import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "types/user";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useQueryClient } from "react-query";

interface AuthForm {
  username: string;
  password: string;
}

//mount之后做身份验证,如果通过,把服务器返回回来的user返回出去
const bootstrapUser = async () => {
  let user = null;
  //取出localstorage里的token
  const token = auth.getToken();
  if (token) {
    //发请求给后台看看这个token对不对
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

//Authcontext保存user状态和对user的操作方法
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  const queryClient = useQueryClient();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      //缓存清一下,防止换号还用上一个人的缓存
      queryClient.clear();
    });
  /*
   相当于 Provider里面的是会被渲染出来的，react应该在内部return了类似 <>{children}</>
   <AuthContext.Provider>
    {children}
   </AuthContext.Provider>
  */

  useMount(() => {
    //判断localstorage里的token是否有效，有效就让data绑定上user
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  //用户没登录成功不一定是token过期，有可能是服务器炸了,所以显示一下error比较好
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};

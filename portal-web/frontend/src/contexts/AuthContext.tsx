import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

import { User } from "../types/User";
import login from "../api/services/auth";

export type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    const data = await login(email, password);

    if (!data) return false;

    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      type: data.type,
    };

    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setCookie("token", data.token);

    return true;
  };

  const signOut = () => {
    setUser(null);
    removeCookie("token");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

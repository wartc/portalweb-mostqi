import Cookies from "js-cookie";
import { createContext, useState, useContext, useEffect } from "react";

import { login } from "../api/services/auth";
import { User } from "../types/User";

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      const userStorage = localStorage.getItem("user");
      if (userStorage) {
        setUser(JSON.parse(userStorage));
      }
    }

    setIsLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const signIn = async (email: string, password: string) => {
    return login(email, password)
      .then(({ user, token }) => {
        setUser(user);
        Cookies.set("accessToken", token, { path: "/" });
        localStorage.setItem("user", JSON.stringify(user));

        return Promise.resolve(user);
      })
      .catch(() => {
        return Promise.reject();
      });
  };

  const signOut = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

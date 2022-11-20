import { createContext, useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { decodeToken, isExpired } from "react-jwt";

import { api } from "../api";
import { login, refresh } from "../api/services/auth";
import { User } from "../types/User";

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getRefreshToken() {
      if (!cookie.accessToken) return;

      const res = await refresh();
      setCookie("accessToken", res.token);
    }

    const interval = setInterval(getRefreshToken, 25 * 60 * 1000); // 25 minutos
    return () => clearInterval(interval);
  }, [cookie, setCookie]);

  useEffect(() => {
    if (cookie.accessToken && !isExpired(cookie.accessToken)) {
      api.defaults.headers["Authorization"] = `Bearer ${cookie.accessToken}`;

      if (!user) {
        const storedUser = localStorage.getItem("user");
        const userToSet = JSON.parse(storedUser!);
        setUser(userToSet);
      }
    } else {
      removeCookie("accessToken");
      setUser(null);
      localStorage.removeItem("user");
    }

    setIsLoading(false);
  }, [cookie.accessToken, removeCookie, user]);

  const signIn = async (email: string, password: string) => {
    return login(email, password)
      .then(({ user, token }) => {
        setUser(user);
        setCookie("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        return Promise.resolve(user);
      })
      .catch(() => {
        return Promise.reject();
      });
  };

  const signOut = () => {
    removeCookie("accessToken");
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

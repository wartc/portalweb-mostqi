import { createContext, useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { decodeToken, isExpired } from "react-jwt";

import { api } from "../api";
import { login } from "../api/services/auth";
import { User } from "../types/User";

type UserBasicInformation = Omit<User, "clientDetails" | "createdBy" | "createdAt" | "updatedAt">;

export type AuthContextType = {
  user: UserBasicInformation | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<UserBasicInformation>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const [user, setUser] = useState<UserBasicInformation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cookie.token && !isExpired(cookie.token)) {
      api.defaults.headers["Authorization"] = `Bearer ${cookie.token}`;

      const storedUser = localStorage.getItem("user");

      if (!user) {
        const { id, name, email, type } = storedUser
          ? JSON.parse(storedUser)
          : (decodeToken(cookie.token) as User);

        setUser({ id, name, email, type });

        if (!storedUser) {
          localStorage.setItem("user", JSON.stringify({ id, name, email, type }));
        }
      }
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }

    setIsLoading(false);
  }, [cookie.token, user]);

  const signIn = async (email: string, password: string) => {
    return login(email, password)
      .then(({ id, name, email, type, token }) => {
        const user = {
          id,
          name,
          email,
          type,
        };

        setUser(user);
        setCookie("token", token);

        return Promise.resolve(user);
      })
      .catch(() => {
        return Promise.reject();
      });
  };

  const signOut = () => {
    removeCookie("token");
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

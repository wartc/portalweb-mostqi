import { createContext, useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { decodeToken, isExpired } from "react-jwt";

import api from "../api/axios";
import { User } from "../types/User";
import login from "../api/services/auth";

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const [user, setUser] = useState<User | null>(null);
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
    const data = await login(email, password);
    console.log(data);

    if (!data) return null;

    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      type: data.type,
    };

    setUser(user);
    setCookie("token", data.token);

    return user;
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

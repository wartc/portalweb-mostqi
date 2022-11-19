import { User } from "../../types/User";
import { request } from "..";

export const login = async (email: string, password: string): Promise<User & { token: string }> => {
  return request("post", "/login", { email, password });
};

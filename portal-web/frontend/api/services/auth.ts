import { User } from "../../types/User";
import { request } from "..";

export const login = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  return request("post", "/login", { email, password });
};

export const refresh = async (): Promise<{ token: string }> => {
  return request("post", "/refresh");
};

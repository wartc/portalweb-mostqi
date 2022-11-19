import { User } from "../../types/User";
import { request } from "..";

export const register = async (name: string, email: string): Promise<User | null> => {
  return request("post", "/register", { name, email });
};

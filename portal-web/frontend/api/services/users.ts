import { User } from "../../types/User";
import { request } from "..";

export const getUsers = async (): Promise<User[]> => {
  return request("get", "/users");
};

export const getUser = async (id: string): Promise<User> => {
  return request("get", `/users/${id}`);
};

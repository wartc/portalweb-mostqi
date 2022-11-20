import { User } from "../../types/User";
import { request } from "..";

export const getUsers = async (page: number, pageSize: number): Promise<User[]> => {
  return request("get", "/users", null, {}, { page, pageSize });
};

export const getUser = async (id: string): Promise<User> => {
  return request("get", `/users`, null, { id });
};

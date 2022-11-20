import { User } from "../../types/User";
import { request, PaginatedResponse } from "..";

export const getUsers = async (page: number, size: number): Promise<PaginatedResponse<User>> => {
  return request("get", "/users", null, {}, { page, size });
};

export const getUser = async (id: string): Promise<User> => {
  return request("get", `/users`, null, { id });
};

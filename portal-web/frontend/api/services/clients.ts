import { User } from "../../types/User";
import { request, PaginatedResponse } from "..";

export const getClients = async (page: number, size: number): Promise<PaginatedResponse<User>> => {
  return request("get", "/clients", null, {}, { page, size });
};

export const searchClientsByName = async (
  name: string,
  page: number,
  size: number
): Promise<PaginatedResponse<User>> => {
  return request("get", `/clients/search`, null, { name }, { page, size });
};

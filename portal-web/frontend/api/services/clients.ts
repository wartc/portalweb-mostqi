import { User } from "../../types/User";
import { request, PaginatedResponse } from "..";

export const getClients = (page: number, size: number): Promise<PaginatedResponse<User>> => {
  return request("get", "/clients", null, {}, { page, size });
};

export const searchClientsByNameOrCreator = (
  name: string,
  searchByClient: boolean,
  page: number,
  size: number
): Promise<PaginatedResponse<User>> => {
  return request(
    "get",
    `/clients/search`,
    null,
    { name, searchByClient: searchByClient.toString() },
    { page, size }
  );
};

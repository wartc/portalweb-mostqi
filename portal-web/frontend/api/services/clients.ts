import { User } from "../../types/User";
import { request } from "..";

export const getClients = async (page: number, pageSize: number): Promise<User[]> => {
  return request("get", "/clients", null, {}, { page, pageSize });
};

export const searchClientsByName = async (
  name: string,
  page: number,
  pageSize: number
): Promise<User[]> => {
  return request("get", `/clients/search`, null, { name }, { page, pageSize });
};

import { CurrencyInformation } from "../../types/CurrencyInformation";
import { request, PaginatedResponse } from "..";

export const getCurrencyInformation = (
  startDate: string,
  endDate: string,
  page: number,
  size: number
): Promise<PaginatedResponse<CurrencyInformation>> => {
  return request("get", "/currency", null, { startDate, endDate }, { page, size });
};

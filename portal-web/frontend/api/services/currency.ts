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

export const getMeanMaxMinCurrencyInformation = (
  startDate?: string,
  endDate?: string
): Promise<{ mean?: number; min: number; max: number }> => {
  const startOfToday = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  const endOfToday = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();

  return request("get", "/currency/meanMinMax", null, {
    startDate: startDate || startOfToday,
    endDate: endDate || endOfToday,
  });
};

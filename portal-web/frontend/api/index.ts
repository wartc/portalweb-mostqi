import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export type PaginatedResponse<T> = {
  data: T[];
  hasNextPage: boolean;
};

export const request = async <TRequest, TResponse>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: TRequest,
  queryParams?: Record<string, string>,
  pagination?: {
    page: number;
    size: number;
  }
) => {
  const onSuccess = (response: { data: TResponse }) => {
    console.log(response);
    return Promise.resolve(response.data);
  };

  const onError = (error: { response: string }) => {
    console.error(error.response);
    return Promise.reject();
  };

  return api({
    method,
    url,
    data,
    params: {
      ...(queryParams ?? {}),
      ...(pagination ?? {}),
    },
  })
    .then(onSuccess)
    .catch(onError);
};

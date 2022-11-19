import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const request = async <TRequest, TResponse>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: TRequest
) => {
  const onSuccess = (response: { data: TResponse }) => {
    return response.data;
  };

  const onError = (error: { response: string }) => {
    console.error(error.response);
    return Promise.reject();
  };

  return api({ method, url, data }).then(onSuccess).catch(onError);
};

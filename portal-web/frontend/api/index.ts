import axios from "axios";
import Cookies from "js-cookie";
import { refresh } from "./services/auth";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const { user, token } = await refresh();

          Cookies.set("accessToken", token);
          api.defaults.headers["Authorization"] = `Bearer ${token}`;
          localStorage.setItem("user", JSON.stringify(user));

          originalConfig.headers["Authorization"] = `Bearer ${token}`;

          return api.request(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export type PaginatedResponse<T> = {
  data: T[];
  hasNextPage: boolean;
};

export const request = <TRequest, TResponse>(
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
    return Promise.resolve(response.data);
  };

  const onError = (error: { response: string }) => {
    console.error(error.response);
    return Promise.reject(error.response);
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

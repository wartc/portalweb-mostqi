import axios from "axios";

export const api = axios.create({
  baseURL: "https://mostqiapi.com",
});

const authenticate = async () => {
  return api.post("/user/authenticate/", {
    token: process.env.NEXT_PUBLIC_MOST_CLIENT_KEY,
  });
};

export const request = async <TRequest, TResponse>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: TRequest,
  headers?: any
) => {
  const onSuccess = (response: { data: TResponse }) => {
    return Promise.resolve(response.data);
  };

  const onError = (error: { response: string }) => {
    console.error(error.response);
    return Promise.reject();
  };

  const authorizationToken = await authenticate();

  return api({
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${authorizationToken.data.token}`,
      ...headers,
    },
  })
    .then(onSuccess)
    .catch(onError);
};

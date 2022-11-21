import { request } from "./api";

const liveness = (data: any) => {
  return request("post", "/liveness/detect", data, {
    "Content-Type": "multipart/form-data",
  });
};

export default liveness;

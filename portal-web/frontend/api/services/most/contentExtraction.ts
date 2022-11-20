import { request } from "./api";

const contentExtraction = async (data: any) => {
  return request("post", "/process-image/content-extraction", data, {
    "Content-Type": "multipart/form-data",
  });
};

export default contentExtraction;

import { request } from "./api";

const faceCompare = async (data: {
  faceFileBase64A: string;
  faceFileBase64B: string;
}): Promise<{
  result: { distances: number[] };
}> => {
  return request("post", "/process-image/biometrics/face-compare", data, {
    "Content-Type": "application/json",
  });
};

export default faceCompare;

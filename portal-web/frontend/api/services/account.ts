import { request } from "..";

export const changePassword = (currentPassword: string, newPassword: string) => {
  return request("post", "/account/changePassword", { currentPassword, newPassword });
};

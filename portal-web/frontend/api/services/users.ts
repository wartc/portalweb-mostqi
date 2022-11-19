import { User } from "../../types/User";
import api from "../axios";

export const getUsers = async (): Promise<User[]> => {
  return api
    .get("/users")
    .then(({ data }) => Promise.resolve(data))
    .catch(({ response }) => {
      console.error(response);
      return Promise.reject();
    });
};

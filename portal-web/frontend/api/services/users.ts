import { User } from "../../types/User";
import api from "../axios";

export const getUsers = async (): Promise<User[] | null> => {
  return api
    .get("/users")
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return null;
    });
};

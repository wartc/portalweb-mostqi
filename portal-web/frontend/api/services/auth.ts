import { User } from "../../types/User";
import api from "../axios";

const login = async (email: string, password: string): Promise<User & { token: string }> => {
  return api
    .post("/login", { email, password })
    .then(({ data }) => Promise.resolve(data))
    .catch(({ response }) => {
      console.error(response);
      return Promise.reject();
    });
};

export default login;

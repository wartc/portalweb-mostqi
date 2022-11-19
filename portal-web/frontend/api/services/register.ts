import { User } from "../../types/User";
import api from "../axios";

const register = async (name: string, email: string): Promise<User | null> => {
  return api
    .post("/register", { name, email })
    .then(({ data }) => Promise.resolve(data))
    .catch(({ response }) => {
      console.error(response);
      return Promise.reject();
    });
};

export default register;

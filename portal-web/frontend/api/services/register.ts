import { User } from "../../types/User";
import api from "../axios";

const register = async (name: string, email: string): Promise<User | null> => {
  return api
    .post("/register", { name, email })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export default register;

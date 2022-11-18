import { User } from "../../types/User";
import api from "../axios";

const login = async (
  email: string,
  password: string
): Promise<(User & { token: string }) | null> => {
  return api
    .post("/login", { email, password })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export default login;

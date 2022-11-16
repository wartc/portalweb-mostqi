import api from "../axios";

type RegisterRequest = {
  name: string;
  email: string;
};

type RegisterResponse = {
  id: string;
  name: string;
  email: string;
  type: string;
};

const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post("/register", data);

  return response.data;
};

export default register;

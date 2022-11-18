export type UserTypes = "CONTRIBUTOR" | "CLIENT";

export type User = {
  id: string;
  name: string;
  email: string;
  type: UserTypes;
};

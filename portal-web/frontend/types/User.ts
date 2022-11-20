export type UserTypes = "CONTRIBUTOR" | "CLIENT";

export type User = {
  id: string;
  name: string;
  email: string;
  type: UserTypes;
  clientDetails?: {
    selfieUrl: string;
    documentUrl: string;
    rg: string;
    dob: Date;
  };
  createdBy?: User;
  createdAt: Date;
  updatedAt: Date;
};

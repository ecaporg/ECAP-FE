import type { IUser } from "@/types";

export const getUserName = (user: IUser) => {
  return user.name;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAdminOrDirector = (user: IUser) => {
  return ["ADMIN", "DIRECTOR", "SUPER_ADMIN"].includes(user.role || "");
};

export const isAnyAdmin = (user: IUser) => {
  return ["ADMIN", "SUPER_ADMIN"].includes(user.role || "");
};

"use client";
import type { User } from "@/types";

export const getUserName = (user: User) => {
  return `${user.firstname} ${user.lastname}`;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

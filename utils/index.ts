import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validationMessages = {
  required: (name: string) => `${name} is required`,
  minDate: (name: string, value: string) =>
    `${name} must be greater than ${value}`,
};

export * from "./learning-period";
export * from "./user";
export * from "./sample";
export * from "./type";
export * from "./track";
export * from "./dashboard";

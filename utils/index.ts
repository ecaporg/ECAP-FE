import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validationMessages = {
  required: (name: string) => `${name} is required`,
};

export * from './learning-period';
export * from './user';
export * from './sample';

import type { User } from '@/types';

export const getUserName = (user: User) => {
  return user.name;
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAdminOrDirector = (user: User) => {
  return ['ADMIN', 'DIRECTOR', 'SUPER_ADMIN'].includes(user.role || '');
};

export const isAnyAdmin = (user: User) => {
  return ['ADMIN', 'SUPER_ADMIN'].includes(user.role || '');
};

import type { User } from '@/types';

export const getUserName = (user: User) => {
  return `${user.firstname} ${user.lastname}`;
};

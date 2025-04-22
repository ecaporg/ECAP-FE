import type { User } from './user';

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type SignInDTO = {
  email: string;
  password: string;
};

export type CreateUserDTO = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

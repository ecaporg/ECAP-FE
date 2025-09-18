import type { IUser } from 'ecap-lib/dist/domain';

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: IUser;
};

export type SignInDTO = {
  email: string;
  password: string;
};

export type CreateUserDTO = {
  email: string;
  password: string;
  name: string;
};

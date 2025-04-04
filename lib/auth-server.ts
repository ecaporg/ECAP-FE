import type { User } from '@/types';

export async function getUserFromToken(token: string): Promise<User | null> {
  try {
    const userId = token;

    const user = null;

    return user || null;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<{ user: User; accessToken: string } | null> {
  try {
    const user = null;
    if (!user) {
      return null;
    }

    return {
      user,
      accessToken: user.id,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

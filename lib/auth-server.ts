import type { User } from '@/types';
import { cache } from 'react';

const testUsers = [
  {
      id: '1',
      email: 'admin@test.com',
      role: 'admin',
      roles: ['admin'],
      firstname: 'Admin',
      lastname: 'Admin',
  },
  {
      id: '2',
      email: 'teacher@test.com',
      role: 'teacher',
      roles: ['teacher'],
      firstname: 'Teacher',
      lastname: 'Teacher',
  }
]


const getUserFromToken = cache(async (token: string, refreshToken?: string): Promise<User | null> => {
  try {
    
    return testUsers.find(user => token.includes(user.id)) || null as any;
    // TODO: add api call in the future
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`, {
    //   method: 'POST',
    //   body: JSON.stringify({ token, refreshToken }),
    // });

    // if (!response.ok) {
    //   return null;
    // }

    // return (await response.json()).data as User;
  } catch (error) {
    return null;
  }
})

export { getUserFromToken };
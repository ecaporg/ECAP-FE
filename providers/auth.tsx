'use client';

import type React from 'react';

import { createContext, useContext } from 'react';
import type { User } from '@/types';
import { signOutAction } from '@/app/auth/actions';

type AuthContextType = {
  user: User;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, user }: { children: React.ReactNode; user: User }) {
  const signOut = () => {
    signOutAction();
  };

  return <AuthContext.Provider value={{ user, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

'use client';

import type React from 'react';

import { signOutAction } from '@/app/auth/actions';
import type { User } from '@/types';
import { createContext, useContext } from 'react';

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

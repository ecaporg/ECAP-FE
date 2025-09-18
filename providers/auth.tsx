"use client";

import type React from "react";

import { signOutAction } from "@/app/auth/actions";
import type { IUser } from "@/types";
import { createContext, useContext } from "react";

type AuthContextType = {
  user: IUser;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: IUser;
}) {
  const signOut = () => {
    signOutAction();
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

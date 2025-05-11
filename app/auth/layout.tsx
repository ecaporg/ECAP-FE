import { Metadata } from 'next';
import type React from "react";

export const metadata: Metadata = {
  title: "Authentication",
};

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="lg:w-full max-w-5xl w-4/5 bg-white flex flex-col items-center justify-center shadow-sm h-3/5 min-h-fit p-4">
        <h1 className="text-2xl text-primary mb-6">ECAP</h1>
        {children}
      </div>
    </div>
  );
}

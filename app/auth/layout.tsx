import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = {
  title: 'Authentication',
};

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex h-3/5 min-h-fit w-4/5 max-w-5xl flex-col items-center justify-center bg-white p-4 shadow-sm lg:w-full">
        <h1 className="mb-6 text-2xl text-primary">ECAP</h1>
        {children}
      </div>
    </div>
  );
}

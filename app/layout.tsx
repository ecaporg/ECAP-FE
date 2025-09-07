import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import '@/styles/globals.css';
import { Toaster } from '@/components/ui/sonner';
import { SearchParamsProvider } from '@/providers/search-params';
import { ThemeProvider } from '@/providers/theme';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ECAP',
    template: '%s | ECAP',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <Suspense>
          // this feature very slow down the server, so i have comment it out now
          <SearchParamsProvider />
        </Suspense> */}
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

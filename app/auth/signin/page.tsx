'use client';

import type React from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/providers/auth';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#1E88E5]">ECAP</h1>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="username"
              className="border-gray-300"
            />
          </div>
          <div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="password"
              className="border-gray-300"
            />
          </div>
          <Button type="submit" className="w-full bg-[#1E88E5] hover:bg-[#1976D2]">
            Sign In
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link href="#" className="text-sm text-[#1E88E5] hover:underline">
            Forgot password?
          </Link>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Demo credentials: admin@school.com / password</p>
        </div>
      </div>
    </div>
  );
}

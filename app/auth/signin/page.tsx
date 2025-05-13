'use client';

import { Button } from '@/components/ui/button';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { useSignIn } from '@/hooks/auth/useSignInForm';
import Link from 'next/link';
import type { Metadata } from 'next';

export default function SignIn() {
  const { register, handleSubmit, errors, isLoading, formError, onSubmit } = useSignIn();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
      <div>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          className="w-full max-w-80"
          aria-describedby="email-error"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          autoComplete="email"
        />
        <FormError id="email-error" message={errors.email?.message} className="mt-1 text-wrap" />
      </div>

      <div>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          className="w-full max-w-80"
          aria-describedby="password-error"
          {...register('password')}
          aria-invalid={errors.password ? 'true' : 'false'}
          autoComplete="current-password"
        />
        <FormError id="password-error" message={errors.password?.message} className="mt-1" />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      <FormError id="form-error" message={formError} />

      <Link href="#" className="text-base text-neutral-black hover:underline !mt-6 block">
        Forgot password?
      </Link>
    </form>
  );
}

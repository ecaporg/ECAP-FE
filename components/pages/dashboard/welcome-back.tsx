'use client';
import { useAuth } from '@/providers/auth';
import type { IAcademicYear } from '@/types';
import { getUserName } from '@/utils';

interface WelcomeBackProps {
  academicYear: IAcademicYear;
}

export const WelcomeBack = ({ academicYear }: WelcomeBackProps) => {
  const { user } = useAuth();
  return (
    <section className="flex w-full justify-between px-6 py-4 font-bold text-primary text-xl">
      <p>
        Welcome back, {getUserName(user)}
        {user.role === 'DIRECTOR' && (
          <span className="block font-semibold text-neutral-black text-xl">
            {user.director?.academy?.name} {' Academy'}
          </span>
        )}
      </p>
      <span className="ml-auto font-semibold text-lg">
        Academic Year:{' '}
        <span className="font-normal text-neutral-black">
          {academicYear.from} - {academicYear.to}
        </span>
      </span>
    </section>
  );
};

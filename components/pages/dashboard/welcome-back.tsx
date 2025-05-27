import { type AcademicYear, type StaffUser, User } from '@/types';
import { getUserName } from '@/utils';

interface WelcomeBackProps {
  user: StaffUser;
  academicYear: AcademicYear;
}

export const WelcomeBack = ({ user, academicYear }: WelcomeBackProps) => {
  return (
    <section className="text-xl font-bold flex w-full py-4 px-6 text-primary justify-between">
      <p>
        Welcome back, {getUserName(user)}
        {user.role === 'DIRECTOR' && (
          <span className="block text-xl font-semibold text-neutral-black">
            {user.director?.academy?.name} {' Academy'}
          </span>
        )}
      </p>
      <span className="ml-auto text-lg font-semibold">
        Academic Year: <span className="text-neutral-black font-normal">{academicYear.from} - {academicYear.to}</span>
      </span>
    </section>
  );
};

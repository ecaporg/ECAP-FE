import { AcademicYear, StaffUser, User } from '@/types';
import { getUserName } from '@/utils';

interface WelcomeBackProps {
  user: StaffUser;
  academicYear: AcademicYear;
}

export const WelcomeBack = ({ user, academicYear }: WelcomeBackProps) => {
  return (
    <section className="text-2xl font-bold flex w-full py-4 px-6">
      <p>
        Welcome back, {getUserName(user)}
        {user.role == 'DIRECTOR' && (
          <span className="block text-xl font-semibold">
            {user.director?.academy?.name} {' Academy'}
          </span>
        )}
      </p>
      <span className="ml-auto ">
        Academic Year: {academicYear.from} - {academicYear.to}
      </span>
    </section>
  );
};

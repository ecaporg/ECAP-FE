'use client';
import { Button } from '@/components/ui/button';
import { type Student, type Teacher, defaultUser } from '@/types';
import { getUserName } from '@/utils';
import { ArrowLeftIcon, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const BackToCompliance = ({ student }: { student?: Student }) => {
  if (!student) {
    student = { user: defaultUser } as Student;
  }
  const router = useRouter();
  return (
    <div className="flex items-center justify-between w-full py-5 font-semibold">
      <p
        className="text-primary cursor-pointer flex items-center gap-2 text-lg"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span className="hidden md:block">Back to Student Table</span>
      </p>
      <span className="text-xl text-neutral-black truncate">
        Student: {getUserName(student.user)}
      </span>
    </div>
  );
};

export const BackToTeacherTable = ({
  teacher,
  hasSignInButton = false,
}: {
  teacher?: Teacher;
  hasSignInButton?: boolean;
}) => {
  if (!teacher) {
    teacher = { user: defaultUser } as Teacher;
  }
  const router = useRouter();
  return (
    <div className="flex items-center justify-between w-full py-4 font-semibold h-20">
      <p
        onClick={() => router.back()}
        className="text-primary cursor-pointer flex items-center gap-2 text-lg"
      >
        <ArrowLeftIcon className="size-4" />
        <span className="hidden md:block truncate">Back to Teacher Table</span>
      </p>
      <span className="text-xl text-neutral-black">
        {getUserName(teacher.user)}
        {hasSignInButton && (
          <Button size="lg" className="ml-4 ">
            <UserIcon className="size-4" />
            <span className="truncate max-w-32 lg:max-w-max">
              Sign in as {getUserName(teacher.user)}
            </span>
          </Button>
        )}
      </span>
    </div>
  );
};

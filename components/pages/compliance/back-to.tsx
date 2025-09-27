'use client';
import { Button } from '@/components/ui/button';
import { defaultUser } from '@/constants/user';
import type { IStudent, ITeacher } from '@/types';
import { getUserName } from '@/utils';
import { ArrowLeftIcon, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const BackToCompliance = ({ student }: { student?: IStudent }) => {
  if (!student) {
    student = { user: defaultUser } as IStudent;
  }
  const router = useRouter();
  return (
    <div className="!basis-full flex w-full items-center justify-between py-5 font-semibold">
      <p
        className="flex cursor-pointer items-center gap-2 text-lg text-primary"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span className="hidden md:block">Back to Student Table</span>
      </p>
      <span className="truncate text-neutral-black text-xl">
        Student: {getUserName(student.user)}
      </span>
    </div>
  );
};

export const BackToTeacherTable = ({
  teacher,
  hasSignInButton = false,
}: {
  teacher?: ITeacher;
  hasSignInButton?: boolean;
}) => {
  if (!teacher) {
    teacher = { user: defaultUser } as ITeacher;
  }
  const router = useRouter();
  return (
    <div className="flex h-20 w-full items-center justify-between py-4 font-semibold">
      <p
        onClick={() => router.back()}
        className="flex cursor-pointer items-center gap-2 text-lg text-primary"
      >
        <ArrowLeftIcon className="size-4" />
        <span className="hidden truncate md:block">Back to Teacher Table</span>
      </p>
      <span className="text-neutral-black text-xl">
        {getUserName(teacher.user)}
        {hasSignInButton && (
          <Button size="lg" className="ml-4 ">
            <UserIcon className="size-4" />
            <span className="max-w-32 truncate lg:max-w-max">
              Sign in as {getUserName(teacher.user)}
            </span>
          </Button>
        )}
      </span>
    </div>
  );
};

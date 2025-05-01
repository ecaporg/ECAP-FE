"use client";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import type { Student, Teacher, User } from "@/types";
import { getUserName } from "@/utils";
import { ArrowLeftIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const user = {
  firstname: "N",
  lastname: "/A",
} as User;

export const BackToCompliance = ({ student }: { student?: Student }) => {
  if (!student) {
    student = { user } as Student;
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
      <span className="text-xl text-neutral-black">
        {getUserName(student.user)}
      </span>
    </div>
  );
};

export const BackToTeacherTable = ({ teacher }: { teacher?: Teacher }) => {
  if (!teacher) {
    teacher = { user } as Teacher;
  }
  const router = useRouter();
  return (
    <div className="flex items-center justify-between w-full py-4 font-semibold h-20">
      <p
        onClick={() => router.back()}
        className="text-primary cursor-pointer flex items-center gap-2 text-lg"
      >
        <ArrowLeftIcon className="size-4" />
        <span className="hidden md:block">Back to Teacher Table</span>
      </p>
      <span className="text-xl text-neutral-black">
        {getUserName(teacher.user)}
        <Button size="lg" className="ml-4">
          <UserIcon className="size-4" />
          Sign in as {getUserName(teacher.user)}
        </Button>
      </span>
    </div>
  );
};

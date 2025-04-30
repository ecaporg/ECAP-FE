"use client";
import { Button } from "@/components/ui/button";
import type { Student, Teacher } from "@/types";
import { getUserName } from "@/utils";
import { ArrowLeftIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackToCompliance = ({ student }: { student: Student }) => {
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

export const BackToTeacherTable = ({ teacher }: { teacher: Teacher }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between w-full py-5 font-semibold">
      <p
        className="text-primary cursor-pointer flex items-center gap-2 text-lg"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="size-4" />
        <span className="hidden md:block">Back to Teacher Table</span>
      </p>
      <span className="text-xl text-neutral-black">
        {getUserName(teacher.user)}
      </span>
      <Button size="lg">
        <UserIcon className="size-4" />
        Sign in as {getUserName(teacher.user)}
      </Button>
    </div>
  );
};

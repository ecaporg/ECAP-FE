"use client";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Student } from "@/types";
import { getUserName } from "@/utils";

export const BackToCompliance = ({ student }: { student: Student }) => {
  const router = useRouter();
  console.log(student);
  return (
    <div className="flex items-center justify-between w-full py-5 font-semibold">
      <p
        className="text-primary cursor-pointer flex items-center gap-2 text-lg"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span className="hidden md:block">Back to student table</span>
      </p>
      <span className="text-xl text-neutral-black">
        {getUserName(student.user)}
      </span>
    </div>
  );
};

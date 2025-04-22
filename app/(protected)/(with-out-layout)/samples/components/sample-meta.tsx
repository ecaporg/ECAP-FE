"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Flag, Upload } from "lucide-react";
import { Sample, SampleStatus } from "@/types/student";
import { useRouter } from "next/navigation";
type SampleMetaProps = {
  isReadOnly?: boolean;
  data: {
    studentName: string;
    courseTitle: string;
    assignmentTitle: string;
    grade: number;
    date: string;
  };
};

export function SampleInputs({
  isReadOnly = true,
  data = {} as any,
}: SampleMetaProps) {
  const inputs = [
    {
      label: "Student Name",
      value: data.studentName,
    },
    {
      label: "Course Title",
      value: data.courseTitle,
    },
    {
      label: "Assignment Title",
      value: data.assignmentTitle,
    },
    {
      label: "Grade",
      value: data.grade,
    },
    {
      label: "Date",
      value: data.date,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[min-content_minmax(auto,400px)] border border-border p-4 text-nowrap">
      {inputs.map((input) => (
        <>
          <Label className="px-4 h-11 content-center text-right">
            {input.label}:
          </Label>
          <Input
            className={isReadOnly ? "border-none !ring-transparent" : ""}
            readOnly={isReadOnly}
            value={input?.value}
          />
        </>
      ))}
    </div>
  );
}

export function SampleActionButtons({ sample }: { sample: Sample }) {
  const router = useRouter();
  const isDisabled = [
    SampleStatus.COMPLETED,
    SampleStatus.ERRORS_FOUND,
    SampleStatus.MISSING_SAMPLE,
    SampleStatus.FLAGGED_TO_ADMIN,
  ].some((status) => status === sample.status);

  return (
    <>
      <Button className="fixed top-12 right-12" size="lg" disabled={isDisabled}>
        <Flag className="w-4 h-4 mr-2" />
        Flag Error in Requirements
      </Button>
      <Button
        className="fixed bottom-12 right-12"
        size="lg"
        disabled={isDisabled}
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload to Student Pathways
      </Button>

      <Button
        className="fixed bottom-12 left-12"
        size="lg"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Subject Table
      </Button>
    </>
  );
}

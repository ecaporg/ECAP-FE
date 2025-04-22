"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Flag, Upload } from "lucide-react";
import { Sample } from "@/types/student";
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
          <Label className="px-4 h-11 content-center text-right">{input.label}:</Label>
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
  return (
    <>
      <Button className="fixed top-12 right-12" size="lg">
        <Flag className="w-4 h-4 mr-2" />
        Flag Error in Requirements
      </Button>
      <Button className="fixed bottom-12 right-12" size="lg">
        <Upload className="w-4 h-4 mr-2" />
        Apload to Student Pathways
      </Button>
      <Button className="fixed bottom-12 left-12" size="lg">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Subject Table
      </Button>
    </>
  );
}

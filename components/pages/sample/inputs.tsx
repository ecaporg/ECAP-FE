"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sample, SampleStatus } from "@/types/student";
import { z } from "zod";

import { getUserName, isAnyAdmin } from "@/utils";
import {
  sampleHeaderSchema,
  useSampleHeader,
} from "@/hooks/samples/use-sample-header";
import { useAuth } from "@/providers/auth";

type SampleMetaProps = {
  isReadOnly?: boolean;
  sample: Sample;
};

export function SampleInputs({ sample }: SampleMetaProps) {
  const { user } = useAuth();
  const inputs = [
    {
      label: "Student Name",
      defaultValue: getUserName(sample.assignment_period.student.user),
      name: "student_name",
    },
    {
      label: "Course Title",
      defaultValue: sample.subject.name,
      name: "course_title",
    },
    {
      label: "Assignment Title",
      defaultValue: sample.assignment_title,
      name: "assignment_title",
    },
    {
      label: "Grade",
      defaultValue: sample.grade,
      name: "grade",
    },
    {
      label: "Date",
      defaultValue: new Date(sample?.createdAt).toLocaleDateString(),
      name: "date",
    },
  ].map((input) => ({
    ...input,
    ...{
      isReadOnly: !(
        isAnyAdmin(user) ||
        (sample.status === SampleStatus.ERRORS_FOUND && !input.defaultValue)
      ),
    },
  }));

  const { form, onSubmit, onBlur, formRef } = useSampleHeader({
    sample,
  });

  return (
    <form
      ref={formRef}
      className="grid grid-cols-1 md:grid-cols-[min-content_minmax(auto,400px)] border border-border p-4 text-nowrap sticky top-6 z-[1] bg-white gap-1"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {inputs.map((input) => (
        <>
          <Label
            className="px-4 h-11 content-center md:text-right"
            key={`${input.name}-label`}
          >
            {input.label}:
          </Label>
          <Input
            key={`${input.name}-input`}
            className={input.isReadOnly ? "border-none !ring-transparent" : ""}
            readOnly={input.isReadOnly}
            defaultValue={input?.defaultValue}
            {...form.register(
              input.name as keyof z.infer<typeof sampleHeaderSchema>
            )}
            aria-invalid={
              !!form.formState.errors[
                input.name as keyof z.infer<typeof sampleHeaderSchema>
              ]
            }
            onBlur={(e) => {
              onBlur(e, input.label);
            }}
          />
        </>
      ))}
    </form>
  );
}

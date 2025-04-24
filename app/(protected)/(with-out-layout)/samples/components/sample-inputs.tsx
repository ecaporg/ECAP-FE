"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sample, SampleStatus } from "@/types/student";
import { CompletionStatus } from "@/components/table/complation-status";
import { z } from "zod";

import { getUserName } from "@/utils";
import {
  sampleHeaderSchema,
  useSampleHeader,
} from "@/hooks/samples/use-sample-header";

type SampleMetaProps = {
  isReadOnly?: boolean;
  sample: Sample;
};

function SampleBagde({ sample }: { sample: Sample }) {
  if (sample.status === SampleStatus.COMPLETED) {
    return (
      <div className="pb-6">
        <CompletionStatus variant="Complete" className="h-14 w-60">
          Grade added
        </CompletionStatus>
      </div>
    );
  }

  if (
    sample.status === SampleStatus.ERRORS_FOUND ||
    sample.status === SampleStatus.FLAGGED_TO_ADMIN
  ) {
    return (
      <div className="pb-6 flex items-center gap-4">
        <CompletionStatus variant="Overdue" className="h-14 w-60">
          Error flagged
        </CompletionStatus>
        <b>You comment: </b>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </div>
    );
  }

  return null;
}

export function SampleInputs({ sample }: SampleMetaProps) {
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
      //   defaultValue: sample.assignment_period.student.grade,
      name: "grade",
    },
    {
      label: "Date",
      defaultValue: new Date(sample?.createdAt).toLocaleDateString(),
      name: "date",
    },
  ].map((input) => ({
    ...input,
    ...(sample.status === SampleStatus.ERRORS_FOUND && !input.defaultValue
      ? {
          isReadOnly: false,
        }
      : {
          isReadOnly: true,
        }),
  }));

  const { form, onSubmit, onBlur, formRef } = useSampleHeader({
    sample,
  });

  return (
    <>
      <SampleBagde sample={sample} />
      <form
        ref={formRef}
        className="grid grid-cols-1 md:grid-cols-[min-content_minmax(auto,400px)] border border-border p-4 text-nowrap sticky top-6 z-[1] bg-white gap-1"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {inputs.map((input) => (
          <>
            <Label
              className="px-4 h-11 content-center text-right"
              key={`${input.name}-label`}
            >
              {input.label}:
            </Label>
            <Input
              key={`${input.name}-input`}
              className={
                input.isReadOnly ? "border-none !ring-transparent" : ""
              }
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
              onBlur={onBlur}
            />
          </>
        ))}
      </form>
    </>
  );
}

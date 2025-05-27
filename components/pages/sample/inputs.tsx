'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type Sample, SampleStatus } from '@/types/student';
import type { z } from 'zod';

import { type sampleHeaderSchema, useSampleHeader } from '@/hooks/samples/use-sample-header';
import { hasPermission } from '@/lib/permissions';
import { useAuth } from '@/providers/auth';
import { cn, getUserName, isAnyAdmin } from '@/utils';

type SampleMetaProps = {
  isReadOnly?: boolean;
  sample: Sample;
};

export function SampleInputs({ sample }: SampleMetaProps) {
  const { user } = useAuth();
  const inputs = [
    {
      label: 'Student Name',
      defaultValue: getUserName(sample.student_lp_enrollments[0].student.user),
      name: 'student_name',
    },
    {
      label: 'Course Title',
      defaultValue: sample.subject.name,
      name: 'course_title',
    },
    {
      label: 'Assignment Title',
      defaultValue: sample.assignment_title,
      name: 'assignment_title',
    },
    {
      label: 'Grade',
      defaultValue: sample.grade,
      name: 'grade',
    },
    {
      label: 'Date',
      defaultValue: new Date(sample?.date).toLocaleDateString(),
      name: 'date',
    },
  ].map((input) => ({
    ...input,
    ...{
      isReadOnly: hasPermission(user, 'samples', 'correct')
        ? !(
            isAnyAdmin(user) ||
            (sample.status === SampleStatus.ERRORS_FOUND && !input.defaultValue)
          )
        : true,
    },
  }));

  const { form, onSubmit, onBlur, formRef } = useSampleHeader({
    sample,
  });

  return (
    <form
      ref={formRef}
      className="grid grid-cols-1 md:grid-cols-[min-content_minmax(auto,400px)] border border-border py-4 px-10 text-nowrap md:sticky top-0 z-[1] bg-white gap-2 !m-0"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {inputs.map((input) => (
        <>
          <Label className="pe-4 h-9 content-center md:text-right" key={`${input.name}-label`}>
            {input.label}:
          </Label>
          <Input
            key={`${input.name}-input`}
            className={cn('h-9 p-2', input.isReadOnly ? 'border-none !ring-transparent' : '')}
            readOnly={input.isReadOnly}
            defaultValue={input?.defaultValue}
            {...form.register(input.name as keyof z.infer<typeof sampleHeaderSchema>)}
            aria-invalid={
              !!form.formState.errors[input.name as keyof z.infer<typeof sampleHeaderSchema>]
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

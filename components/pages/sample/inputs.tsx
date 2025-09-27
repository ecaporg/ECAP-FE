'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ISample } from '@/types';
import type { z } from 'zod';

import { type sampleHeaderSchema, useSampleHeader } from '@/hooks/samples/use-sample-header';
import { hasPermission } from '@/lib/permissions';
import { useAuth } from '@/providers/auth';
import { cn, getUserName, isAnyAdmin } from '@/utils';
import { SampleStatus } from 'ecap-lib/dist/constants';

type SampleMetaProps = {
  isReadOnly?: boolean;
  sample: ISample;
};

export function SampleInputs({ sample }: SampleMetaProps) {
  const { user } = useAuth();
  const inputs = [
    {
      label: 'Student Name',
      defaultValue: getUserName(
        sample.student_lp_enrollment_assignment.student_lp_enrollment.student.user
      ),
      name: 'student_name',
    },
    {
      label: 'Course Title',
      defaultValue: sample.student_lp_enrollment_assignment.assignment.course.name,
      name: 'course_title',
    },
    {
      label: 'Assignment Title',
      defaultValue: sample.student_lp_enrollment_assignment.assignment.name,
      name: 'assignment_title',
    },
    {
      label: 'Grade',
      defaultValue: sample.grade,
      name: 'grade',
    },
    {
      label: 'Date',
      defaultValue: sample?.date ? new Date(sample.date).toLocaleDateString() : '',
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
      className="!m-0 top-0 z-[1] grid grid-cols-1 gap-2 text-nowrap border border-border bg-white px-10 py-4 md:sticky md:grid-cols-[min-content_minmax(auto,400px)]"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {inputs.map((input) => (
        <>
          <Label className="h-9 content-center pe-4 md:text-right" key={`${input.name}-label`}>
            {input.label}:
          </Label>
          <Input
            key={`${input.name}-input`}
            className={cn('h-9 p-2', input.isReadOnly ? '!ring-transparent border-none' : '')}
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

'use client';
import {
  flagCompletedSampleAction,
  updateSampleAction,
} from '@/app/(protected)/(with-out-layout)/samples/[id]/actions';
import { useAuth } from '@/providers/auth';
import type { ISample } from '@/types';
import { isAnyAdmin, validationMessages } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const sampleHeaderSchema = z.object({
  student_name: z.string().min(1, { message: validationMessages.required('Student Name') }),
  course_title: z.string().min(1, { message: validationMessages.required('Course Title') }),
  assignment_title: z.string().min(1, { message: validationMessages.required('Assignment Title') }),
  grade: z.string().min(1, { message: validationMessages.required('Grade') }),
  date: z.string().min(1, { message: validationMessages.required('Date') }),
});

export function useSampleHeader({ sample }: { sample: ISample }) {
  const { user } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof sampleHeaderSchema>>({
    resolver: zodResolver(sampleHeaderSchema),
  });

  useEffect(() => {
    form.trigger();
  }, [sample]);

  const onBlur = async (e: React.FocusEvent<HTMLInputElement>, label: string) => {
    if (e.target.value !== e.target.defaultValue) {
      if (user?.role === 'TEACHER') {
        await flagCompletedSampleAction(sample, {
          message: `Added ${label}`,
        } as any);
      }

      if (isAnyAdmin(user)) {
        await flagCompletedSampleAction(sample, {
          message: `Changed ${label} from ${e.target.defaultValue || 'N/A'} to ${e.target.value}`,
        } as any);
      }

      await updateSampleAction(sample, {
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = async (data: z.infer<typeof sampleHeaderSchema>) => {};

  return { form, onSubmit, formRef, onBlur };
}

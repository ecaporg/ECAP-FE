'use client';
import { updateSampleAction } from '@/app/(protected)/(with-out-layout)/samples/[id]/actions';
import { Sample } from '@/types';
import { validationMessages } from '@/utils';
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

export function useSampleHeader({ sample }: { sample: Sample }) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof sampleHeaderSchema>>({
    resolver: zodResolver(sampleHeaderSchema),
  });

  useEffect(() => {
    form.trigger();
  }, [sample]);

  const onBlur = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
    }
  };

  const onSubmit = async (data: z.infer<typeof sampleHeaderSchema>) => {
    await updateSampleAction(data as unknown as Sample);
  };

  return { form, onSubmit, formRef, onBlur };
}

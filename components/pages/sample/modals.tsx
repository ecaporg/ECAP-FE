'use client';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import { Sample } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import { ConfirmationModal } from '@/components/modals/confirmation';
import { useState } from 'react';
import { getFormattedLP, getUserName } from '@/utils';
import { useFlagError } from '@/hooks/samples/use-flag-error';
import { FormError } from '@/components/ui/form-error';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/providers/auth';
import { approveSampleAction } from '@/app/(protected)/(with-out-layout)/samples/[id]/actions';
export function UploadToStudentPathwaysModal({
  children,
  sample,
}: React.PropsWithChildren<{ sample: Sample }>) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  return (
    <ConfirmationModal
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Successfully Uploaded to Student Pathways!"
      action={async () => await approveSampleAction(sample, user)}
    >
      {children}
    </ConfirmationModal>
  );
}

export function SampleInfoForModal({ sample }: { sample: Sample }) {
  const metadata = [
    [
      {
        label: 'Student Name: ',
        value: getUserName(sample.assignment_period.student.user),
      },
      {
        label: 'Student ID',
        value: sample.assignment_period.student.id,
      },
      {
        label: 'Grade',
        value: sample.assignment_period.student.grade,
      },
    ],
    [
      {
        label: 'Subject:',
        value: sample.subject.name,
      },
      { label: 'Assignment:', value: 'empty' },
      {
        label: 'LP:',
        value: getFormattedLP(sample.assignment_period.learning_period),
      },
    ],
  ];
  return (
    <>
      {metadata.map((row, idx) => (
        <div key={`metadata-row-${idx}`} className="space-y-1 text-neutral-black text-base flex-1">
          {row.map((item) => (
            <div key={item.label} className="grid grid-cols-2 gap-4">
              <p className="text-primary text-start">{item.label}</p>
              <p className="text-end">{item.value}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export function FlagErrorModal({ children, sample }: React.PropsWithChildren<{ sample: Sample }>) {
  const { form, onSubmit, openSuccessfullyModal, setOpenSuccessfullyModal, submitSuccessfully } =
    useFlagError({
      sample,
    });

  return (
    <>
      <ResponsiveDialog
        className="md:w-1/2"
        trigger={children}
        title="Flag Error in Requirements"
        hasCloseButton
      >
        <form className="flex flex-col size-full" onSubmit={form.handleSubmit(onSubmit)}>
          <section className="flex justify-between flex-wrap md:flex-nowrap gap-y-1 md:pt-6 gap-x-4">
            <SampleInfoForModal sample={sample} />
          </section>
          <div className="py-6">
            <Textarea
              placeholder="Enter your comment here..."
              className="resize-none"
              {...form.register('comment')}
              aria-invalid={form.formState.errors.comment ? 'true' : 'false'}
              aria-describedby="comment-error"
            />
            <FormError
              id="comment-error"
              message={form.formState.errors.comment?.message}
              className="mt-1 text-wrap"
            />
          </div>
          <Button
            className="w-fit self-end"
            size="lg"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Send to Admin'
            )}
          </Button>
        </form>
      </ResponsiveDialog>
      {openSuccessfullyModal && (
        <ConfirmationModal
          open={openSuccessfullyModal}
          onOpenChange={setOpenSuccessfullyModal}
          title="Successfully sent to Admin!"
          action={submitSuccessfully}
        >
          {children}
        </ConfirmationModal>
      )}
    </>
  );
}

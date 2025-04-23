'use client';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import { Sample } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import { SuccessfullyModal } from '@/components/modals/successfully';
import { useState } from 'react';

export function UploadToStudentPathwaysModal({ children }: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SuccessfullyModal
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Successfully Uploaded to Student Pathways!"
      action={async (close) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        close();
      }}
    >
      {children}
    </SuccessfullyModal>
  );
}

export function SampleInfoForModal({ sample }: { sample: Sample }) {
  const metadata = [
    [
      {
        label: 'Student Name: ',
        // value: getUserName(sample.assignment_period.student.user),
      },
      {
        label: 'Student ID',
        // value: sample.assignment_period.student.id
      },
      {
        label: 'Grade',
        // value: sample.assignment_period.student.grade
      },
    ],
    [
      {
        label: 'Subject:',
        // value: sample.subject.name
      },
      { label: 'Assignment:', value: 'empty' },
      {
        label: 'LP:',
        // value: getFormattedLP(sample.assignment_period.learning_period),
      },
    ],
  ];
  return (
    <>
      {metadata.map((row, idx) => (
        <div key={`metadata-row-${idx}`} className="space-y-1 text-neutral-black text-base">
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
  return (
    <ResponsiveDialog
      className="md:w-1/2"
      trigger={children}
      title="Flag Error in Requirements"
      hasCloseButton
    >
      <form className="flex flex-col size-full">
        <section className="flex justify-between flex-wrap gap-y-1 md:pt-6">
          <SampleInfoForModal sample={sample} />
        </section>
        <div className="py-6">
          <Textarea placeholder="Enter your comment here..." className="resize-none" />
        </div>
        <Button className="w-fit self-end" size="lg">
          Send to Admin
        </Button>
      </form>
    </ResponsiveDialog>
  );
}

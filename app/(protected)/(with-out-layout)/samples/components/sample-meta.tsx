'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Flag, Upload } from 'lucide-react';
import { Sample, SampleStatus } from '@/types/student';
import { useRouter } from 'next/navigation';
import { FlagErrorModal, UploadToStudentPathwaysModal } from './modals';
import { getUserName } from '@/utils';
type SampleMetaProps = {
  isReadOnly?: boolean;
  sample: Sample;
};

export function SampleInputs({ isReadOnly = true, sample }: SampleMetaProps) {
  const inputs = [
    {
      label: 'Student Name',
      value: getUserName(sample.assignment_period.student.user),
    },
    {
      label: 'Course Title',
      value: sample.subject.name,
    },
    {
      label: 'Assignment Title',
      value: sample.assignment_title,
    },
    {
      label: 'Grade',
      value: sample.assignment_period.student.grade,
    },
    {
      label: 'Date',
      value: sample.createdAt,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[min-content_minmax(auto,400px)] border border-border p-4 text-nowrap sticky top-6 z-[1] bg-white">
      {inputs.map((input) => (
        <>
          <Label className="px-4 h-11 content-center text-right">{input.label}:</Label>
          <Input
            className={isReadOnly ? 'border-none !ring-transparent' : ''}
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
  const isHidden = [SampleStatus.COMPLETED].some((status) => status === sample.status);
  const isDisabled = [
    SampleStatus.ERRORS_FOUND,
    SampleStatus.MISSING_SAMPLE,
    SampleStatus.FLAGGED_TO_ADMIN,
  ].some((status) => status === sample.status);

  return (
    <>
      {!isHidden && (
        <>
          <FlagErrorModal sample={sample}>
            <Button className="fixed top-12 right-12 z-[2]" size="lg" disabled={isDisabled}>
              <Flag className="w-4 h-4 mr-2" />
              Flag Error in Requirements
            </Button>
          </FlagErrorModal>

          <UploadToStudentPathwaysModal>
            <Button className="fixed bottom-12 right-12 z-[2]" size="lg" disabled={isDisabled}>
              <Upload className="w-4 h-4 mr-2" />
              Upload to Student Pathways
            </Button>
          </UploadToStudentPathwaysModal>
        </>
      )}
      <Button className="fixed bottom-12 left-12 z-[2]" size="lg" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Subject Table
      </Button>
    </>
  );
}

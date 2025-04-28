'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Flag, Upload } from 'lucide-react';
import { Sample, SampleStatus } from '@/types/student';

import { useRouter } from 'next/navigation';
import { FlagErrorModal, UploadToStudentPathwaysModal } from './modals';

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

          <UploadToStudentPathwaysModal sample={sample}>
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

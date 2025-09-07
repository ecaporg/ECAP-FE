'use client';
import { Button } from '@/components/ui/button';
import { type Sample, SampleStatus } from '@/types/student';
import { ArrowLeft, Flag, Upload } from 'lucide-react';

import { hasPermission } from '@/lib/permissions';
import { useAuth } from '@/providers/auth';
import { useRouter } from 'next/navigation';
import { FlagErrorModal, UploadToStudentPathwaysModal } from './modals';
import { toast } from 'sonner';

export function SampleActionButtons({ sample }: { sample: Sample }) {
  const { user } = useAuth();
  const router = useRouter();
  const isDisabled = [
    SampleStatus.ERRORS_FOUND,
    SampleStatus.MISSING_SAMPLE,
    SampleStatus.FLAGGED_TO_ADMIN,
  ].some((status) => status === sample.status);

  return (
    <>
      {hasPermission(user, 'samples', 'flag', sample) && user.role === 'TEACHER' && (
        <FlagErrorModal sample={sample}>
          <Button className="fixed top-12 right-12 z-[2]" size="lg" disabled={isDisabled}>
            <Flag className="w-4 h-4 mr-2" />
            Flag Error in Requirements
          </Button>
        </FlagErrorModal>
      )}

      {hasPermission(user, 'samples', 'upload', sample) && (
        // <UploadToStudentPathwaysModal sample={sample}>
        <Button
          className="fixed bottom-12 right-12 z-[2]"
          size="lg"
          disabled={isDisabled}
          onClick={() => {
            toast.warning('This feature is currently disabled through a problem with SIS integration');
          }}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload to Student Pathways
        </Button>
        // </UploadToStudentPathwaysModal>
      )}

      <Button className="fixed bottom-12 left-12 z-[2]" size="lg" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Subject Table
      </Button>
    </>
  );
}

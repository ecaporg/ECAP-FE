'use client';
import { Button } from '@/components/ui/button';
import type { ISample } from '@/types';
import { ArrowLeft, Flag, Upload } from 'lucide-react';

import { hasPermission } from '@/lib/permissions';
import { useAuth } from '@/providers/auth';
import { SampleStatus } from 'ecap-lib/dist/constants';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FlagErrorModal, UploadToStudentPathwaysModal } from './modals';

export function SampleActionButtons({ sample }: { sample: ISample }) {
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
            <Flag className="mr-2 h-4 w-4" />
            Flag Error in Requirements
          </Button>
        </FlagErrorModal>
      )}

      {hasPermission(user, 'samples', 'upload', sample) && (
        // <UploadToStudentPathwaysModal sample={sample}>
        <Button
          className="fixed right-12 bottom-12 z-[2]"
          size="lg"
          disabled={isDisabled}
          onClick={() => {
            toast.warning(
              'This feature is currently disabled through a problem with SIS integration'
            );
          }}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload to Student Pathways
        </Button>
        // </UploadToStudentPathwaysModal>
      )}

      <Button className="fixed bottom-12 left-12 z-[2]" size="lg" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Subject Table
      </Button>
    </>
  );
}

'use client';
import { approveAdminSampleAction } from '@/app/(protected)/(with-out-layout)/samples/[id]/actions';
import { ConfirmationModal } from '@/components/modals';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import { useAuth } from '@/providers/auth';
import type { ISample } from '@/types';
import { isAdminOrDirector, isAnyAdmin } from '@/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { RejectMissingSampleModal } from './reject-missing-sample.modal';
import { ReasonForMissingSample, SampleInfoForModal } from './shared';

export function FlagMissingWorkSampleInfoModal({
  children,
  sample,
}: React.PropsWithChildren<{ sample: ISample }>) {
  const [openSuccessfullyModal, setOpenSuccessfullyModal] = useState(false);
  const path = usePathname();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const isDirector = isAdminOrDirector(user);
  const isAdmin = isAnyAdmin(user);

  const title = isDirector ? 'Missing Work Sample' : 'You Flagged a Missing Work Sample';

  const description = isDirector ? (
    <>
      <b>Date Flagged:</b>{' '}
      {new Date(sample.flag_missing_work?.createdAt || '').toLocaleDateString()}
    </>
  ) : (
    ''
  );

  return (
    <>
      <ResponsiveDialog
        className="md:w-1/2"
        trigger={children}
        title={title}
        description={description}
        hasCloseButton
      >
        <form className="flex size-full flex-col">
          <section className="flex flex-wrap justify-between gap-x-4 gap-y-1 md:flex-nowrap md:pt-6">
            <SampleInfoForModal sample={sample} type="view_missing" />
          </section>
          <p className="py-4">
            <ReasonForMissingSample sample={sample} isDirector={isDirector} />
          </p>
          {!isAdmin && (
            <DialogClose asChild>
              <Button className="w-fit self-end" size="lg">
                Close
              </Button>
            </DialogClose>
          )}

          {isAdmin && (
            <div className="flex w-full justify-end gap-2 ">
              <RejectMissingSampleModal sample={sample}>
                <Button className="basis-40" size="lg" variant="warning" type="button">
                  Reject
                </Button>
              </RejectMissingSampleModal>
              <Button className="basis-40" size="lg" onClick={() => setOpenSuccessfullyModal(true)}>
                Approve
              </Button>
            </div>
          )}
        </form>
      </ResponsiveDialog>
      {openSuccessfullyModal && (
        <ConfirmationModal
          open={openSuccessfullyModal}
          onOpenChange={setOpenSuccessfullyModal}
          title="Approved!"
          action={async () =>
            await approveAdminSampleAction(
              sample,
              user,
              `${path}?${new URLSearchParams(searchParams).toString()}`
            )
          }
        >
          {<></>}
        </ConfirmationModal>
      )}
    </>
  );
}

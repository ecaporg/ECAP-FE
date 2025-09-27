'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import { useAuth } from '@/providers/auth';
import type { ISample } from '@/types';
import { isAdminOrDirector } from '@/utils';
import { CircleAlertIcon } from 'lucide-react';
import { ReasonForMissingSample, SampleInfoForModal } from './shared';

export function FlagRejectSampleInfoModal({
  children,
  sample,
}: React.PropsWithChildren<{ sample: ISample }>) {
  const { user } = useAuth();
  const isDirector = isAdminOrDirector(user);
  const title = (
    <>
      <Badge variant="red" className="mb-4 inline-flex w-fit">
        <CircleAlertIcon className="size-4" />
        Rejected: {new Date(sample.flag_rejected?.createdAt || '').toLocaleDateString()}
      </Badge>
      <p>Missing Work Sample</p>
    </>
  );

  const reason = isDirector ? (
    <>
      <ReasonForMissingSample sample={sample} isDirector={isDirector} />
      <br />
      <b className="pt-4 text-primary">Reason for rejecting missing sample:</b>{' '}
      {sample.flag_rejected?.reason}
    </>
  ) : (
    <>
      <p>
        <ReasonForMissingSample sample={sample} isDirector={isDirector} />
      </p>
      <p>
        <b>Reason for rejecting missing sample:</b> "{sample.flag_rejected?.reason}"
      </p>
    </>
  );

  const description = isDirector ? (
    <>
      <b>Date Flagged:</b> {new Date(sample.flag_rejected?.createdAt || '').toLocaleDateString()}
    </>
  ) : (
    ''
  );

  return (
    <ResponsiveDialog
      className="md:w-1/2"
      trigger={children}
      title={title}
      description={description}
      hasCloseButton
    >
      <form className="flex size-full flex-col">
        <section className="flex flex-wrap justify-between gap-x-4 gap-y-1 md:flex-nowrap md:pt-6">
          <SampleInfoForModal sample={sample} type="view_rejected" />
        </section>
        <p className="py-6">{reason}</p>
        <DialogClose asChild>
          <Button className="w-fit self-end" size="lg">
            Close
          </Button>
        </DialogClose>
      </form>
    </ResponsiveDialog>
  );
}

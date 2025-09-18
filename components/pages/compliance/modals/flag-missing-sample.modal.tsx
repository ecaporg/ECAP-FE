'use client';
import { ConfirmationModal } from '@/components/modals/confirmation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FLAG_MISSING_WORK_SAMPLE_REASONS } from '@/constants/sample';
import { useFlagMissingWorkSample } from '@/hooks/samples/use-flag-missing';
import type { ISample } from '@/types';
import { Loader2 } from 'lucide-react';
import { SampleInfoForModal } from './shared';

export function FlagMissingWorkSampleModal({
  children,
  sample,
}: React.PropsWithChildren<{ sample: ISample }>) {
  const { form, onSubmit, openSuccessfullyModal, setOpenSuccessfullyModal, submitSuccessfully } =
    useFlagMissingWorkSample({
      sample,
    });

  const selectedReason = form.watch('reason');

  return (
    <>
      <ResponsiveDialog
        className="md:w-1/2"
        trigger={children}
        title="Flag Missing Work Sample"
        hasCloseButton
      >
        <form className="flex flex-col size-full" onSubmit={form.handleSubmit(onSubmit)}>
          <section className="flex justify-between flex-wrap md:flex-nowrap gap-y-1 md:pt-6 gap-x-4">
            <SampleInfoForModal sample={sample} type="flag_missing" />
            <input {...form.register('reason')} className="hidden" />
          </section>
          <div className="py-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">{selectedReason}</DropdownMenuTrigger>
              <DropdownMenuContent>
                <ScrollArea className="max-h-[min(30rem,50vh)]">
                  {FLAG_MISSING_WORK_SAMPLE_REASONS.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      className={selectedReason === option ? 'bg-cool-gray' : ''}
                      onSelect={() => {
                        form.setValue('reason', option);
                      }}
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
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
          {<></>}
        </ConfirmationModal>
      )}
    </>
  );
}

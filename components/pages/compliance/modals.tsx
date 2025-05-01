"use client";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Sample } from "@/types";
import { ConfirmationModal } from "@/components/modals/confirmation";
import { useFlagMissingWorkSample } from "@/hooks/samples/use-flag-missing";
import { Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SampleInfoForModal } from "@/app/(protected)/(with-out-layout)/samples/components/modals";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { FLAG_MISSING_WORK_SAMPLE_REASONS } from "@/constants/sample";
import { useAuth } from "@/providers/auth";

export function FlagMissingWorkSamplerModal({
  children,
  sample,
}: React.PropsWithChildren<{ sample: Sample }>) {
  const {
    form,
    onSubmit,
    openSuccessfullyModal,
    setOpenSuccessfullyModal,
    submitSuccessfully,
  } = useFlagMissingWorkSample({
    sample,
  });

  const selectedReason = form.watch("reason");

  return (
    <>
      <ResponsiveDialog
        className="md:w-1/2"
        trigger={children}
        title="Flag Missing Work Sample"
        hasCloseButton
      >
        <form
          className="flex flex-col size-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <section className="flex justify-between flex-wrap md:flex-nowrap gap-y-1 md:pt-6 gap-x-4">
            <SampleInfoForModal sample={sample} />
            <input {...form.register("reason")} className="hidden" />
          </section>
          <div className="py-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                {selectedReason}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <ScrollArea className="max-h-[min(30rem,50vh)]">
                  {FLAG_MISSING_WORK_SAMPLE_REASONS.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      className={
                        selectedReason === option ? "bg-cool-gray" : ""
                      }
                      onSelect={() => {
                        form.setValue("reason", option);
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
              "Send to Admin"
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

export function FlagMissingWorkSamplerInfoModal({
  children,
  sample,
}: React.PropsWithChildren<{ sample: Sample }>) {
  const { user } = useAuth();
  const isDirector = user?.role === "DIRECTOR";
  const title = isDirector
    ? "Missing Work Sample"
    : "You Flagged a Missing Work Sample";

  const reason = isDirector ? (
    <>
      <b className="text-primary">Reason for Missing Sample:</b>{" "}
      {sample.flag_missing_work?.reason}
    </>
  ) : (
    `Reason given: “${sample.flag_missing_work?.reason}"`
  );

  const description = isDirector ? (
    <>
      <b>Date Flagged:</b>{" "}
      {new Date(sample.flag_missing_work?.createdAt || "").toLocaleDateString()}
    </>
  ) : (
    ""
  );

  return (
    <ResponsiveDialog
      className="md:w-1/2"
      trigger={children}
      title={title}
      description={description}
      hasCloseButton
    >
      <form className="flex flex-col size-full">
        <section className="flex justify-between flex-wrap md:flex-nowrap gap-y-1 md:pt-6 gap-x-4">
          <SampleInfoForModal sample={sample} />
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

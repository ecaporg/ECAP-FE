"use client";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Sample } from "@/types";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { ReasonForMissingSample, SampleInfoForModal } from "./shared";
import { ConfirmationModal } from "@/components/modals";
import { useRejectMissingSample } from "@/hooks/samples/use-reject-missing-sample";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function RejectMissingSampleModal({
  children,
  sample,
}: React.PropsWithChildren<{ sample: Sample }>) {
  const {
    form,
    onSubmit,
    openSuccessfullyModal,
    setOpenSuccessfullyModal,
    submitSuccessfully,
  } = useRejectMissingSample({
    sample,
  });

  return (
    <>
      <ResponsiveDialog
        className="md:w-1/2"
        trigger={children}
        title="Missing Work Sample"
        description={
          <>
            <b>Date Flagged:</b>{" "}
            {new Date(
              sample.flag_missing_work?.createdAt || ""
            ).toLocaleDateString()}
          </>
        }
        hasCloseButton
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col size-full"
        >
          <section className="flex justify-between flex-wrap md:flex-nowrap gap-y-1 md:pt-6 gap-x-4">
            <SampleInfoForModal sample={sample} />
          </section>
          <p className="py-4">
            <ReasonForMissingSample sample={sample} isDirector={false} />
          </p>

          <section className="space-y-2 pb-4">
            <Label htmlFor="reason">Why are you rejecting this?</Label>
            <Textarea
              {...form.register("reason")}
              placeholder="Write your explanation here before sending to the teacher"
            />
          </section>

          <section className="flex gap-2 w-full justify-end ">
            <DialogClose asChild>
              <Button
                className="basis-40"
                size="lg"
                variant="warning"
                type="button"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="basis-40"
              size="lg"
              onClick={() => setOpenSuccessfullyModal(true)}
            >
              Send to Teacher
            </Button>
          </section>
        </form>
      </ResponsiveDialog>
      {openSuccessfullyModal && (
        <ConfirmationModal
          open={openSuccessfullyModal}
          onOpenChange={setOpenSuccessfullyModal}
          title="Successfully sent to teacher!!"
          action={submitSuccessfully}
        >
          {<></>}
        </ConfirmationModal>
      )}
    </>
  );
}

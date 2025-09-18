"use client";
import { approveSampleAction } from "@/app/(protected)/(with-out-layout)/samples/[id]/actions";
import { ConfirmationModal } from "@/components/modals/confirmation";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useFlagError } from "@/hooks/samples/use-flag-error";
import { useAuth } from "@/providers/auth";
import type { ISample } from "@/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SampleInfoForModal } from "../compliance/modals/shared";
export function UploadToStudentPathwaysModal({
  children,
  sample,
}: React.PropsWithChildren<{ sample: ISample }>) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  return (
    <ConfirmationModal
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Successfully Uploaded to Student Pathways!"
      action={async () => await approveSampleAction(sample, user)}
    >
      {children}
    </ConfirmationModal>
  );
}

export function FlagErrorModal({
  children,
  sample,
}: React.PropsWithChildren<{ sample: ISample }>) {
  const {
    form,
    onSubmit,
    openSuccessfullyModal,
    setOpenSuccessfullyModal,
    submitSuccessfully,
  } = useFlagError({
    sample,
  });

  return (
    <>
      <ResponsiveDialog
        className="md:w-1/2"
        trigger={children}
        title="Flag Error in Requirements"
        hasCloseButton
      >
        <form
          className="flex flex-col size-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <section className="flex justify-between flex-wrap md:flex-nowrap gap-y-1 md:pt-6 gap-x-4">
            <SampleInfoForModal sample={sample} type="flag_errors" />
          </section>
          <div className="py-6">
            <Textarea
              placeholder="Enter your comment here..."
              className="resize-none"
              {...form.register("comment")}
              aria-invalid={form.formState.errors.comment ? "true" : "false"}
              aria-describedby="comment-error"
            />
            <FormError
              id="comment-error"
              message={form.formState.errors.comment?.message}
              className="mt-1 text-wrap"
            />
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
          {<></>}
        </ConfirmationModal>
      )}
    </>
  );
}

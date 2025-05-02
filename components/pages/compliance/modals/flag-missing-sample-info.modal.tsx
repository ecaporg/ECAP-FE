"use client";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Sample } from "@/types";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useAuth } from "@/providers/auth";
import { ReasonForMissingSample, SampleInfoForModal } from "./shared";
import { isAdminOrDirector, isAnyAdmin } from "@/utils";
import { useState } from "react";
import { ConfirmationModal } from "@/components/modals";
import { approveAdminSampleAction } from "@/app/(protected)/(with-out-layout)/samples/[id]/actions";
import { usePathname, useSearchParams } from "next/navigation";
import { RejectMissingSampleModal } from "./reject-missing-sample.modal";

export function FlagMissingWorkSampleInfoModal({
  children,
  sample,
}: React.PropsWithChildren<{ sample: Sample }>) {
  const [openSuccessfullyModal, setOpenSuccessfullyModal] = useState(false);
  const path = usePathname();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const isDirector = isAdminOrDirector(user);
  const isAdmin = isAnyAdmin(user);

  const title = isDirector
    ? "Missing Work Sample"
    : "You Flagged a Missing Work Sample";

  const description = isDirector ? (
    <>
      <b>Date Flagged:</b>{" "}
      {new Date(sample.flag_missing_work?.createdAt || "").toLocaleDateString()}
    </>
  ) : (
    ""
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
        <form className="flex flex-col size-full">
          <section className="flex justify-between flex-wrap md:flex-nowrap gap-y-1 md:pt-6 gap-x-4">
            <SampleInfoForModal sample={sample} />
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
            <div className="flex gap-2 w-full justify-end ">
              <RejectMissingSampleModal sample={sample}>
                <Button
                  className="basis-40"
                  size="lg"
                  variant="warning"
                  type="button"
                >
                  Reject
                </Button>
              </RejectMissingSampleModal>
              <Button
                className="basis-40"
                size="lg"
                onClick={() => setOpenSuccessfullyModal(true)}
              >
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
          {children}
        </ConfirmationModal>
      )}
    </>
  );
}

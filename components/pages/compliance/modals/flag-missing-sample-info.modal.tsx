"use client";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Sample } from "@/types";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useAuth } from "@/providers/auth";
import { SampleInfoForModal } from "../../sample/modals";

export function FlagMissingWorkSampleInfoModal({
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
    `Reason given: "${sample.flag_missing_work?.reason}"`
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

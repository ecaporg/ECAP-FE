import { flagSampleAction } from "@/app/(protected)/(with-out-layout)/samples/[id]/actions";
import type { ISample, ISampleFlagError } from "@/types";
import { validationMessages } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const flagErrorSchema = z.object({
  comment: z
    .string()
    .min(1, { message: validationMessages.required("Comment") }),
});

export type FlagErrorFormData = z.infer<typeof flagErrorSchema>;

export function useFlagError({ sample }: { sample: ISample }) {
  const [openSuccessfullyModal, setOpenSuccessfullyModal] = useState(false);
  const form = useForm<FlagErrorFormData>({
    resolver: zodResolver(flagErrorSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = () => {
    setOpenSuccessfullyModal(true);
  };

  const submitSuccessfully = async () => {
    const formData = {
      comment: form.getValues("comment"),
    };
    await flagSampleAction(sample, formData as ISampleFlagError);
  };

  return {
    openSuccessfullyModal,
    setOpenSuccessfullyModal,
    submitSuccessfully,
    onSubmit,
    form,
  };
}

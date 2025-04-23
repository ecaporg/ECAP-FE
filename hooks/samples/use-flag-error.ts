import { routes } from "@/constants/routes";
import { Sample } from "@/types";
import { validationMessages } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const flagErrorSchema = z.object({
  comment: z
    .string()
    .min(1, { message: validationMessages.required("Comment") }),
});

export function useFlagError({ sample }: { sample: Sample }) {
  const [openSuccessfullyModal, setOpenSuccessfullyModal] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof flagErrorSchema>>({
    resolver: zodResolver(flagErrorSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = () => {
    setOpenSuccessfullyModal(true);
  };

  const submitSuccessfully = async () => {
    const formData = form.getValues();
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
    if (res) {
      setOpenSuccessfullyModal(false);
      router.push(routes.compliance.samples);
    }
  };

  return {
    openSuccessfullyModal,
    setOpenSuccessfullyModal,
    submitSuccessfully,
    onSubmit,
    form,
  };
}

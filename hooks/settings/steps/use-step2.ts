"use client";
import { BaseApi } from "@/lib/base-api";
import { apiClientFetch } from "@/lib/client-fetch";
import { Academy } from "@/types"; // Changed to Academy
import { validationMessages } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useOptimistic,
  useState,
  useTransition,
  Dispatch,
  SetStateAction,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const academyClientApi = new BaseApi<Academy, undefined>(
  "/academies",
  apiClientFetch
);

export type StepAcademy = Academy & {
  disabled?: boolean;
};

type UpdateAcademyType = {
  action: "add" | "edit" | "delete";
  academy: StepAcademy;
};

const academyFormSchema = z.object({
  name: z.string().min(1, validationMessages.required("Academy Name")),
});
type AcademyForm = z.infer<typeof academyFormSchema>;

const academiesReducer = (prev: Academy[], updated: UpdateAcademyType) => {
  updated.academy.disabled = true;
  switch (updated.action) {
    case "add":
      return [updated.academy, ...prev];
    case "edit":
    case "delete":
      return prev.map((s) =>
        s.id === updated.academy.id ? updated.academy : s
      );
  }
};

export const useStep2 = (
  academies: Academy[] = [],
  setAcademies: Dispatch<SetStateAction<Academy[]>>
) => {
  const [_, startTransition] = useTransition();
  const [optimisticAcademies, setOptimisticAcademies] = useOptimistic(
    academies,
    academiesReducer
  );
  const [academyToEdit, setAcademyToEdit] = useState<Academy | null>(null);
  const form = useForm<AcademyForm>({
    resolver: zodResolver(academyFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const addAcademy = async (academy: Academy) => {
    try {
      setOptimisticAcademies({ action: "add", academy });

      const res = await academyClientApi.post(academy);
      setAcademies((prev) => [res.data!, ...prev]);

      toast.success("Academy added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add academy");
      throw error;
    }
  };

  const editAcademy = async (academy: Academy) => {
    try {
      setOptimisticAcademies({ action: "edit", academy });

      const res = await academyClientApi.put(academy.id.toString(), academy);
      setAcademies((prev) =>
        prev.map((s) => (s.id === academy.id ? res.data! : s))
      );

      toast.success("Academy updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit academy");
      throw error;
    }
  };

  const deleteAcademy = async (academy: Academy) => {
    try {
      toast.info("Deleting academy...");
      setOptimisticAcademies({ action: "delete", academy });

      await academyClientApi.delete(academy.id.toString());
      setAcademies((prev) => prev.filter((s) => s.id !== academy.id));

      toast.success("Academy deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete academy");
    }
  };

  const onAddClick = ({ name }: AcademyForm) => {
    form.reset();
    startTransition(async () => {
      try {
        if (academyToEdit) {
          toast.info("Updating academy...");
          await editAcademy({
            ...academyToEdit,
            name,
          });
          setAcademyToEdit(null);
        } else {
          toast.info("Adding academy...");
          await addAcademy({
            name,
          } as Academy);
        }
      } catch (error) {
        form.setValue("name", name);
      }
    });
  };

  const onEditClick = (academy: Academy) => {
    if (academyToEdit?.id === academy.id) {
      setAcademyToEdit(null);
      form.reset();
    } else {
      setAcademyToEdit(academy);
      form.setValue("name", academy.name);
    }
  };

  const onDeleteClick = (academy: Academy) => {
    startTransition(async () => {
      await deleteAcademy(academy);
    });
  };

  return {
    academies: optimisticAcademies,
    onAddClick,
    onEditClick,
    onDeleteClick,
    form,
    editingAcademyId: academyToEdit?.id,
  };
};

"use client";
import { BaseApi } from "@/lib/base-api";
import { apiClientFetch } from "@/lib/client-fetch";
import { School } from "@/types";
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

export const schoolClientApi = new BaseApi<School, undefined>(
  "/schools",
  apiClientFetch
);

export type StepSchool = School & {
  disabled?: boolean;
};

type UpdateSchoolType = {
  action: "add" | "edit" | "delete";
  school: StepSchool;
};

const schoolFormSchema = z.object({
  name: z.string().min(1, validationMessages.required("School Name")),
});
type SchoolForm = z.infer<typeof schoolFormSchema>;

const schoolsReducer = (prev: School[], updated: UpdateSchoolType) => {
  updated.school.disabled = true;
  switch (updated.action) {
    case "add":
      return [updated.school, ...prev];
    case "edit":
    case "delete":
      return prev.map((s) => (s.id === updated.school.id ? updated.school : s));
  }
};

export const useStep1 = (
  schools: School[] = [],
  setSchools: Dispatch<SetStateAction<School[]>>
) => {
  const [_, startTransition] = useTransition();
  const [optimisticSchools, setOptimisticSchools] = useOptimistic(
    schools,
    schoolsReducer
  );
  const [schoolToEdit, setSchoolToEdit] = useState<School | null>(null);
  const form = useForm<SchoolForm>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const addSchool = async (school: School) => {
    try {
      setOptimisticSchools({ action: "add", school });

      const res = await schoolClientApi.post(school);
      setSchools((prev) => [res.data!, ...prev]);

      toast.success("School added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add school");
    }
  };

  const editSchool = async (school: School) => {
    try {
      setOptimisticSchools({ action: "edit", school });

      const res = await schoolClientApi.put(school.id.toString(), school);
      setSchools((prev) =>
        prev.map((s) => (s.id === school.id ? res.data! : s))
      );

      toast.success("School updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit school");
    }
  };

  const deleteSchool = async (school: School) => {
    try {
      toast.info("Deleting school...");
      setOptimisticSchools({ action: "delete", school });

      await schoolClientApi.delete(school.id.toString());
      setSchools((prev) => prev.filter((s) => s.id !== school.id));

      toast.success("School deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete school");
    }
  };

  const onAddClick = ({ name }: SchoolForm) => {
    form.reset();
    startTransition(async () => {
      if (schoolToEdit) {
        toast.info("Updating school...");
        await editSchool({
          ...schoolToEdit,
          name,
        });
        setSchoolToEdit(null);
      } else {
        toast.info("Adding school...");
        await addSchool({
          name,
        } as School);
      }
    });
  };

  const onEditClick = (school: School) => {
    if (schoolToEdit?.id === school.id) {
      setSchoolToEdit(null);
      form.reset();
    } else {
      setSchoolToEdit(school);
      form.setValue("name", school.name);
    }
  };

  const onDeleteClick = (school: School) => {
    startTransition(async () => {
      await deleteSchool(school);
    });
  };

  return {
    schools: optimisticSchools,
    onAddClick,
    onEditClick,
    onDeleteClick,
    form,
    editingSchoolId: schoolToEdit?.id,
  };
};

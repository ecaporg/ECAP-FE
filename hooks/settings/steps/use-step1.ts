"use client";
import { School } from "@/types";
import { validationMessages } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOptimistic, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type UpdateSchoolType = {
  action: "add" | "edit" | "delete";
  school: School;
};

const schoolFormSchema = z.object({
  name: z.string().min(1, validationMessages.required("School Name")),
});
type SchoolForm = z.infer<typeof schoolFormSchema>;

const schoolsReducer = (prev: School[], updated: UpdateSchoolType) => {
  switch (updated.action) {
    case "add":
      return [...prev, updated.school];
    case "edit":
      return prev.map((s) => (s.id === updated.school.id ? updated.school : s));
    case "delete":
      return prev.filter((s) => s.id !== updated.school.id);
  }
};

export const useStep1 = (schools: School[] = []) => {
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
      await new Promise((resolve) => setTimeout(resolve, 10000));
    } catch (error) {
      console.error(error);
      toast.error("Failed to add school");
    }
  };

  const editSchool = async (school: School) => {
    try {
      setOptimisticSchools({ action: "edit", school });
      await new Promise((resolve) => setTimeout(resolve, 10000));
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit school");
    }
  };

  const deleteSchool = async (school: School) => {
    try {
      setOptimisticSchools({ action: "delete", school });
      await new Promise((resolve) => setTimeout(resolve, 10000));
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
    isEditing: !!schoolToEdit,
  };
};

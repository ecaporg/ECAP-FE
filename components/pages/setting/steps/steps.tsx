"use client";

import { School } from "@/types";
import { Actions, InputWithButton } from "./form";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./table";
import { useStep1 } from "@/hooks/settings/steps/use-step1";
import { useTransition } from "react";

export const STEPS = [
  {
    id: "1",
    name: "Step 1",
  },
];

export const Step1 = ({
  schools: schoolsFromProps = [],
}: {
  schools: School[];
}) => {
  const { onAddClick, onEditClick, onDeleteClick, form, schools, isEditing } =
    useStep1(schoolsFromProps);

  return (
    <div className="flex justify-center items-center gap-x-[7.5rem] flex-wrap gap-y-4">
      <InputWithButton
        fields={[
          {
            label: { htmlFor: "school-name", children: "School Name" },
            input: {
              id: "school-name",
              ...form.register("name"),
            },
          },
        ]}
        button={{
          children: isEditing ? "Update School Name" : "Add School",
          disabled: form.formState.isSubmitting || !form.formState.isValid,
        }}
        onSubmit={form.handleSubmit(onAddClick)}
        className="w-80"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>School Name</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schools.map((school) => (
            <TableRow key={school.id || "new-school"}>
              <TableCell className="text-truncate max-w-80">
                {school.name}
              </TableCell>
              <TableCell>
                <Actions
                  edit={{ onClick: () => onEditClick(school) }}
                  deletе={{ onClick: () => onDeleteClick(school) }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

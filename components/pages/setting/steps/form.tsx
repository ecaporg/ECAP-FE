"use client";

import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import { DayPicker } from "@/components/ui/day-picker";
import { FormError } from "@/components/ui/form-error";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, formatTrackDateWithShortMonth } from "@/utils";
import { LabelProps } from "@radix-ui/react-label";
import { formatDate } from "date-fns";
import { ChangeEvent } from "react";
interface InputWithButtonProps extends React.PropsWithChildren<{}> {
  onSubmit: (data: any) => Promise<void>;
  button: ButtonProps;
  fields: {
    label: LabelProps;
    input: InputProps;
    error?: string;
  }[];
  className?: string;
}

export const InputWithButton = ({
  children,
  fields,
  button,
  onSubmit,
  className,
}: InputWithButtonProps) => {
  return (
    <form className={cn("space-y-2 text-lg", className)} onSubmit={onSubmit}>
      {fields.map((field) => (
        <>
          <Label
            key={field.label.htmlFor + "label"}
            className="p-2"
            {...field.label}
          />
          <Input key={field.input.id} {...field.input} />
          <DatePikerWrapper field={field} />
          {field.error && (
            <FormError
              key={field.input.id + "error"}
              id={field.input.id + "error"}
              message={field.error}
              className="text-wrap"
            />
          )}
        </>
      ))}
      {children}
      <Button className="w-full" type="submit" {...button} />
    </form>
  );
};

const DatePikerWrapper = ({
  field,
}: {
  field: { input: InputProps; error?: string };
}) => {
  if (field.input.type === "date") {
    return (
      <DayPicker
        value={
          field.input.value ? new Date(field.input.value as string) : undefined
        }
        onChange={(date) => {
          if (field.input.onChange) {
            field.input.onChange({
              target: {
                name: field.input.name,
                value: date,
              },
            } as unknown as ChangeEvent<HTMLInputElement>);
          }
        }}
        format={formatTrackDateWithShortMonth}
        fromDate={field.input.min ? new Date(field.input.min) : undefined}
      />
    );
  }
  return null;
};

interface ActionsProps extends React.PropsWithChildren<{}> {
  edit: ButtonProps;
  deletе: ButtonProps;
}

export const Actions = ({ edit, deletе }: ActionsProps) => {
  return (
    <>
      <Button children="Edit" {...edit} />
      <Button children="Delete" {...deletе} />
    </>
  );
};

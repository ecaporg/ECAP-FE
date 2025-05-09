"use client";

import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils";
import { LabelProps } from "@radix-ui/react-label";
interface InputWithButtonProps extends React.PropsWithChildren<{}> {
  onSubmit: (data: any) => Promise<void>;
  button: ButtonProps;
  fields: {
    label: LabelProps;
    input: InputProps;
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
          <Label key={field.label.htmlFor} className="p-2" {...field.label} />
          <Input key={field.input.id} {...field.input} />
        </>
      ))}
      {children}
      <Button className="w-full" type="submit" {...button} />
    </form>
  );
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

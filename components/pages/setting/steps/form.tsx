import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LabelProps } from "@radix-ui/react-label";

interface InputWithButtonProps extends React.PropsWithChildren<{}> {
  label: LabelProps;
  button: ButtonProps;
  input: InputProps;
}

export const InputWithButton = ({
  children,
  label,
  button,
  input,
}: InputWithButtonProps) => {
  return (
    <div className="w-full space-y-2">
      <Label {...label} />
      <Input {...input} />
      {children}
      <Button className="w-full" {...button} />
    </div>
  );
};

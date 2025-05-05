import type React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils";

interface ProgressCardProps {
  title: string;
  percentage: number;
  className?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  percentage,
  className,
}) => {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center p-6 gap-8",
        className
      )}
    >
      <h2 className="font-bold">{title}</h2>
      <Progress value={percentage} className="size-[12.5rem]" />
    </Card>
  );
};

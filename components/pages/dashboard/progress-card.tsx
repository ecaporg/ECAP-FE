import type React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils";

interface ProgressCardProps {
  title: string;
  percentage: number;
  className?: string;
  progressClassName?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  percentage,
  className,
  progressClassName,
}) => {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center p-6 gap-8",
        className
      )}
    >
      <h2 className="font-bold">{title}</h2>
      <Progress
        value={percentage}
        className={cn("size-[12.5rem]", progressClassName)}
      />
    </Card>
  );
};

export const ProgressCardSkeleton = ({
  title,
  className,
}: Pick<ProgressCardProps, "title" | "className">) => {
  return (
    <ProgressCard
      title={title}
      percentage={30}
      className={className}
      progressClassName="animate-spin [&_text]:hidden [&_circle]:animate-pulse"
    />
  );
};



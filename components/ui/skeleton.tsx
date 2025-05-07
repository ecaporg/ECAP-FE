import { cn } from "@/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("animate-pulse rounded-md bg-muted h-[1em]", className)}
      {...props}
    />
  );
}

export { Skeleton };

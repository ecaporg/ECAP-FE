import { cn } from "@/utils";

export const FilterWrapper = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <section className={cn("flex flex-wrap gap-4 pt-9 pb-8", className)}>
      {children}
    </section>
  );
};

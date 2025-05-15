import { cn } from '@/utils';

export const FilterWrapper = ({
  children,
  className,
  grid = true,
}: React.PropsWithChildren<{ className?: string; grid?: boolean }>) => {
  return (
    <section
      className={cn(
        'flex flex-wrap gap-4 pt-9 pb-8',
        grid && 'lg:grid lg:grid-flow-col lg:[&_button]:w-full lg:[&_button:has(input)]:col-span-2',
        className
      )}
    >
      {children}
    </section>
  );
};

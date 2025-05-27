import { cn } from '@/utils';

export const FilterWrapper = ({
  children,
  className,
  grid = true,
  fill = true,
}: React.PropsWithChildren<{ className?: string; grid?: boolean; fill?: boolean }>) => {
  return (
    <section
      className={cn(
        'flex flex-wrap gap-x-2 gap-y-4 pt-3 pb-4',
        grid && '2xl:grid 2xl:grid-flow-col 2xl:[&_button:has(input)]:col-span-2',
        fill && '[&_button]:w-full [&>*]:flex-1 md:[&>button]:basis-2/3 [&>button]:basis-full',
        className
      )}
    >
      {children}
    </section>
  );
};

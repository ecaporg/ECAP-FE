import { cn } from '@/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('h-[1em] animate-pulse rounded-md bg-muted', className)} {...props} />;
}

export { Skeleton };

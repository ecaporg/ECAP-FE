import { cn } from '@/utils';
import { Frown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function NotImplemented({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <Card className={cn('size-full content-center text-center', className)}>
      <CardHeader>
        <CardTitle>
          This feature is not implemented yet <Frown className="inline-block size-6" />
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

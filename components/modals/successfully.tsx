'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircleIcon, Loader2 } from 'lucide-react';
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import { useState } from 'react';

export function SuccessfullyModal({
  children,
  title,
  action,
  open = false,
  onOpenChange,
}: React.PropsWithChildren<{
  title: string;
  action: (close: () => void) => Promise<void>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);
    try {
      await action(() => onOpenChange?.(false));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      className="h-[24rem] md:w-1/2"
      trigger={children}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col gap-4 w-fit">
          <Badge className="w-fit">
            <CheckCircleIcon className="size-4" />
            {title}
          </Badge>
          <Button className="w-full" onClick={handleAction} disabled={isLoading}>
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Continue ?'}
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
}

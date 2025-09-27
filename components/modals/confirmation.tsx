'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/ui/responsive-dialog';
import { CheckCircleIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function ConfirmationModal({
  children,
  title,
  action,
  open = false,
  onOpenChange,
}: React.PropsWithChildren<{
  title: string;
  action: () => Promise<void>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);
    try {
      await action();
    } catch (ignore) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      className="h-[24rem] rounded-sm md:w-1/2"
      trigger={children}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex w-fit flex-col gap-4">
          <Badge>
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

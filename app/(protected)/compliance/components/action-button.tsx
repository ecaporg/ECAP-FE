'use client';
import { Button } from '@/components/ui/button';
import type { Sample } from '@/types';

interface ActionButtonProps {
  sample: Sample;
}

export function ActionButton({ sample }: ActionButtonProps) {
  return (
    <Button variant="default" size="sm">
      Action
    </Button>
  );
}

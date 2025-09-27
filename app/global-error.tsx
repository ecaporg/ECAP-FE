'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { AlertTriangleIcon } from 'lucide-react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <AlertTriangleIcon className="h-10 w-10" />
      <h1 className="font-bold text-2xl">Oops! Something went wrong</h1>
      <Accordion type="single" className="text-gray-500 text-sm">
        <AccordionItem value="1">
          <AccordionTrigger>Details</AccordionTrigger>
          <AccordionContent>{error.message}</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}

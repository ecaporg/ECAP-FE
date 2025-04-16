'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertTriangleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AlertTriangleIcon className="w-10 h-10" />
      <h1 className="text-2xl font-bold">Oops! Something went wrong</h1>
      <Accordion type="single" className="text-sm text-gray-500">
        <AccordionItem value="1">
          <AccordionTrigger>Details</AccordionTrigger>
          <AccordionContent>{error.message}</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}

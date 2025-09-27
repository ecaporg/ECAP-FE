import { routes } from '@/constants/routes';
import { Circle } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

interface StepperProps {
  steps: string[];
  activeStep: number;
  onClick?: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  return (
    <div className="grid grid-flow-col grid-rows-3 flex-wrap gap-y-14 sm:grid-rows-2 lg:grid-rows-none">
      {steps.map((step, index) => (
        <div key={step} className="relative flex-1">
          <hr
            data-first={index === 0}
            className="-translate-y-1/2 absolute top-4 right-0 left-0 border-primary border-t data-[first=true]:left-1/2"
          />
          <Link href={`${routes.settings.setup}?step=${index}`} className="contents">
            <Circle
              className="relative mx-auto size-8 cursor-pointer fill-white stroke-[0.5px] text-primary data-[active=true]:fill-primary"
              data-active={index === activeStep}
            />
          </Link>

          <p className="mt-6 text-center font-medium text-lg text-neutral-black">{step}</p>
        </div>
      ))}
    </div>
  );
};

export { Stepper };

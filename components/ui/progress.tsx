'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

const cleanPercentage = (percentage: number) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct }: { colour: string; pct: number }) => {
  const r = 84;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
      strokeWidth="2rem"
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

const Text = ({ percentage }: { percentage: number }) => {
  return (
    <text
      className="min-w-80 fill-primary font-black text-4xl"
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const Pie = ({
  percentage,
  colour,
}: {
  percentage: number;
  colour: string;
}) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={200}>
      <g transform={`rotate(-90 ${'100 100'})`}>
        <Circle colour="lightgrey" pct={100} />
        <Circle colour={colour} pct={pct} />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};

import { cn } from '@/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const pct = cleanPercentage(value || 0);

  return (
    <ProgressPrimitive.Root ref={ref} className={cn(className)} asChild {...props}>
      <svg width={200} height={200}>
        <g transform={`rotate(-90 ${'100 100'})`}>
          <Circle colour="hsl(var(--cool-gray))" pct={100} />
          <ProgressPrimitive.Indicator asChild>
            <Circle colour="hsl(var(--primary))" pct={pct} />
          </ProgressPrimitive.Indicator>
        </g>
        <Text percentage={pct} />
      </svg>
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

const LinearProgress = ({
  value,
  className,
}: {
  value: number;
  className: string;
}) => {
  return (
    <ProgressPrimitive.Root className={cn('w-full bg-transparent', className)} value={value}>
      <ProgressPrimitive.Indicator
        className="h-full rounded-sm bg-primary"
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>
  );
};

export { Progress, LinearProgress };

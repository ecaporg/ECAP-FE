import { PageLoading } from '@/components/layouts/loading';
import { rolePage } from '@/components/layouts/role-page';
import { Stepper } from '@/components/pages/setting/stepper';
import { STEPS } from '@/components/pages/setting/steps';
import { SETUP_STEPS } from '@/constants/setupSteps';
import { RolesEnum } from 'ecap-lib/dist/constants';
import { Suspense } from 'react';

function getStep(step = '0') {
  const stepNumber = Number.parseInt(step);
  return Math.max(0, Math.min(stepNumber, SETUP_STEPS.length - 1));
}

async function TabSetup({
  searchParams,
}: {
  searchParams: Promise<{ step: string }>;
}) {
  const awaiedParams = await searchParams;
  const activeStep = getStep(awaiedParams.step);
  const StepComponent = STEPS[activeStep];
  return (
    <section className="p-10 h-full flex flex-col">
      <Stepper steps={SETUP_STEPS} activeStep={activeStep} />

      <div className="flex-1 flex flex-col justify-between items-center lg:relative">
        <Suspense fallback={<PageLoading />} key={activeStep}>
          <StepComponent />
        </Suspense>
      </div>
    </section>
  );
}

export default rolePage(TabSetup, [RolesEnum.SUPER_ADMIN]);

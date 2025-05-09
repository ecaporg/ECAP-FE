import { rolePage } from "@/components/layouts/role-page";
import { Stepper } from "@/components/pages/setting/Stepper";
import { STEPS } from "@/components/pages/setting/steps";
import { SETUP_STEPS } from "@/constants/setupSteps";

function TabSetup() {
  const activeStep = 2;
  const Step = STEPS[activeStep];
  return (
    <section className="p-10 h-full flex flex-col">
      <Stepper steps={SETUP_STEPS} activeStep={activeStep} />

      {/* Placeholder for active step content */}
      <div className="flex-1 flex justify-center items-center">
        {Step && <Step />}
      </div>
    </section>
  );
}

export default rolePage(TabSetup, ["SUPER_ADMIN"]);

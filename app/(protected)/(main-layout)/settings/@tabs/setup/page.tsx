import { rolePage } from "@/components/layouts/role-page";
import Stepper from "@/components/pages/setting/Stepper";
import { Step1 } from "@/components/pages/setting/steps/indext";
import { SETUP_STEPS } from "@/constants/setupSteps";

function TabSetup() {
  const activeStep = 0;
  return (
    <section className="p-10 h-full flex flex-col">
      <Stepper steps={SETUP_STEPS} activeStep={activeStep} />

      {/* Placeholder for active step content */}
      <div className="flex-1 flex justify-center items-center">
        <Step1 schools={[]} />
      </div>
    </section>
  );
}

export default rolePage(TabSetup, ["SUPER_ADMIN"]);

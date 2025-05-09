import { rolePage } from "@/components/layouts/role-page";
import Stepper from "@/components/pages/setting/Stepper";
import { InputWithButton } from "@/components/pages/setting/steps/form";
import { SETUP_STEPS } from "@/constants/setupSteps";

function TabSetup() {
  const activeStep = 0;
  return (
    <section className="p-10 h-full">
      <Stepper steps={SETUP_STEPS} activeStep={activeStep} />

      {/* Placeholder for active step content */}
      <div className="flex flex-col justify-center items-center">
        <InputWithButton
          label={{ htmlFor: "school-name" }}
          button={{ children: "Add School" }}
          input={{ id: "school-name" }}
        />
      </div>
    </section>
  );
}

export default rolePage(TabSetup, ["SUPER_ADMIN"]);

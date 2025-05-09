import { Step1, Step2, Step3 } from "./steps";
import { schoolServerApi } from "@/lib/api/school";
import { academyServerApi } from "@/lib/api/academy";
import { trackServerApi } from "@/lib/api/track";
import { cn } from "@/utils";

const DefaultWrapper = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center gap-x-[7.5rem] flex-wrap gap-y-4 pt-8",
        className
      )}
    >
      {children}
    </div>
  );
};

const Step1ServerWrapper = async () => {
  const schools = await schoolServerApi.findAll();

  return (
    <DefaultWrapper>
      <Step1 schools={schools.data!} />
    </DefaultWrapper>
  );
};

const StepAcademyServerWrapper = async () => {
  const academies = await academyServerApi.findAll();

  return (
    <DefaultWrapper>
      <Step2 academies={academies.data!} />
    </DefaultWrapper>
  );
};

const Step3ServerWrapper = async () => {
  const tracks = await trackServerApi.findAll();

  return (
    <DefaultWrapper>
      <Step3 tracks={tracks.data!} />
    </DefaultWrapper>
  );
};

export const STEPS = [
  Step1ServerWrapper,
  StepAcademyServerWrapper,
  Step3ServerWrapper,
];

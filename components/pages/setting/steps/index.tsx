import { Step1, Step2, Step3, Step4 } from "./steps";
import { schoolServerApi } from "@/lib/api/school";
import { academyServerApi } from "@/lib/api/academy";
import { trackServerApi, calendarServerApi } from "@/lib/api/track";
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

const Step2ServerWrapper = async () => {
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

const Step4ServerWrapper = async () => {
  const calendars = await calendarServerApi.findAll();

  return (
    <DefaultWrapper className="flex-1 h-full px-6 py-10">
      <DefaultWrapper className="border border-border py-10 flex-1 h-full relative">
        <Step4 calendars={calendars.data!} />
      </DefaultWrapper>
    </DefaultWrapper>
  );
};

export const STEPS = [
  Step1ServerWrapper,
  Step2ServerWrapper,
  Step3ServerWrapper,
  Step4ServerWrapper,
];

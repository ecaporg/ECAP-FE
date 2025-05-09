import { Step1 } from "./steps";

const Step1ServerWrapper = async () => {
  const schools = await getSchools();
  return <Step1 schools={schools} />;
};

export const STEPS = [Step1ServerWrapper];

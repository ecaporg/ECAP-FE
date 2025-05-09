import { Step1 } from "./steps";
import { schoolServerApi } from "@/lib/api/school";
const Step1ServerWrapper = async () => {
  const schools = await schoolServerApi.findAll();
  return <Step1 schools={schools} />;
};

export const STEPS = [Step1ServerWrapper];

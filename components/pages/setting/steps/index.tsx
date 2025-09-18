import { academyServerApi } from '@/lib/api/academy';
import { schoolServerApi } from '@/lib/api/school';
import { calendarServerApi, trackServerApi } from '@/lib/api/track';
import { Step1, Step2, Step3, Step4, Step5, Step6 } from './steps';

const Step1ServerWrapper = async () => {
  const schools = await schoolServerApi.findAll();

  return <Step1 schools={schools.data!} />;
};

const Step2ServerWrapper = async () => {
  const academies = await academyServerApi.findAll();

  return <Step2 academies={academies.data!} />;
};

const Step3ServerWrapper = async () => {
  const tracks = await trackServerApi.findAll();

  return <Step3 tracks={tracks.data!} />;
};

const Step4ServerWrapper = async () => {
  const calendars = await calendarServerApi.findAll();

  return <Step4 calendars={calendars.data!} />;
};

const Step5ServerWrapper = async () => {
  const tracks = await trackServerApi.findAllWithLearningPeriods();

  return <Step5 tracks={tracks.data!} />;
};

const Step6ServerWrapper = async () => {
  const tracks = await trackServerApi.findAllWithSemesters();

  return <Step6 tracks={tracks.data!} />;
};

export const STEPS = [
  Step1ServerWrapper,
  Step2ServerWrapper,
  Step3ServerWrapper,
  Step4ServerWrapper,
  Step5ServerWrapper,
  Step6ServerWrapper,
];

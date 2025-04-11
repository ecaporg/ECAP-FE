import { LearningPeriodFilter } from "@/components/filters/learning-period.filter";

export function TeacherFilters() {
  return (
    <section className="flex flex-row gap-4">
      <LearningPeriodFilter availablePeriods={['1 Month', '3 Months', '6 Months', '1 Year']} />
    </section>
  );
}

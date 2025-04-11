import { BaseFilter } from "./base";

interface LearningPeriodFilterProps {
    availablePeriods: string[];
}

export const LearningPeriodFilter = ({availablePeriods}: LearningPeriodFilterProps) => {
    return (
        <BaseFilter label="Learning Period" slug="learningPeriod" options={availablePeriods.map(period => ({ label: period, value: period }))} />
    );
};



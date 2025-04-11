import { PaginationSection } from '@/components/table/pagination-section';
import { TeacherFilters } from './components/filters';

export default function CompliancePage() {
  return (
    <>
      <TeacherFilters />
      <PaginationSection
        currentPage={1}
        totalPages={10}
        learningPeriod="2024-01-01 to 2024-01-31"
        dueDate="2024-01-31"
        completedString="5/50 students completed"
        status="In Progress"
      />
    </>
  );
}

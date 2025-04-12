import { PaginationSection } from '@/components/table/pagination-section';
import { TeacherFilters } from './components/filters';
import { StudentsTable } from './components/students-table';

export default function CompliancePage() {
  // throw new Error('something went wrong');
  return (
    <HeaderSection>
      <StudentsTable
        students={Array.from(
          { length: 15 },
          (i, index) =>
            ({
              academy: {
                id: '1',
                name: 'Academy A',
              } as any,
              school: {
                id: '1',
                name: 'School A',
              } as any,
              track: {
                id: '1',
                name: 'Track A',
              } as any,
              user: {
                id: index,
                firstname: 'John',
                lastname: 'Doe',
              } as any,
              grade: '1',
            }) as any
        )}
      />
    </HeaderSection>
  );
}

const HeaderSection = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <TeacherFilters />
      <PaginationSection
        totalPages={10}
        learningPeriod="2024-01-01 to 2024-01-31"
        dueDate="2024-01-31"
        completedString="5/50 students completed"
        status="In Progress"
      />
      {children}
    </>
  );
};

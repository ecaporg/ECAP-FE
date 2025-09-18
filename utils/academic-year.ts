import { FILTER_SEPARATOR_FOR_MULTIPLE_VALUES } from '@/constants/filter';
import type { ITenant, IAcademicYear } from '@/types';

const getDefaultAcademicYearIds = (tenant: ITenant, academicYearIds?: string) => {
  if (academicYearIds) {
    return academicYearIds.split(FILTER_SEPARATOR_FOR_MULTIPLE_VALUES).filter(Boolean);
  }
  const day = new Date();
  let currentAcademicYear: IAcademicYear | undefined;

  for (const track of tenant.tracks) {
    if (track.semesters && track.academicYear) {
      const hasActiveSemester = track.semesters.some(
        (semester) => new Date(semester.start_date) <= day && new Date(semester.end_date) >= day
      );
      if (hasActiveSemester) {
        currentAcademicYear = track.academicYear;
        break;
      }
    }
  }

  if (!currentAcademicYear) {
    if (tenant.tracks && tenant.tracks.length > 0 && tenant.tracks[0].academicYear) {
      currentAcademicYear = tenant.tracks[0].academicYear;
    } else {
      return [];
    }
  }

  return [currentAcademicYear.id.toString()];
};

export { getDefaultAcademicYearIds };

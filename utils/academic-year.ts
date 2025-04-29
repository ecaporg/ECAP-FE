import { Tenant } from "@/types/school";

const getDefaultAcademicYearIds = (
  tenant: Tenant,
  academicYearIds?: string
) => {
  if (academicYearIds) {
    return academicYearIds.split(",");
  }
  const day = new Date();
  const id = tenant.tracks
    .map((track) => track.academicYear)
    .find((year) =>
      year.semesters.some(
        (semester) =>
          new Date(semester.start_date) <= day &&
          new Date(semester.end_date) >= day
      )
    )!.id;
  return [id.toString()];
};

export { getDefaultAcademicYearIds };

import { Admin, Director, Teacher } from "./staff";
import { Student } from "./student";
import { Track } from "./track";

export type Tenant = {
  name: string;

  schools: School[];

  admins: Admin[];

  academies: Academy[];

  tracks: Track[];
};

export type Academy = {
  name: string;
  tenant: Tenant;
};

export type Semester = {
  school_id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  school: School;
};

export type School = {
  name: string;

  tenant_id: number;

  tenant: Tenant;

  semesters: Semester[];

  students: Student[];

  teachers: Teacher[];

  directors: Director[];
};

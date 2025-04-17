import { Academy, School, Tenant } from "./school";
import { Sample } from "./student";
import { User } from "./user";
import { GenericEntity } from "./shared";

export type Staff = GenericEntity & {
  user_id: number;
  user: User;
};

export type Teacher = Staff & {
  school_id: number;
  school: School;
  samples: Sample[];
};

export type Director = Staff & {
  school_id: number;
  academy_id: number;
  user: User;
  school: School;
  academy: Academy;
};

export type Admin = Staff & {
  tenant_id: number;
  tenant: Tenant;
};

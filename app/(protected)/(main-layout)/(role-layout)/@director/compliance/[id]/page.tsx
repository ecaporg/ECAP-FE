import { rolePage } from "@/components/layouts/role-page";

import { CompliancePageTeacher } from "@/roles/@admin/compliance/[id]/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teacher Compliance",
};

export default rolePage(CompliancePageTeacher, ["DIRECTOR"]);

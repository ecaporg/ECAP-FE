import { rolePage } from "@/components/layouts/role-page";

import { CompliancePageTeacher } from "@/roles/@admin/compliance/[id]/page";

export default rolePage(CompliancePageTeacher, ["DIRECTOR"]);

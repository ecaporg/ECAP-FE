import { rolePage } from "@/components/layouts/role-page";
import { CompliancePage } from "@/roles/@admin/compliance/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance",
};

export default rolePage(CompliancePage, ["DIRECTOR"]);

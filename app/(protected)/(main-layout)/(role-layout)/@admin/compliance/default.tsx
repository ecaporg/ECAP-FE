import { getUser } from "@/lib/get-user";
import { notFound } from "next/navigation";

export default async function Default() {
  const user = await getUser();

  if (user?.role !== "ADMIN" && user?.role !== "SUPER_ADMIN") {
    notFound();
  }

  // This will only render if the user is an ADMIN or SUPER_ADMIN
  return null;
}

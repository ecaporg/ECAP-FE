import TabStudents from "./students/page";

export default function DefaultTab({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  return <TabStudents searchParams={searchParams} />;
}

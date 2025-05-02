export default function ComplianceAdminTabsLayout({
  children,
  tabs,
}: {
  children: React.ReactNode;
  tabs: React.ReactNode;
}) {
  return (
    <>
      {children}
      {tabs}
    </>
  );
}

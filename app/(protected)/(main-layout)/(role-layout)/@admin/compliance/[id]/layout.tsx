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
      <section className="lg:h-full lg:inline-grid has-[>section]:grid-rows-[auto_auto_1fr] grid-flow-row-dense overflow-y-auto lg:has-[>section]:overflow-hidden max-w-[100vw]">
        {tabs}
      </section>
    </>
  );
}

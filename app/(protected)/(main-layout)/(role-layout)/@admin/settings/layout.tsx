export default function SettingsLayout({
  children,
  tabs,
}: {
  children: React.ReactNode;
  tabs: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-2.5 py-7">
      {children}
      {tabs}
    </div>
  );
}

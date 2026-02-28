export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar — US-F10 */}
      <aside className="w-64 shrink-0 bg-surface border-r border-border" />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header — US-F11 */}
        <header className="h-16 shrink-0 border-b border-border bg-surface" />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

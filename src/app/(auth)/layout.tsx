export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* ── Left branding panel (desktop only) ─────────────────── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 40% 50%, hsl(217 91% 20%) 0%, hsl(215 28% 7%) 70%)",
        }}
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
          }}
        />

        {/* Glow orb */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "hsl(217 91% 60%)" }}
        />

        {/* Content */}
        <div className="relative z-10 text-center space-y-6 max-w-sm">
          <div>
            <h1 className="text-6xl font-bold tracking-tighter text-gradient-brand">
              Beakon
            </h1>
            <p className="mt-3 text-lg text-foreground/70 font-light">
              Foco com propósito
            </p>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Kanban inteligente para TDAH</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span>Pomodoro integrado com gamificação</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-warning" />
              <span>Conquistas e XP para cada tarefa</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ────────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-surface px-6 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 text-center">
          <span className="text-3xl font-bold text-gradient-brand">Beakon</span>
          <p className="text-sm text-muted-foreground mt-1">Foco com propósito</p>
        </div>
        {children}
      </div>
    </div>
  );
}

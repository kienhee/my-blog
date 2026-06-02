export function BackgroundGrid() {
  return (
    <div
      className="fixed inset-0 grid grid-cols-4 pointer-events-none -z-10 px-6 md:px-12 blur-[0.2px]"
      aria-hidden="true"
    >
      <div className="border-r border-[var(--border)] opacity-[0.035] dark:opacity-[0.065]" />
      <div className="border-r border-[var(--border)] opacity-[0.035] dark:opacity-[0.065]" />
      <div className="border-r border-[var(--border)] opacity-[0.035] dark:opacity-[0.065]" />
      <div className="h-full" />
    </div>
  );
}

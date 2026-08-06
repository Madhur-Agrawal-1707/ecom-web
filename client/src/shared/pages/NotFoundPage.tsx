export function NotFoundPage(): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-semibold text-[var(--color-text)]">404</h1>
      <p className="text-[var(--color-text-muted)]">Page not found.</p>
    </main>
  );
}
import { Spinner, Typography } from "@/shared/components";

export function AuthLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <Spinner size="lg" label="Checking your session" />
      <Typography variant="bodySmall" className="text-[var(--color-text-muted)]">
        Checking your session...
      </Typography>
    </div>
  );
}
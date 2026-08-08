import type { ReactNode } from "react";
import { Card, Container, Typography } from "@/shared/components";

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-muted)] px-4 py-12">
      <Container maxWidth="sm">
        <Card variant="elevated" padding="lg" className="mx-auto w-full max-w-md">
          <div className="mb-6 flex flex-col gap-1 text-center">
            <Typography as="h1" variant="h2">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="bodySmall" className="text-[var(--color-text-muted)]">
                {subtitle}
              </Typography>
            )}
          </div>

          {children}
        </Card>
      </Container>
    </div>
  );
}
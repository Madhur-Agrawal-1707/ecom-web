import type { HTMLAttributes } from "react";
import { cn } from "../../../lib/cn";

export interface AnnouncementBarProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
}

export function AnnouncementBar({
  message,
  className,
  ...props
}: AnnouncementBarProps) {
  return (
    <div
      role="region"
      aria-label="Announcement"
      className={cn(
        "w-full bg-[var(--color-accent)] px-4 py-2 text-center text-sm text-[var(--color-bg)]",
        className,
      )}
      {...props}
    >
      {message}
    </div>
  );
}
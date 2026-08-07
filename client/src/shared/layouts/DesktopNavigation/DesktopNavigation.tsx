import type { HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";
import { DEFAULT_NAV_LINKS } from "../constants";
import type { NavLink } from "../types";

export interface DesktopNavigationProps extends HTMLAttributes<HTMLElement> {
  links?: NavLink[];
}

export function DesktopNavigation({
  links = DEFAULT_NAV_LINKS,
  className,
  ...props
}: DesktopNavigationProps) {
  return (
    <nav
      aria-label="Primary"
      className={cn("hidden items-center gap-6 md:flex", className)}
      {...props}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className="text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-text-muted)]"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
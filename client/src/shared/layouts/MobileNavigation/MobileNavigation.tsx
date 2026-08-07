import { useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";
import { CloseIcon } from "../icons";
import { DEFAULT_NAV_LINKS } from "../constants";
import type { NavLink } from "../types";

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  links?: NavLink[];
}

export function MobileNavigation({
  isOpen,
  onClose,
  links = DEFAULT_NAV_LINKS,
}: MobileNavigationProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div className="md:hidden">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full w-72 max-w-[80vw] flex-col gap-6 bg-[var(--color-bg)] p-6 shadow-lg transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[var(--color-text-muted)]">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            tabIndex={isOpen ? 0 : -1}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            <CloseIcon aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile primary" className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={onClose}
              tabIndex={isOpen ? 0 : -1}
              className="text-base font-medium text-[var(--color-text)] hover:text-[var(--color-text-muted)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
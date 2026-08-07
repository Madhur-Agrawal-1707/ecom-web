import { useState, type HTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";
import { Container, Typography } from "../../../shared/components";
import { DesktopNavigation } from "../DesktopNavigation";
import { MobileNavigation } from "../MobileNavigation";
import { SearchBar } from "../SearchBar";
import { BRAND_NAME, DEFAULT_NAV_LINKS } from "../constants";
import type { NavLink } from "../types";
import { HeartIcon, MenuIcon, ShoppingBagIcon, UserIcon } from "../icons";

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  links?: NavLink[];
  brandName?: string;
  onWishlistClick?: () => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
}

export function Navbar({
  links = DEFAULT_NAV_LINKS,
  brandName = BRAND_NAME,
  onWishlistClick,
  onCartClick,
  onProfileClick,
  className,
  ...props
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)]",
        className,
      )}
      {...props}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] md:hidden"
            >
              <MenuIcon aria-hidden="true" />
            </button>

            <Link to="/" aria-label={`${brandName} home`}>
              <Typography as="span" variant="h4" className="tracking-tight">
                {brandName}
              </Typography>
            </Link>
          </div>

          <DesktopNavigation links={links} />

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden w-56 lg:block">
              <SearchBar />
            </div>

            <IconButton label="Wishlist" onClick={onWishlistClick}>
              <HeartIcon aria-hidden="true" />
            </IconButton>

            <IconButton label="Cart" onClick={onCartClick}>
              <ShoppingBagIcon aria-hidden="true" />
            </IconButton>

            <IconButton label="Account" onClick={onProfileClick}>
              <UserIcon aria-hidden="true" />
            </IconButton>
          </div>
        </div>
      </Container>

      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={links}
      />
    </header>
  );
}

interface IconButtonProps {
  label: string;
  onClick?: () => void;
  children: ReactNode;
}

function IconButton({ label, onClick, children }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
    >
      {children}
    </button>
  );
}
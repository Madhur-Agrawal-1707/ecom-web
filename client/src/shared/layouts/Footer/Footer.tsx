import type { HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";
import { Container, Typography } from "../../../shared/components";
import {
  BRAND_NAME,
  DEFAULT_QUICK_LINKS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_SUPPORT_LINKS,
} from "../constants";
import type { FooterLinkGroup, SocialLink } from "../types";

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  brandName?: string;
  brandDescription?: string;
  quickLinks?: FooterLinkGroup;
  supportLinks?: FooterLinkGroup;
  socialLinks?: SocialLink[];
}

export function Footer({
  brandName = BRAND_NAME,
  brandDescription,
  quickLinks = DEFAULT_QUICK_LINKS,
  supportLinks = DEFAULT_SUPPORT_LINKS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  className,
  ...props
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-[var(--color-border)] bg-[var(--color-bg-muted)]",
        className,
      )}
      {...props}
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Typography as="span" variant="h4">
              {brandName}
            </Typography>
            {brandDescription && (
              <Typography variant="bodySmall" className="text-[var(--color-text-muted)]">
                {brandDescription}
              </Typography>
            )}
          </div>

          <FooterColumn group={quickLinks} />
          <FooterColumn group={supportLinks} />

          <div className="flex flex-col gap-3">
            <Typography as="h4" variant="h4">
              Follow Us
            </Typography>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] py-6">
          <Typography
            variant="caption"
            className="text-center text-[var(--color-text-muted)]"
          >
            © {year} {brandName}. All rights reserved.
          </Typography>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ group }: { group: FooterLinkGroup }) {
  return (
    <div className="flex flex-col gap-3">
      <Typography as="h4" variant="h4">
        {group.title}
      </Typography>
      <ul className="flex flex-col gap-2">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
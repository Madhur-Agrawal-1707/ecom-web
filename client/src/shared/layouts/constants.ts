import { env } from "../../config/env";
import type { FooterLinkGroup, NavLink, SocialLink } from "./types";

export const BRAND_NAME = env.VITE_APP_NAME;

export const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Sale", href: "/sale" },
];

export const DEFAULT_QUICK_LINKS: FooterLinkGroup = {
  title: "Quick Links",
  links: [
    { label: "About Us", href: "/about" },
    { label: "Shop", href: "/shop" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Blog", href: "/blog" },
  ],
};

export const DEFAULT_SUPPORT_LINKS: FooterLinkGroup = {
  title: "Customer Support",
  links: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "FAQs", href: "/faqs" },
  ],
};

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "X", href: "#" },
];
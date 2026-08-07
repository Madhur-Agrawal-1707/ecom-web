import { Outlet } from "react-router-dom";
import { AnnouncementBar } from "../AnnouncementBar";
import { Navbar, type NavbarProps } from "../Navbar";
import { Footer, type FooterProps } from "../Footer";

export interface CustomerLayoutProps {
  announcement?: string;
  navbarProps?: NavbarProps;
  footerProps?: FooterProps;
}

export function CustomerLayout({
  announcement,
  navbarProps,
  footerProps,
}: CustomerLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {announcement && <AnnouncementBar message={announcement} />}

      <Navbar {...navbarProps} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer {...footerProps} />
    </div>
  );
}
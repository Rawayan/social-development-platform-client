
import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";
import CopyrightYear from "./copyright-year";

function XLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-[18px] fill-current"
    >
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.5L5.3 22H2.1l7.3-8.4L1.6 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20Z" />
    </svg>
  );
}

function FacebookLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-[18px] fill-current"
    >
      <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" />
    </svg>
  );
}

function InstagramLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-[18px] fill-none stroke-current"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.8"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
  { label: "Create Event", href: "/create-event" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: <FacebookLogo />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: <InstagramLogo />,
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: <XLogo />,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="site-container">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:py-16">
          {/* Brand section */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2"
              aria-label="Together home"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Leaf size={22} />
              </span>

              <span className="text-xl font-bold tracking-tight text-foreground">
                Together
              </span>
            </Link>

            <p className="text-sm leading-7 text-muted-foreground">
              Bringing people together to create positive change. Join local
              initiatives, support your community, and make every action
              meaningful.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-foreground">
              Quick Links
            </h2>

            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight size={13} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-foreground">
              Connect With Us
            </h2>

            <p className="mb-4 text-sm leading-6 text-muted-foreground">
              Follow our journey and stay connected with the community.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.label}`}
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-3 border-t border-border py-5 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © <CopyrightYear /> Together. All rights reserved.
          </p>

          <p>Made with care for a better community.</p>
        </div>
      </div>
    </footer>
  );
}

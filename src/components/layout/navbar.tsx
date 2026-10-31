
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Leaf,
  Menu,
  X,
  ChevronDown,
  UserRound,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";

export interface NavbarUser {
  name: string;
  email: string;
  image?: string;
}

interface NavbarProps {
  user?: NavbarUser | null;
  onLogout?: () => void;
}

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
];

export default function Navbar({
  user = null,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="site-container">
        <div className="flex h-16 items-center justify-between gap-4 md:h-[76px]">

          {/* Brand Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center gap-2.5"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Leaf size={23} strokeWidth={2.2} />
            </span>

            <span className="text-xl font-bold tracking-tight text-foreground">
              Together<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 md:flex"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth / Profile */}
          <div className="hidden items-center gap-3 md:flex">
            {!user ? (
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
              >
                Login
              </Link>
            ) : (
              <div className="group/profile relative">
                <button
                  type="button"
                  title={user.name}
                  aria-label={`Open profile menu for ${user.name}`}
                  className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 transition-colors hover:bg-muted"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={`${user.name}'s profile`}
                      className="size-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary">
                      <UserRound size={19} />
                    </span>
                  )}

                  <span className="max-w-28 truncate text-sm font-semibold text-foreground">
                    {user.name}
                  </span>

                  <ChevronDown size={15} className="text-muted-foreground" />
                </button>

                {/* Profile Dropdown */}
                <div className="invisible absolute right-0 top-full z-50 mt-2 w-60 translate-y-2 rounded-xl border border-border bg-card p-2 opacity-0 shadow-xl transition-all duration-200 group-hover/profile:visible group-hover/profile:translate-y-0 group-hover/profile:opacity-100 group-focus-within/profile:visible group-focus-within/profile:translate-y-0 group-focus-within/profile:opacity-100">
                  <div className="border-b border-border px-3 py-3">
                    <p
                      className="truncate text-sm font-semibold text-foreground"
                      title={user.name}
                    >
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <div className="space-y-1 py-2">
                    <Link
                      href="/create-event"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary hover:text-primary"
                    >
                      <CalendarDays size={17} />
                      Create Event
                    </Link>

                    <Link
                      href="/manage-events"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary hover:text-primary"
                    >
                      <Settings size={17} />
                      Manage Events
                    </Link>

                    <Link
                      href="/joined-events"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary hover:text-primary"
                    >
                      <UserRound size={17} />
                      Joined Events
                    </Link>
                  </div>

                  <div className="border-t border-border pt-2">
                    <button
                      type="button"
                      onClick={onLogout}
                      disabled={!onLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1"
            >
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 border-t border-border" />

              {!user ? (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="mx-1 flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground"
                >
                  Login
                </Link>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-4 py-3">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={`${user.name}'s profile`}
                        className="size-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
                        <UserRound size={19} />
                      </span>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/create-event"
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-3 text-sm text-foreground hover:bg-secondary"
                  >
                    Create Event
                  </Link>

                  <Link
                    href="/manage-events"
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-3 text-sm text-foreground hover:bg-secondary"
                  >
                    Manage Events
                  </Link>

                  <Link
                    href="/joined-events"
                    onClick={closeMobileMenu}
                    className="rounded-lg px-4 py-3 text-sm text-foreground hover:bg-secondary"
                  >
                    Joined Events
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      onLogout?.();
                    }}
                    disabled={!onLogout}
                    className="mx-1 flex h-11 items-center justify-center gap-2 rounded-lg bg-destructive/10 text-sm font-semibold text-destructive disabled:opacity-50"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

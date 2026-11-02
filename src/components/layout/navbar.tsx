
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronDown,
  Leaf,
  LogOut,
  Menu,
  Settings,
  UserRound,
  X,
} from "lucide-react";

import ThemeToggle from "@/components/theme-toggle";

export interface NavbarUser {
  name: string;
  email: string;
  image?: string;
}

interface NavbarProps {
  user?: NavbarUser | null;
  onLogout?: () => void;
}

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Upcoming Events",
    href: "/upcoming-events",
  },
];

export default function Navbar({
  user = null,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const handleLogout = () => {
    closeMobileMenu();
    onLogout?.();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 shadow-sm backdrop-blur-md">
      <nav
        className="site-container flex h-16 items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Together home"
          onClick={closeMobileMenu}
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Leaf size={23} />
          </span>

          <span className="text-xl font-bold tracking-tight text-foreground">
            Together
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {!user ? (
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                onBlur={(event) => {
                  if (
                    !event.currentTarget.parentElement?.contains(
                      event.relatedTarget as Node | null
                    )
                  ) {
                    setProfileMenuOpen(false);
                  }
                }}
                className="flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3 transition-colors hover:bg-muted"
                aria-expanded={profileMenuOpen}
                aria-haspopup="true"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={`${user.name}'s profile`}
                    className="size-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <UserRound size={17} />
                  </span>
                )}

                <span
                  title={user.name}
                  className="max-w-28 truncate text-sm font-medium text-foreground"
                >
                  {user.name}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-muted-foreground transition-transform ${
                    profileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Desktop Profile Dropdown */}
              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-xl border border-border bg-card p-2 shadow-xl">
                  {/* User Information */}
                  <div className="border-b border-border px-3 py-3">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  {/* Profile Links */}
                  <div className="space-y-1 py-2">
                    <Link
                      href="/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                    >
                      <UserRound size={17} />
                      My Profile
                    </Link>

                    <Link
                      href="/create-event"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                    >
                      <CalendarDays size={17} />
                      Create Event
                    </Link>

                    <Link
                      href="/manage-events"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                    >
                      <Settings size={17} />
                      Manage Events
                    </Link>

                    <Link
                      href="/joined-events"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                    >
                      <UserRound size={17} />
                      Joined Events
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-border pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={!onLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="site-container space-y-2 py-4">
            {/* Main Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                {link.label}
              </Link>
            ))}

            <div className="my-3 border-t border-border" />

            {/* Logged Out */}
            {!user ? (
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Login
              </Link>
            ) : (
              <>
                {/* Mobile User Information */}
                <div className="flex items-center gap-3 rounded-xl bg-card p-3">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={`${user.name}'s profile`}
                      className="size-11 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      <UserRound size={20} />
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

                {/* Mobile Profile Links */}
                <div className="space-y-1 pt-2">
                  <Link
                    href="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    <UserRound size={18} />
                    My Profile
                  </Link>

                  <Link
                    href="/create-event"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    <CalendarDays size={18} />
                    Create Event
                  </Link>

                  <Link
                    href="/manage-events"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    <Settings size={18} />
                    Manage Events
                  </Link>

                  <Link
                    href="/joined-events"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    <UserRound size={18} />
                    Joined Events
                  </Link>
                </div>

                {/* Mobile Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={!onLogout}
                  className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-destructive/30 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "sonner";

import AuthNavbar from "@/components/layout/auth-navbar";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Together | Community Development Platform",
    template: "%s | Together",
  },
  description:
    "Together is a community development platform where people connect, organize social events, and make a positive impact.",
  keywords: [
    "Together",
    "Community Development",
    "Social Events",
    "Volunteering",
    "Community Service",
    "Social Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthNavbar />

          <main className="min-h-screen">{children}</main>

          <Footer />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}



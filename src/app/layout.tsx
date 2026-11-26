import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import ThemeInitializer from "@/components/theme-initializer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Classified.",
    template: "%s | Classified.",
  },
  description: "Classified. — find, list, and connect with confidence.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-dvh overflow-x-hidden antialiased" suppressHydrationWarning>
        <ThemeInitializer />
        <div suppressHydrationWarning className="flex min-h-dvh min-w-0 flex-col bg-white text-zinc-900 transition-colors duration-500 ease-out motion-reduce:transition-none dark:bg-black dark:text-zinc-100">
          <div suppressHydrationWarning className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

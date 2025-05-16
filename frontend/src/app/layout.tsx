import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import GlobalProvider from "./provider";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site.config";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
    url: siteConfig.url,
  },
  twitter: {
    card: (siteConfig.tCard ?? "summary_large_image") as
      | "summary_large_image"
      | "summary"
      | "player"
      | "app",
    title: siteConfig.tTitle,
    description: siteConfig.tDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          monaSans.className,
        )}
      >
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import "./globals.css";
import GlobalProvider from "./provider";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site.config";
import { montserratAlternates } from "@/fonts";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
    url: siteConfig.url,
  },
  icons: siteConfig.icons,
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
          montserratAlternates.className,
        )}
      >
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}

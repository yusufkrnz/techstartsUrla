import type { Metadata } from "next";
import { Instrument_Sans, Marcellus } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

// Roobert (kaynak sitedeki gövde fontu) lisanslı; en yakın açık muadil Instrument Sans
const sans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

const display = Marcellus({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: site.metaTitle,
  description: site.metaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

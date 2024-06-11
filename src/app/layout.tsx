import type { Metadata } from "next";
import "./globals.css";
import { balooThambi2, mitr, notoSans } from "./fonts";

// Next.js automatically updates metadata using this export.
// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Home - Frame",
  description:
    "Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre.",
  keywords: ["fotografia", "fotografi frame", "fotografi", "frame"],
};

const fonts = [balooThambi2.variable, mitr.variable, notoSans.variable].join(
  " "
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fonts}>{children}</body>
    </html>
  );
}

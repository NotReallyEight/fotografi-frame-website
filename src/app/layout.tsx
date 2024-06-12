import type { Metadata } from "next";
import "./globals.css";
import { balooThambi2, mitr, notoSans } from "./fonts";

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

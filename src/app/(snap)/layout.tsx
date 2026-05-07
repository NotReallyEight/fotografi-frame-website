import "./snap-globals.css";
import { ibmPlexMono, inter, spaceGrotesk } from "../fonts";
import { Metadata } from "next";

const fonts = [
  ibmPlexMono.variable,
  inter.variable,
  spaceGrotesk.variable,
].join(" ");

// Next.js automatically updates metadata using this export.
// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: "/icon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

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

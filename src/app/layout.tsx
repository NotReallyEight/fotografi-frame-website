import "./globals.css";
import "@videojs/react/video/skin.css";
import { ibmPlexMono, inter, spaceGrotesk } from "./fonts";
import { Metadata } from "next";
import { NavProvider } from "@/contexts/NavContext";
import config from "@/config";

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
    <NavProvider>
      <html lang="en">
        <body className={fonts}>
          {config.maintenance ? (
            <div className="text-white font-family-secondary h-dvh items-center justify-center text-center flex">
              <div> Sito in lavorazione.</div>
            </div>
          ) : (
            children
          )}
        </body>
      </html>
    </NavProvider>
  );
}

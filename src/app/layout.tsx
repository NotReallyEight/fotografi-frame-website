import "./globals.css";
import {
  manrope,
  montserrat,
  playfairDisplay,
  robotoCondensed,
  robotoSlab,
} from "./fonts";

const fonts = [
  manrope.variable,
  montserrat.variable,
  playfairDisplay.variable,
  robotoCondensed.variable,
  robotoSlab.variable,
].join(" ");

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

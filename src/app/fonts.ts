import {
  Manrope,
  Montserrat,
  Playfair_Display,
  Roboto_Condensed,
  Roboto_Slab,
} from "next/font/google";

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  variable: "--font-manrope",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: "600",
  variable: "--font-montserrat",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-playfair-display",
});

export const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-roboto-condensed",
});

export const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
  variable: "--font-roboto-slab",
});

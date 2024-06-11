import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      flex: {
        2: "2 2 0%",
      },
    },
    colors: {
      primaryDark: "#000000",
      primaryLight: "#eadfe8",
      secondaryDark: "#303030",
      secondaryLight: "#b8adb6",
      textDark: "#ffffff",
      textLight: "#000000",
      enabledDark: "#ffffff",
      enabledLight: "#000000",
      disabledDark: "#b3b3b3",
      disabledLight: "#4d4d4d",
      mobileHover: "#926a8e",
    },
  },
  plugins: [],
};
export default config;

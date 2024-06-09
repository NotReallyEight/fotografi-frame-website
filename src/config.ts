const config = {
  styles: {
    primary: {
      dark: "#000000",
      light: "#eadfe8",
    },
    secondary: {
      dark: "#303030",
      light: "#b8adb6",
    },
    text: {
      dark: "#ffffff",
      light: "#000000",
    },
    enabled: {
      dark: "#ffffff",
      light: "#000000",
    },
    disabled: {
      dark: "#b3b3b3",
      light: "#4d4d4d",
    },
  },
  url:
    process.env.NODE_ENV === "production"
      ? "https://www.fotografiframe.com"
      : "http://localhost:3000",
};

export default config;

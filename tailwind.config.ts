import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#101216",
        card: "#191D23",
        stroke: "#303641",
        muted: "#B8BEC8",
        white: "#F4F4F5"
      },
      fontFamily: {
        sans: ["Manrope", "Inter", "Segoe UI", "system-ui", "sans-serif"]
      },
      maxWidth: {
        page: "1440px"
      }
    }
  },
  plugins: []
} satisfies Config;

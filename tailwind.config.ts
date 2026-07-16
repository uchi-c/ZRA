import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        zra: {
          navy: "#0F2A5C",
          "navy-dark": "#0A1F42",
          "navy-light": "#1E3E76",
          gold: "#C9A24A",
          "gold-light": "#E4CE96",
          red: "#D6262A",
        },
        status: {
          green: "#1C8A3C",
          amber: "#EF7D00",
          red: "#D6262A",
        },
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 3px 0 rgb(0 0 0 / 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;

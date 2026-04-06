import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#11211d",
        mist: "#f6f4ee",
        sand: "#eadcc0",
        accent: "#ff7a00",
        pine: "#1f5c4a",
      },
      boxShadow: {
        soft: "0 24px 60px rgba(17, 33, 29, 0.08)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 1px 1px, rgba(17, 33, 29, 0.08) 1px, transparent 0)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;

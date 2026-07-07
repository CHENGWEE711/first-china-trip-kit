import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#2F2A28",
        ember: "#B13A2F",
        clay: "#D66A4F",
        sand: "#F6EFE6",
        paper: "#FFFDF9",
        mist: "#EEF4F1",
        jade: "#287568",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(47, 42, 40, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;

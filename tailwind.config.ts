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
        ink: "#1D2320",
        ember: "#B53A32",
        clay: "#D66A4F",
        sand: "#F7F5F0",
        paper: "#FCFBF8",
        mist: "#E7EEE9",
        jade: "#244C3D",
      },
      boxShadow: {
        soft: "0 14px 40px rgba(24, 33, 29, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;

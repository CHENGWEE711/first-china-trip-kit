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
        ink: "rgb(var(--color-text-primary) / <alpha-value>)",
        ember: "rgb(var(--color-brand-red) / <alpha-value>)",
        "ember-hover": "rgb(var(--color-brand-red-hover) / <alpha-value>)",
        sand: "rgb(var(--color-background-warm) / <alpha-value>)",
        paper: "rgb(var(--color-background-light) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        mist: "rgb(var(--color-brand-green-light) / <alpha-value>)",
        jade: "rgb(var(--color-brand-green) / <alpha-value>)",
        "border-soft": "rgb(var(--color-border-soft) / <alpha-value>)",
        success: "rgb(var(--color-status-success) / <alpha-value>)",
        warning: "rgb(var(--color-status-warning) / <alpha-value>)",
        error: "rgb(var(--color-status-error) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "PingFang SC", "Microsoft YaHei", "sans-serif"],
        editorial: ["var(--font-source-serif)", "Songti SC", "STSong", "serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        editorial: "var(--shadow-editorial)",
      },
    },
  },
  plugins: [],
};

export default config;

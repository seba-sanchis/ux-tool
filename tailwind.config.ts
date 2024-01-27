import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        jiggle: "jiggly 120ms ease-in-out 100ms alternate infinite",
      },
      keyframes: {
        jiggly: {
          "0%": { transform: "rotate(-0.3deg)" },
          to: { transform: "rotate(0.3deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

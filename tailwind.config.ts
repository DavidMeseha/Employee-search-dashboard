import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem"
      }
    },
    extend: {
      colors: {
        primary: "#2EAE7D",
        "primary-shade": "#134834",
        "primary-highlight": "#ECF7F3",
        secondary: "#D6DDEB",
        "secondary-highlight": "#F4F6FB",
        subtext: "#00000080",
        "strong-subtext": "#000000B2"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    }
  },
  plugins: []
};
export default config;

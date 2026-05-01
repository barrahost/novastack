import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        // Match d-infras.africa sharp style (0rem base, small variants only for subtle use)
        none: "0px",
        sm: "2px",
        DEFAULT: "2px",
        md: "4px",
        lg: "4px",
        xl: "6px",
        "2xl": "8px",
        "3xl": "10px",
        full: "9999px",
      },
      colors: {
        // Blues — coherent with d-infras.africa #00457C family
        blue: {
          primary: "#1A6BFF",   // bright for dark backgrounds
          secondary: "#00457C", // exact d-infras navy
          dark: "#003A6B",
          light: "#5A95FF",
          glow: "rgba(26,107,255,0.15)",
        },
        // Orange — exact d-infras.africa value
        orange: {
          primary: "#FF934E",
          light: "#FFB07A",
          dark: "#E8722D",
          glow: "rgba(255,147,78,0.15)",
        },
        dark: {
          950: "#03070F",
          900: "#060C18",
          800: "#0A1525",
          700: "#0D1E36",
          600: "#122540",
          500: "#1A3254",
        },
        slate: {
          text: "#94A3B8",
          muted: "#64748B",
          border: "#1E3A5F",
        },
      },
      fontFamily: {
        sans: ["Fira Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(26,107,255,0.12), transparent)",
        "gradient-card":
          "linear-gradient(135deg, rgba(26,107,255,0.07) 0%, rgba(255,147,78,0.03) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        "glow-blue": "0 0 40px rgba(26,107,255,0.2)",
        "glow-orange": "0 0 40px rgba(255,147,78,0.15)",
        card: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;

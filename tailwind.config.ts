import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      csyellow: "#F0BB00",
      csblack: "#1B1B1B",
      cswhite: "#F3F3F3",
      csblue: "#2965BA",
      cslighBlue: "#48A2DE",
      csDarkBlue: "#0A4193",
      csLightGreen: "#A6E2B8",
      csDanger: "#AE0023",
      grad1: "#2D2D2D",
      grad2: "#212536",
      grad3: "#191723",
      cspurple: "#7B61FF",
      cslightpurple: "#86ABFF",
      csgreen: "#A6E2B8",
      csChartBlue: "#45D0EE",
      csMint: "#87DDDE",
      csGray: '#DEDEE0',
      darkGray: '#646464'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      bgGradientDeg: {
        45: "45deg",
      },
    },
  },
  plugins: [],
};
export default config;

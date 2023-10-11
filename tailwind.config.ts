import type { Config } from 'tailwindcss'

const config: Config = {
  
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // screens: {
    //   'sm': '640px',
    //   // => @media (min-width: 640px) { ... }

    //   'md': '768px',
    //   // => @media (min-width: 768px) { ... }

    //   'lg': '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   'xl': '1280px',
    //   // => @media (min-width: 1280px) { ... }

    //   '2xl': '1536px',
    //   // => @media (min-width: 1536px) { ... }
    // }, 
    colors:{
        'csblack': '#1B1B1B',
        'cswhite': '#F3F3F3',
        'csblue': '#215FBD',
        'csDarkBlue': '#0A4193',
        'csLightGreen': '#A6E2B8',
        'csDanger': '#AE0023',
        'grad1': '#2D2D2D',
        'grad2': '#212536',
        'grad3': '#191723',
        'cspurple': "#7B61FF",
        'cslightpurple': '#86ABFF',
        'csgreen': '#A6E2B8',
        'csChartBlue': '#45D0EE'
        
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      bgGradientDeg: {
        45: '45deg',
      },
    },
  },
  plugins: [],
}
export default config

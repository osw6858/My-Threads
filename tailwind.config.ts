import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        darkMode: '#101010',
        darkInput: '#1E1E1E',
        darkBorder: '#262C2E',
        darkFontColor: '#6C6C6C',
        darkNav: '#05090A',
        lightInput: '#F5F5F5',
        lightFontColor: '#9E9E9E',
        hoverDarkColor: '#212121',
        whiteNav: '#F9FAFA',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: false,
    darkTheme: 'dark',
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
};
export default config;

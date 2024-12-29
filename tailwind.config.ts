import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 1.4s linear infinite',
        'loader-path': 'loader-path 1.4s ease-in-out infinite',
        'pulse-brightness': 'pulse-brightness 3s ease-in-out infinite',
      },
      keyframes: {
        'loader-path': {
          '0%': { 'stroke-dasharray': '0, 580, 0, 0, 0, 0, 0, 0, 0' },
          '50%': { 'stroke-dasharray': '0, 450, 10, 30, 10, 30, 10, 30, 10' },
          '100%': { 'stroke-dasharray': '0, 580, 0, 0, 0, 0, 0, 0, 0' },
        },
        'pulse-brightness': {
          '0%': { filter: 'brightness(0.9)' },
          '50%': { filter: 'brightness(1.2)' },
          '100%': { filter: 'brightness(0.9)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;

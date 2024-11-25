import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 1.4s linear infinite',
        'loader-path': 'loader-path 1.4s ease-in-out infinite',
      },
      keyframes: {
        'loader-path': {
          '0%': { 'stroke-dasharray': '0, 580, 0, 0, 0, 0, 0, 0, 0' },
          '50%': { 'stroke-dasharray': '0, 450, 10, 30, 10, 30, 10, 30, 10' },
          '100%': { 'stroke-dasharray': '0, 580, 0, 0, 0, 0, 0, 0, 0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
export default config;

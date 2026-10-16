/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pri: { DEFAULT: '#1351B4', l: '#DBE8FB', d: '#0C326F' },
        nav: '#071D41',
        ok: { DEFAULT: '#168821', l: '#E3F5E1' },
        err: { DEFAULT: '#E52207', l: '#FDE0DB' },
        warn: { DEFAULT: '#FFCD07', l: '#FFF5C2' },
        ink: '#333',
        mut: '#636363',
      },
    },
  },
  plugins: [],
};

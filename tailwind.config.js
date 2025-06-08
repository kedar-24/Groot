/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      
    },
  },
  extend: {
  animation: {
    'pulse-fast': 'pulse 0.5s ease-in-out',
  },
}
,
  extend: {
  animation: {
    'fade-in': 'fadeIn 0.3s ease-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
  },
},
  plugins: [],
};

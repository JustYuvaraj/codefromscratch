const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
        mono: ['"JetBrains Mono"', 'monospace'], // or 'Fira Code', etc.
      },
      animation: {
        'gradient-bg': 'gradient-bg 15s ease infinite',
        'tempting-glow': 'tempting-glow 2.5s ease-in-out infinite',
      },
      keyframes: {
        'gradient-bg': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'tempting-glow': {
          '0%, 100%': {
            transform: 'scale(1)',
            'box-shadow': '0 0 15px 0px rgba(0, 242, 255, 0.4)',
          },
          '50%': {
            transform: 'scale(1.05)',
            'box-shadow': '0 0 30px 5px rgba(0, 242, 255, 0.7)',
          },
        }
      },
    },
  },
  plugins: [],
};

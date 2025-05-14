/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sienna: "#e76f51",
        brown: "#f4a261",
        saffron: "#e9c46a",
        persian: "#2a9d8f",
        charcoal: "#264653",
      },
      typography: {
        DEFAULT: {
          css: {
            code: {
              backgroundColor: '#1e1e1e',
              padding: '0.2em 0.4em',
              borderRadius: '0.3em',
              fontWeight: '400',
              color: '#f8f8f2'
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            pre: {
              backgroundColor: '#1e1e1e',
              color: '#f8f8f2',
              borderRadius: '0.375rem',
              padding: '1em',
              overflow: 'auto',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};

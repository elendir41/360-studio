/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          turquoise: "var(--color-primary-turquoise)",
          yellow: "var(--color-primary-yellow)",
          blue: "var(--color-primary-blue)",
        },
        secondary: {
          grey: "var(--color-secondary-grey)",
          black: "var(--color-secondary-black)",
          white: "var(--color-secondary-white)",
        }
      }
    },
  },
  plugins: [],
};

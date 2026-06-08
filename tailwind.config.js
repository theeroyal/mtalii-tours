/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4B5D3A',
        'primary-dark': '#2D3B22',
        accent: '#7A5A3A',
        'sand-light': '#D8C3A5',
        'warm-stone': '#E0D5C7',
        'charcoal-text': '#2D2D2D'
      },
      fontFamily: {
        manrope: ['var(--font-manrope)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

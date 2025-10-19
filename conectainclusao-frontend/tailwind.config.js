/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ...sua paleta de cores 'primary', 'secondary', etc.
      keyframes: {
        fadeIn: {
          'from': { opacity: 0 },
          'to': { opacity: 1 },
        },
        slideUp: {
          'from': { transform: 'translateY(50px)', opacity: 0 },
          'to': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
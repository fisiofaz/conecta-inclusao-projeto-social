/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Isso diz ao Tailwind para escanear todos os arquivos JS, TS, JSX, TSX dentro da pasta src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
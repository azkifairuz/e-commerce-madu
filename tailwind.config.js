/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'yellow':{
          'main':'#faf33e',
          'hover':'#dbd406'
        },
      },
    },
  },
  plugins: [],
}


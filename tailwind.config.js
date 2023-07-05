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
          'main':'#ffc70b',
          'light':'#FFD447',
          'dark' : '#e0ac00',
          'hover':'#e0ac00',
        },
        'btn':{
          'primary':'#FEC834',
          'hover':'#FEBD0B'
        }
      },
      fontFamily:{
        'poppins':['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}


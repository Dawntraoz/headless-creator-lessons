const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
      },
      screens: {
        '2xl': '1280px',
      },
      gridTemplateColumns: {
        'lesson': 'minmax(0,.5fr) minmax(0,2fr) minmax(0,1fr)',
      },
      lineHeight: {
        'light': '1.15',
      },
      colors: {
        emerald: colors.emerald
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

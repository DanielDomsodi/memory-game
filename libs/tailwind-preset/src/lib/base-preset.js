const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

const brandColor = colors.cyan;

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'spin-fast': 'spin 0.45s linear infinite',
      },
      colors: {
        brand: brandColor,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

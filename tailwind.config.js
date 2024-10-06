/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#0E7A81',
        primary10: ' rgba(14, 122, 129, 0.1)',
        primaryTextColor: '#131313',
        secondaryTextColor: '#131313b3',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },

      screens: {
        '2xl-d': { max: '1535px' },
        // => @media (max-width: 1535px) { ... }

        'xl-l': { max: '1279px' },
        // => @media (max-width: 1279px) { ... }

        'lg-t': { max: '1023px' },
        // => @media (max-width: 1023px) { ... }

        'md-p': { max: '767px' },
        // => @media (max-width: 767px) { ... }

        'sm-p': { max: '639px' },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [],
};

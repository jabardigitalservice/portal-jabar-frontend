module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        lora: ['Lora', 'serif'],
        opensans: ['Open Sans', 'sans-serif']
      },
      boxShadow: {
        DEFAULT: '0px 6px 22px rgba(2, 43, 85, 0.08)'
      },
      gridTemplateColumns: {
        'news-container': '60% auto',
        'news-large': '200px auto',
        'news-small': '72px auto',
        'search-container': '300px auto'
      },
      colors: {
        green: {
          50: '#E6F6EC',
          100: '#C3E9D0',
          200: '#9BDBB3',
          300: '#70CD94',
          400: '#4DC27E',
          500: '#1FB767',
          600: '#16A75C',
          700: '#069550',
          800: '#008444',
          900: '#006430'
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121'
        },
        'blue-gray': {
          50: '#E3E7ED',
          100: '#B9C3D3',
          200: '#8D9DB5',
          300: '#627798',
          400: '#415C84',
          500: '#1A4373',
          600: '#133C6B',
          700: '#083461',
          800: '#022B55',
          900: '#001B3D'
        }
      }
    }
  },
  variants: {
    extend: {
      divideColor: ['group-hover'],
      grayscale: ['group-hover'],
      visibility: ['group-hover'],
      transform: ['group-hover'],
      scale: ['group-hover']
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}

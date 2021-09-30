export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Portal Jabar - Satu Portal untuk Semua Hal Tentang Jawa Barat',
    htmlAttrs: {
      lang: 'id'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Portal ini menyediakan informasi resmi, akses ke berbagai layanan publik, dan tempat menyampaikan aspirasi mengenai program dari Pemerintah Daerah Provinsi Jawa Barat.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/keen-slider@latest/keen-slider.min.css' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', as: 'image', href: '/images/banners/1.webp' },
      { rel: 'preload', as: 'image', href: '/logo.svg' },
      { rel: 'preload', as: 'image', href: '/images/hero.svg' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/jabar-design-system.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-lazysizes'
  ],

  eslint: {
    fix: true
  },

  googleFonts: {
    families: {
      Lato: [400, 500, 600, 700],
      Roboto: [400, 500, 600, 700],
      Lora: [400, 500, 600, 700]
    },
    display: 'swap'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'portal-vue/nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['@jabardigitalservice/jds-design-system']
  },

  loading: {
    color: '#FFC62E'
  }
}

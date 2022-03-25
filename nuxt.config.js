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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', as: 'image', href: '/images/banners/1.webp' },
      { rel: 'preload', as: 'image', href: '/logo.svg' },
      { rel: 'preload', as: 'image', href: '/images/hero.svg' }
    ]
  },

  render: {
    // Setting up cache for 'static' directory - a year in milliseconds
    // https://web.dev/uses-long-cache-ttl
    static: {
      maxAge: 60 * 60 * 24 * 365 * 1000
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/jabar-design-system.js', '~/plugins/vue-gtag'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  publicRuntimeConfig: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    // https://sentry.nuxtjs.org/
    '@nuxtjs/sentry'
  ],

  eslint: {
    fix: true
  },

  googleFonts: {
    families: {
      Lato: [400, 500, 600, 700],
      Roboto: [400, 500, 600, 700],
      Lora: [400, 500, 600, 700],
      'Open Sans': [400, 500, 600, 700]
    },
    display: 'swap'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'portal-vue/nuxt',
    // https://www.npmjs.com/package/vue-social-sharing
    'vue-social-sharing/nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL
  },

  // Sentry configuration https://sentry.nuxtjs.org/sentry/options
  sentry: {
    dsn: process.env.SENTRY_DSN,
    disabled: process.env.SENTRY_DISABLED || false,
    tracing: {
      tracesSampleRate: parseFloat(process.env.SENTRY_SAMPLE_RATE),
      vueOptions: {
        tracing: true,
        tracingOptions: {
          hooks: ['mount', 'update'],
          timeout: 2000,
          trackComponents: true
        }
      },
      browserOptions: {}
    },
    config: {
      environment: process.env.APP_ENVIRONMENT
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      '@jabardigitalservice/jds-design-system',
      /@fullcalendar.*/
    ],
    postcss: {
      plugins: {
        cssnano: {
          preset: ['default', { calc: false }]
        }
      }
    }
  },

  loading: {
    color: '#FFC62E'
  }
}

import axios from 'axios';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Focus on Storyblok Lessons - Alba Silvente',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'These lessons are part of the Focus on Storyblok course in Headless Creator.' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://focus-on-storyblok.dawntraoz.com/focus-storyblok-lessons-alba-silvente.jpg',
      },
      {
        hid: 'og:publish_date',
        name: 'publish_date',
        property: 'og:publish_date',
        content: '2021-08-02T00:00:00-0500',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: '//img2.storyblok.com' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/components', '~/plugins/composition-api.js', '~/plugins/rich-text-renderer.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    '~/components/atoms',
    '~/components/molecules',
    '~/components/organisms',
    '~/components/templates',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      Montserrat: {
        wght: [400, 500, 700],
        ital: [400]
      },
      Oswald: {
        wght: [300]
      },
    },
    display: 'swap'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.STORYBLOK_TOKEN,
        cacheProvider: 'memory'
      }
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    routes(callback) {
      const routesToIgnore = ['home']
      let cache_version = 0
      let routes = ['/']
  
      // Load space and receive latest cache version key to improve performance
      axios.get(
        `https://api.storyblok.com/v2/cdn/spaces/me?token=${process.env.STORYBLOK_TOKEN}`
      ).then((space_res) => {
  
        // timestamp of latest publish
        cache_version = space_res.data.space.version
  
        // Call for all Links using the Links API: <https://www.storyblok.com/docs/Delivery-Api/Links>
        axios.get(`https://api.storyblok.com/v2/cdn/links?token=${process.env.STORYBLOK_TOKEN}&version=published&cv=${cache_version}&per_page=100`).then((res) => {
          Object.keys(res.data.links).forEach((key) => {
            if (!routesToIgnore.includes(res.data.links[key].slug)) {
              routes.push('/' + res.data.links[key].slug)
            }
          })
  
          callback(null, routes)
        })
      })
    }
  }
}

// https://v3.nuxtjs.org/api/configuration/nuxt.config
// https://developers.storipress.com/karbon/2gLtVFS6QEkdvKF7fkRng1/resources/2YC1RCw9q71PKKjL9B8cXN
import { createArticleRoute, createDeskRoute, createAuthorRoute, createTagRoute } from '@storipress/karbon/helper'

export default defineNuxtConfig({
  vite: {
    optimizeDeps: {
      include: ['yup', 'p-retry', 'lodash'],
    },
  },
  modules: [
    '@storipress/karbon',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/html-validator',
    '@nuxt/image-edge',
    'nuxt-icon',
    'nuxt-lodash',
  ],
  routeRules: {
    '/posts/*': { swr: true },
  },
  runtimeConfig: {
    storipress: {
      apiToken: process.env.NUXT_KARBON_API_TOKEN,
      clientId: process.env.NUXT_KARBON_CLIENT_ID,
      searchKey: process.env.NUXT_KARBON_SEARCH_KEY,
      encryptKey: process.env.NUXT_KARBON_ENCRYPT_KEY,
    },
    public: {
      trailingSlash: Boolean(process.env.NUXT_PUBLIC_TRAILING_SLASH) || false,
      titleSeparator: process.env.NUXT_PUBLIC_TITLE_SEPARATOR || '|',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'Karbon',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000/',
      siteDescription: process.env.NUXT_PUBLIC_SITE_URL || 'My publication',
      language: process.env.NUXT_PUBLIC_LANGUAGE || 'en',
    },
  },

  karbon: {
    fullStatic: false,
    seo: [
      {
        preset: 'basic',
        options: {
          twitterCard: 'summary_large_image',
        },
      },
    ],
    resources: {
      article: createArticleRoute('/posts/{slug}'),
      desk: createDeskRoute('/desks/{slug}'),
      author: createAuthorRoute('/author/{id}'),
      tag: createTagRoute('/tag/{slug}'),
    },
    paywall: {
      enable: true,
      logo: './assets/logomark.svg',
    },
  },
})

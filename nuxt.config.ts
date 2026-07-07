export default defineNuxtConfig({
  compatibilityDate: '2026-06-25',
  devtools: {
    enabled: true,
  },
  ssr: false,

  app: {
    baseURL: '/deing-sheng/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      link: [
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ],
    },
  },

  modules: ['@nuxtjs/i18n'],

  i18n: {
    locales: [
      {
        code: 'zh-TW',
        name: 'Traditional Chinese',
        file: 'zh-tw.json',
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
    ],
    defaultLocale: 'zh-TW',
    langDir: 'locales/',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
  },
})
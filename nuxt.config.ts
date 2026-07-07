type RuntimeProcess = {
  process?: {
    env?: Record<string, string | undefined>
  }
}

const appBaseURL =
  (globalThis as RuntimeProcess).process?.env?.NUXT_APP_BASE_URL || '/'

function withBase(path: string) {
  const base = appBaseURL.endsWith('/')
    ? appBaseURL
    : `${appBaseURL}/`

  return `${base}${path.replace(/^\/+/, '')}`
}
export default defineNuxtConfig({
  compatibilityDate: '2026-06-25',
  devtools: {
    enabled: true,
  },
  ssr: false,

  app: {
    baseURL: appBaseURL,
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      link: [
        {
          rel: 'icon',
          href: withBase('/favicon.ico'),
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
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
  },
})
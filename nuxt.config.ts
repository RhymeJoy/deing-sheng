type RuntimeProcess = {
  process?: {
    env?: Record<string, string | undefined>
  }
}

const appBaseURL =
  (globalThis as RuntimeProcess).process?.env?.NUXT_APP_BASE_URL || '/'
const siteUrl = 'https://rhymejoy.github.io/deing-sheng/'
const i18nBaseUrl = 'https://rhymejoy.github.io'

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

  site: {
    url: siteUrl,
    name: 'Deing Sheng',
  },

  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap'],

  i18n: {
    baseUrl: i18nBaseUrl,
    locales: [
      {
        code: 'zh-TW',
        name: 'Traditional Chinese',
        file: 'zh-tw.json',
      },
      {
        code: 'zh-CN',
        name: 'Simplified Chinese',
        file: 'zh-cn.json',
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

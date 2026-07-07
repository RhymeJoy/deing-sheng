import { createI18n } from 'vue-i18n'

import zhTwMessages from '../i18n/locales/zh-tw.json'
import enMessages from '../i18n/locales/en.json'

const validLocales = [
  'zh-TW',
  'en',
]

function detectLocale() {
  const params = new URLSearchParams(window.location.search)
  const urlLang = params.get('lang')
  const saved = localStorage.getItem('lang')

  if (urlLang) {
    if (validLocales.includes(urlLang)) {
      return urlLang
    }

    const url = new URL(window.location)

    url.searchParams.set('lang', 'zh-TW')
    window.history.replaceState({}, '', url)

    return 'zh-TW'
  }

  if (saved && validLocales.includes(saved)) {
    return saved
  }

  const system = navigator.language.toLowerCase()

  if (
    system.includes('zh-tw') ||
    system.includes('zh-hk') ||
    system.includes('zh-mo') ||
    system.includes('zh-hant') ||
    system.includes('zh-cn') ||
    system.includes('zh-sg')
  ) {
    return 'zh-TW'
  }

  if (system.includes('en')) {
    return 'en'
  }

  return 'zh-TW'
}

const messages = {
  'zh-TW': zhTwMessages,
  en: enMessages,
}

export default messages

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'zh-TW',
  messages,
})

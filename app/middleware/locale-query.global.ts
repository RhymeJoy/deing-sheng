

type LocaleCode = 'zh-TW' | 'zh-CN' | 'en'

const localeStorageKey = 'site-language'

function isLocaleCode(value: unknown): value is LocaleCode {
  return value === 'zh-TW' || value === 'zh-CN' || value === 'en'
}

function getStoredLocale(): LocaleCode | null {
  if (!import.meta.client) return null

  const storedLocale = window.localStorage.getItem(localeStorageKey)
  return isLocaleCode(storedLocale) ? storedLocale : null
}
function getBrowserLocale(): LocaleCode {
  if (!import.meta.client) return 'en'

  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  for (const language of browserLanguages) {
    const browserLanguage = language.toLowerCase()

    if (browserLanguage.startsWith('zh-tw') || browserLanguage.includes('hant') || browserLanguage.startsWith('zh-hk') || browserLanguage.startsWith('zh-mo')) {
      return 'zh-TW'
    }

    if (browserLanguage.startsWith('zh-cn') || browserLanguage.includes('hans') || browserLanguage.startsWith('zh-sg') || browserLanguage.startsWith('zh-my')) {
      return 'zh-CN'
    }

    if (browserLanguage.startsWith('en')) {
      return 'en'
    }
  }

  return 'en'
}
export default defineNuxtRouteMiddleware(async (to) => {
  const { $i18n } = useNuxtApp()
  const rawLang = to.query.lang
  const lang = Array.isArray(rawLang) ? rawLang[0] : rawLang
  const nextLocale = lang === undefined
    ? 'zh-TW'
    : isLocaleCode(lang)
      ? lang
      : getStoredLocale() ?? getBrowserLocale()

  await $i18n.setLocale(nextLocale)
})

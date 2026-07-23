import { computed } from 'vue'
import { useHead, usePublicAsset, useRequestURL, useRoute, useSeoMeta } from '#imports'
import { useI18n } from 'vue-i18n'

import { products } from '~/data/catalogProducts'
import type { LocaleCode, LocalizedText } from '~/data/softServeCatalog'

const DEFAULT_IMAGE = '/img/banner.jpg'

function localizedText(data: string | LocalizedText | undefined, locale: LocaleCode) {
  if (typeof data === 'string') return data
  return data?.[locale] || data?.['zh-TW'] || ''
}

export function usePageSeo() {
  const route = useRoute()
  const requestUrl = useRequestURL()
  const publicAsset = usePublicAsset()
  const { t, locale } = useI18n()

  const currentLocale = computed<LocaleCode>(() => locale.value === 'en' ? 'en' : 'zh-TW')
  const product = computed(() => {
    const productId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    return products.find(item => item.id === productId)
  })
  const isProductPage = computed(() => route.path.startsWith('/goods/') && Boolean(product.value))

  const pageTitle = computed(() => {
    if (isProductPage.value) return localizedText(product.value?.name || product.value?.model, currentLocale.value)
    if (route.path.startsWith('/about')) return t('title.about')
    if (route.path.startsWith('/goods')) return t('title.goods')
    if (route.path.startsWith('/contact')) return t('title.contact')
    return t('title.home')
  })

  const siteName = computed(() => t('company.name'))
  const title = computed(() => pageTitle.value.includes(siteName.value) ? pageTitle.value : `${pageTitle.value} | ${siteName.value}`)
  const description = computed(() => isProductPage.value ? localizedText(product.value?.desc, currentLocale.value) : t('home.banner'))
  const pageUrl = computed(() => new URL(route.fullPath || '/', requestUrl.origin).toString())
  const imageUrl = computed(() => new URL(publicAsset(product.value?.image || DEFAULT_IMAGE), requestUrl.origin).toString())

  useHead({
    htmlAttrs: { lang: () => currentLocale.value },
    link: [{ rel: 'canonical', href: () => pageUrl.value }],
  })

  useSeoMeta({
    title: () => title.value,
    description: () => description.value,
    author: () => siteName.value,
    ogType: 'website',
    ogSiteName: () => siteName.value,
    ogTitle: () => title.value,
    ogDescription: () => description.value,
    ogUrl: () => pageUrl.value,
    ogImage: () => imageUrl.value,
    ogLocale: () => currentLocale.value === 'zh-TW' ? 'zh_TW' : 'en_US',
    twitterCard: 'summary_large_image',
    twitterTitle: () => title.value,
    twitterDescription: () => description.value,
    twitterImage: () => imageUrl.value,
  })
}

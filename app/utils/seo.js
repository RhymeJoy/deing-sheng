import { i18n } from '../i18n'
import { products } from '../data/products'

const DEFAULT_IMAGE = '/img/banner.jpg'

function currentLocale() {
  return i18n.global.locale?.value || i18n.global.locale || 'zh-TW'
}

function text(data) {
  if (typeof data === 'string') return data

  return data?.[currentLocale()] || data?.['zh-TW'] || ''
}

function absoluteUrl(path) {
  return new URL(path || '/', window.location.origin).toString()
}

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function setNamedMeta(name, content) {
  setMeta(`meta[name="${name}"]`, {
    name,
    content,
  })
}

function setPropertyMeta(property, content) {
  setMeta(`meta[property="${property}"]`, {
    property,
    content,
  })
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  link.setAttribute('href', url)
}

function routeDescription(route) {
  if (route.name === 'item') {
    const product = products.find(item => item.id === route.params.id)

    return text(product?.desc)
  }

  if (route.meta?.descriptionKey) {
    return i18n.global.t(route.meta.descriptionKey)
  }

  return i18n.global.t('home.banner')
}

function routeImage(route) {
  if (route.name === 'item') {
    const product = products.find(item => item.id === route.params.id)

    return product?.image || DEFAULT_IMAGE
  }

  return route.meta?.image || DEFAULT_IMAGE
}

function routeTitle(route) {
  const companyName = i18n.global.t('company.name')

  if (route.name === 'item') {
    const product = products.find(item => item.id === route.params.id)
    const productName = text(product?.name || product?.model)

    return productName
      ? `${productName} | ${companyName}`
      : `${i18n.global.t('title.item')} | ${companyName}`
  }

  const title = i18n.global.t(route.meta?.titleKey || 'title.home')

  return title.includes(companyName)
    ? title
    : `${title} | ${companyName}`
}

export function updateSeo(route) {
  const title = routeTitle(route)
  const description = routeDescription(route)
  const url = absoluteUrl(route.fullPath)
  const image = absoluteUrl(routeImage(route))
  const locale = currentLocale()
  const siteName = i18n.global.t('company.name')
  const type = route.name === 'item' ? 'product' : 'website'

  document.documentElement.lang = locale
  document.title = title

  setCanonical(url)
  setNamedMeta('description', description)
  setNamedMeta('author', siteName)

  setPropertyMeta('og:type', type)
  setPropertyMeta('og:site_name', siteName)
  setPropertyMeta('og:title', title)
  setPropertyMeta('og:description', description)
  setPropertyMeta('og:url', url)
  setPropertyMeta('og:image', image)
  setPropertyMeta('og:locale', locale === 'zh-TW' ? 'zh_TW' : 'en_US')

  setNamedMeta('twitter:card', 'summary_large_image')
  setNamedMeta('twitter:title', title)
  setNamedMeta('twitter:description', description)
  setNamedMeta('twitter:image', image)
}

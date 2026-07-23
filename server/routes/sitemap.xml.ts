import { defineEventHandler, getRequestURL, setHeader } from 'h3'

import { products } from '../../app/data/catalogProducts'

type SitemapRoute = {
  changefreq: string
  path: string
  priority: string
}

const staticRoutes: SitemapRoute[] = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/goods',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/contact',
    changefreq: 'monthly',
    priority: '0.7',
  },
]

const xmlEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, character => xmlEntities[character])
}

function normalizeBaseUrl(origin: string) {
  return origin.replace(/\/+$/, '')
}

function resolveBaseUrl(event: Parameters<typeof getRequestURL>[0]) {
  return normalizeBaseUrl(getRequestURL(event).origin)
}

function routeUrl(baseUrl: string, path: string) {
  return `${baseUrl}${path === '/' ? '' : path}`
}

export default defineEventHandler((event) => {
  const baseUrl = resolveBaseUrl(event)
  const lastmod = new Date().toISOString().slice(0, 10)

  const routes = [
    ...staticRoutes,
    ...products.map((product): SitemapRoute => ({
      path: `/goods/${encodeURIComponent(product.id)}`,
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ]

  const urls = routes
    .map((route) => {
      return [
        '  <url>',
        `    <loc>${escapeXml(routeUrl(baseUrl, route.path))}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        '  </url>',
      ].join('\n')
    })
    .join('\n')

  setHeader(event, 'Content-Type', 'application/xml; charset=UTF-8')
  setHeader(event, 'Cache-Control', 'max-age=3600, s-maxage=86400')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
  ].join('\n')
})
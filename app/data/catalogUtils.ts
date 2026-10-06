import type { LocalizedText, Product, ProductSpec } from './softServeCatalog'

export type CatalogProduct = Product & { seriesId?: string }

export type CatalogProductInput = Pick<Product, 'id' | 'model' | 'name' | 'desc'> & {
  seriesId?: string
  categoryId?: string
  groupId?: string
} & Partial<Omit<Product, 'id' | 'model' | 'name' | 'desc' | 'categoryId' | 'groupId'>>

export const local = (zh: string, en: string = zh): LocalizedText => ({
  'zh-TW': zh,
  en,
})

export const spec = (
  zhLabel: string,
  enLabel: string,
  zhValue: string,
  enValue = zhValue,
): ProductSpec => ({
  label: local(zhLabel, enLabel),
  value: local(zhValue, enValue),
})

export const createProduct = (
  input: CatalogProductInput,
  defaults: Partial<Pick<Product, 'categoryId' | 'groupId' | 'price' | 'pdf' | 'hot' | 'tags' | 'features'>> = {},
): CatalogProduct => ({
  categoryId: 'equipment',
  groupId: 'airCurtainCabinet',
  price: '',
  pdf: false,
  hot: false,
  tags: [],
  features: [],
  ...defaults,
  ...input,
})

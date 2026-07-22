import { products as legacyProducts, type Product } from './products'
import { airCurtainProducts, productSeries as brochureSeries } from './airCurtainCatalog'

export type CatalogProduct = Product & { seriesId?: string }

// Keep the existing catalog, but replace the old placeholder air-curtain records
// with the model-level entries from the company brochure.
export const products: CatalogProduct[] = [
  ...legacyProducts.filter(product => product.groupId !== 'airCurtainCabinet'),
  ...airCurtainProducts,
]

// Compact Melody cabinets are standalone products; the other multi-model
// families remain grouped as series.
export const productSeries = brochureSeries.filter(series => series.id !== 'melody-compact')

for (const series of productSeries) {
  for (const productId of series.productIds) {
    const item = products.find(product => product.id === productId)
    if (item) item.seriesId = series.id
  }
}

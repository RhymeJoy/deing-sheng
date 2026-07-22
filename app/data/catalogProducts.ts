import { products as legacyProducts, type Product } from './products'
import { airCurtainProducts, productSeries as airCurtainSeries } from './airCurtainCatalog'
import { iceMachineProducts, productSeries as iceMachineSeries } from './iceMachineCatalog'

export type CatalogProduct = Product & { seriesId?: string }

export const products: CatalogProduct[] = [
  ...legacyProducts.filter(
    product => product.groupId !== 'airCurtainCabinet' && product.groupId !== 'iceMachine',
  ),
  ...airCurtainProducts,
  ...iceMachineProducts,
]

// Compact Melody cabinets are standalone products; the other multi-model
// families remain grouped as series.
export const productSeries = [
  ...airCurtainSeries.filter(series => series.id !== 'melody-compact'),
  ...iceMachineSeries,
]

for (const series of productSeries) {
  for (const productId of series.productIds) {
    const item = products.find(product => product.id === productId)
    if (item) item.seriesId = series.id
  }
}

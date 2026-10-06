import { softServeProducts, type Product } from './softServeCatalog'
import { airCurtainProducts, productSeries as airCurtainSeries } from './airCurtainCatalog'
import { magicShlfProducts, productSeries as magicShlfSeries } from './magicShlfCatalog'
import { refrigeratedProducts, productSeries as refrigeratedSeries } from './refrigeratedCatalog'
import { freezerProducts, productSeries as freezerSeries } from './freezerCatalog'
import { dualTemperatureProducts, productSeries as dualTemperatureSeries } from './dualTemperatureCatalog'
import { iceMachineProducts, productSeries as iceMachineSeries } from './iceMachineCatalog'
import { insulationProducts } from './insulationCatalog'

export type CatalogProduct = Product & { seriesId?: string }

export const products: CatalogProduct[] = [
  ...softServeProducts,
  ...airCurtainProducts,
  ...magicShlfProducts,
  ...refrigeratedProducts,
  ...freezerProducts,
  ...dualTemperatureProducts,
  ...iceMachineProducts,
  ...insulationProducts,
]

// Compact Melody cabinets are standalone products; the other multi-model
// families remain grouped as series.
export const productSeries = [
  ...airCurtainSeries.filter(series => series.id !== 'melody-compact'),
  ...magicShlfSeries,
  ...refrigeratedSeries,
  ...freezerSeries,
  ...dualTemperatureSeries,
  ...iceMachineSeries,
]

for (const series of productSeries) {
  for (const productId of series.productIds) {
    const item = products.find(product => product.id === productId)
    if (item) item.seriesId = series.id
  }
}

import type { Product } from './softServeCatalog'
import { createProduct, local, spec } from './catalogUtils'

const refrigeratedFeatures = [
  '適合便利商店與生鮮超市的高周轉商品陳列。',
  '可依層板數量配置展示空間，並可選配滾珠式滑道。',
]

const refrigeratedProduct = (x: {
  id: string
  model: string
  dimensions: string
  capacity: string
  weight: string
  doors: string
  power: string
  current: string
}): Product & { seriesId?: string } => createProduct({
  id: x.id,
  seriesId: 'gallon-dual',
  groupId: 'refrigeratedCabinet',
  model: local(x.model),
  name: local(x.model + ' 冷藏玻璃門櫃', x.model + ' Refrigerated Glass-door Cabinet'),
  desc: local('冷藏玻璃門櫃，適合便利商店與生鮮超市的高周轉商品陳列。', 'A refrigerated glass cabinet for high-turnover products in convenience stores and fresh-food supermarkets.'),
  applications: ['便利商店', '生鮮超市'],
  features: refrigeratedFeatures,
  specs: [
    spec('產品尺寸（長×寬×高）', 'Dimensions (L × W × H)', x.dimensions),
    spec('工作溫度', 'Working temperature', '1～10℃'),
    spec('用途', 'Application', '冷藏瓶裝飲料', 'Chilled bottled beverages'),
    spec('製冷劑', 'Refrigerant', 'R404a'),
    spec('蒸發器', 'Evaporator', '風冷循環式', 'Air-cooled circulation'),
    spec('電壓／頻率', 'Voltage / frequency', '220V／60Hz', '220V / 60Hz'),
    spec('有效容積', 'Net capacity', x.capacity),
    spec('淨重', 'Net weight', x.weight),
    spec('門數', 'Number of doors', x.doors),
    spec('層板數量', 'Number of shelves', '可選', 'Optional'),
    spec('總電器功率／電流', 'Total electrical power / current', x.power + '／' + x.current, x.power + ' / ' + x.current),
  ],
  tags: ['rft'],
})

export const refrigeratedProducts = [
  refrigeratedProduct({ id: 'gallon-dual-2d', model: 'GALLON DUAL 2D', dimensions: '1485 × 780 × 2100 mm', capacity: '1332 L', weight: '200 kg', doors: '2 門', power: '458 W', current: '2.08 A' }),
  refrigeratedProduct({ id: 'gallon-dual-3d', model: 'GALLON DUAL 3D', dimensions: '2190 × 780 × 2100 mm', capacity: '1998 L', weight: '280 kg', doors: '3 門', power: '671 W', current: '3.05 A' }),
  refrigeratedProduct({ id: 'gallon-dual-4d', model: 'GALLON DUAL 4D', dimensions: '2900 × 780 × 2100 mm', capacity: '2665 L', weight: '360 kg', doors: '4 門', power: '854 W', current: '3.88 A' }),
]

export type RefrigeratedSeries = {
  categoryId: string
  desc: ReturnType<typeof local>
  groupId: string
  id: string
  name: ReturnType<typeof local>
  productIds: string[]
}

export const productSeries: RefrigeratedSeries[] = [
  {
    id: 'gallon-dual',
    categoryId: 'equipment',
    groupId: 'refrigeratedCabinet',
    name: local('GALLON DUAL 冷藏玻璃門櫃系列', 'GALLON DUAL Refrigerated Glass-door Series'),
    desc: local('提供 2D、3D 與 4D 多門冷藏玻璃門櫃。', 'Multi-door refrigerated glass cabinets in 2D, 3D, and 4D configurations.'),
    productIds: ['gallon-dual-2d', 'gallon-dual-3d', 'gallon-dual-4d'],
  },
]

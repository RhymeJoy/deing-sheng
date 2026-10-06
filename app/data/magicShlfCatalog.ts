import type { Product } from './softServeCatalog'
import { createProduct, local, spec } from './catalogUtils'

const magicShlfFeatures = [
  '超低前高，提供超大開口與良好商品可視性。',
  '可搭配角抽或平抽層板。',
]

const magicShlfPdFeatures = [
  ...magicShlfFeatures,
  '全透防霧玻璃門，兼顧展示效果與冷藏保存。',
]

const magicShlfProduct = (x: {
  id: string
  model: string
  seriesId: 'magic-shlf' | 'magic-shlf-pd'
  dimensions: string
  temperature: string
  temperatureEn: string
  power: string
  current: string
  capacity: string
  weight: string
  dualTemperature?: boolean
}): Product & { seriesId?: string } => {
  const door = x.seriesId === 'magic-shlf-pd'
  const dual = x.dualTemperature === true
  const zhType = door ? (dual ? '雙溫開門風幕櫃' : '開門風幕櫃') : (dual ? '雙溫開放式風幕櫃' : '開放式風幕櫃')
  const enType = door ? (dual ? 'Dual-temperature Door Air Curtain Cabinet' : 'Door Air Curtain Cabinet') : (dual ? 'Dual-temperature Open Air Curtain Cabinet' : 'Open Air Curtain Cabinet')

  return createProduct({
    id: x.id,
    seriesId: x.seriesId,
    model: local(x.model),
    name: local(x.model + ' 超低前高' + zhType, x.model + ' Low-front ' + enType),
    desc: local('超低前高與超大開口設計，適合便利商店、量販店與超市的冷藏日配展示。', 'A low-front, wide-open display for chilled daily goods in convenience stores, hypermarkets, and supermarkets.'),
    applications: ['便利商店', '量販店', '超市'],
    features: door ? magicShlfPdFeatures : magicShlfFeatures,
    specs: [
      spec('產品尺寸（長×寬×高）', 'Dimensions (L × W × H)', x.dimensions),
      spec('工作溫度', 'Working temperature', x.temperature, x.temperatureEn),
      spec('用途', 'Application', '冷藏日配', 'Chilled daily goods'),
      spec('製冷劑', 'Refrigerant', 'R404a / R448'),
      spec('蒸發器', 'Evaporator', '風冷循環式', 'Air-cooled circulation'),
      spec('輸入功率', 'Input power', x.power),
      spec('輸入電流', 'Input current', x.current),
      spec('電壓／頻率', 'Voltage / frequency', '220V／60Hz', '220V / 60Hz'),
      spec('有效容積', 'Net capacity', x.capacity),
      spec('淨重', 'Net weight', x.weight),
      spec('層板數量', 'Number of shelves', '7+1 層', '7+1 shelves'),
    ],
    tags: ['airc', 'rt', '2m', door ? 'sd' : 'od', ...(dual ? ['dtt'] : []), 'magic-shlf'],
  })
}

export const magicShlfProducts = [
  magicShlfProduct({ id: 'magic-shlf-3', model: 'MAGIC SHLF 3', seriesId: 'magic-shlf', dimensions: '915 × 750 × 2000 mm', temperature: '2～10℃', temperatureEn: '2 to 10℃', power: '85 W', current: '0.39 A', capacity: '525 L', weight: '180 kg' }),
  magicShlfProduct({ id: 'magic-shlf-3cc', model: 'MAGIC SHLF 3CC', seriesId: 'magic-shlf', dimensions: '915 × 750 × 2000 mm', temperature: '上層 15～18℃／下層 2～7℃', temperatureEn: 'Upper 15 to 18℃ / lower 2 to 7℃', power: '105 W', current: '0.48 A', capacity: '525 L', weight: '180 kg', dualTemperature: true }),
  magicShlfProduct({ id: 'magic-shlf-6', model: 'MAGIC SHLF 6', seriesId: 'magic-shlf', dimensions: '1830 × 750 × 2000 mm', temperature: '2～10℃', temperatureEn: '2 to 10℃', power: '170 W', current: '0.78 A', capacity: '1050 L', weight: '280 kg' }),
  magicShlfProduct({ id: 'magic-shlf-pd-3', model: 'MAGIC SHLF 3PD', seriesId: 'magic-shlf-pd', dimensions: '915 × 750 × 2000 mm', temperature: '2～7℃', temperatureEn: '2 to 7℃', power: '220 W', current: '1 A', capacity: '525 L', weight: '200 kg' }),
  magicShlfProduct({ id: 'magic-shlf-pd-3cc', model: 'MAGIC SHLF 3PD CC', seriesId: 'magic-shlf-pd', dimensions: '915 × 750 × 2000 mm', temperature: '上層 15～18℃／下層 2～7℃', temperatureEn: 'Upper 15 to 18℃ / lower 2 to 7℃', power: '220 W', current: '1 A', capacity: '525 L', weight: '200 kg', dualTemperature: true }),
  magicShlfProduct({ id: 'magic-shlf-pd-6', model: 'MAGIC SHLF 6PD', seriesId: 'magic-shlf-pd', dimensions: '1830 × 750 × 2000 mm', temperature: '2～7℃', temperatureEn: '2 to 7℃', power: '425 W', current: '1.93 A', capacity: '1050 L', weight: '350 kg' }),
]

export type MagicShlfSeries = {
  categoryId: string
  desc: ReturnType<typeof local>
  groupId: string
  id: string
  name: ReturnType<typeof local>
  productIds: string[]
}

export const productSeries: MagicShlfSeries[] = [
  {
    id: 'magic-shlf',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    name: local('MAGIC SHLF 超低前高開放系列', 'MAGIC SHLF Low-front Open Series'),
    desc: local('超低前高開放式冷藏風幕櫃，提供 MAGIC SHLF 3、3CC 與 6。', 'Low-front open refrigerated air curtain cabinets in MAGIC SHLF 3, 3CC, and 6 configurations.'),
    productIds: ['magic-shlf-3', 'magic-shlf-3cc', 'magic-shlf-6'],
  },
  {
    id: 'magic-shlf-pd',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    name: local('MAGIC SHLF PD 超低前高開門系列', 'MAGIC SHLF PD Low-front Door Series'),
    desc: local('超低前高開門式冷藏風幕櫃，提供 MAGIC SHLF 3PD、3PD CC 與 6PD。', 'Low-front door refrigerated air curtain cabinets in MAGIC SHLF 3PD, 3PD CC, and 6PD configurations.'),
    productIds: ['magic-shlf-pd-3', 'magic-shlf-pd-3cc', 'magic-shlf-pd-6'],
  },
]

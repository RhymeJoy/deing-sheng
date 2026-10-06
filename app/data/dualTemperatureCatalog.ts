import type { Product } from './softServeCatalog'
import { createProduct, local, spec } from './catalogUtils'

const dualTemperatureFeatures = [
  '上下各 45L 獨立腔體，可分別調節冷熱，單櫃兼具熟食保溫與冷藏保鮮。',
  '上下倉配備獨立補水盒，加熱保溫時維持空氣濕度，延長熟食可販售時長。',
  '前後門支援左開／右開切換，層板可前傾／後傾調整，適應不同門店配置。',
]

export const dualTemperatureProducts: Array<Product & { seriesId?: string }> = [
  createProduct({
    id: 'fts-128ss-1',
    seriesId: 'fts-128ss',
    groupId: 'dualTemperatureCabinet',
    model: local('FTS-128SS-1'),
    name: local('FTS-128SS-1 雙溫櫃', 'FTS-128SS-1 Dual-temperature Cabinet'),
    desc: local('上下獨立雙溫腔體，適合熟食保溫、冷藏保鮮與冷熱小吃同步展示。', 'Independent upper and lower temperature zones for hot food holding, chilled storage, and simultaneous hot-and-cold snack display.'),
    applications: ['便利商店', '咖啡店', '熟食店', '小型門市'],
    features: dualTemperatureFeatures,
    specs: [
      spec('上下櫃尺寸（寬×深×高）', 'Upper / lower compartment dimensions (W × D × H)', '426 × 493 × 215 mm'),
      spec('上下櫃容量', 'Upper / lower capacity', '45 L × 2'),
      spec('製冷溫度', 'Cooling temperature', '2～6℃', '2 to 6℃'),
      spec('設計加熱溫度', 'Design heating temperature', '50～65℃', '50 to 65℃'),
      spec('照明功率', 'Lighting power', '32 W'),
      spec('製冷功率', 'Cooling power', '300 W'),
      spec('加熱功率', 'Heating power', '350 W'),
      spec('電壓／頻率', 'Voltage / frequency', 'AC 110V／60Hz，美式插頭', 'AC 110V / 60Hz, US plug'),
      spec('整機尺寸（寬×深×高）', 'Overall dimensions (W × D × H)', '530 × 580 × 892 mm'),
      spec('淨重', 'Net weight', '60 kg'),
    ],
    tags: ['dtc', 'dtt', 'fs'],
  }),
]

export type DualTemperatureSeries = {
  categoryId: string
  desc: ReturnType<typeof local>
  groupId: string
  id: string
  name: ReturnType<typeof local>
  productIds: string[]
}

export const productSeries: DualTemperatureSeries[] = [
  {
    id: 'fts-128ss',
    categoryId: 'equipment',
    groupId: 'dualTemperatureCabinet',
    name: local('FTS-128SS-1 雙溫櫃系列', 'FTS-128SS-1 Dual-temperature Series'),
    desc: local('上下獨立雙溫腔體，可同步提供冷藏與加熱展示。', 'Independent upper and lower temperature zones for simultaneous chilled and heated display.'),
    productIds: ['fts-128ss-1'],
  },
]

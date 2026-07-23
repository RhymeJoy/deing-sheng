export type LocaleCode = 'zh-TW' | 'en'

export type LocalizedText = Partial<Record<LocaleCode, string>>

export type ProductPrice = number | string

export type ProductTag = {
  label: LocalizedText
}

export type ProductCategory = {
  desc?: LocalizedText
  icon?: string
  id: string
  name: LocalizedText
}

export type ProductGroup = {
  categoryId: string
  desc?: LocalizedText
  id: string
  name: LocalizedText
}

export type ProductSpec = {
  label: LocalizedText | string
  value: LocalizedText | string
}

export type Product = {
  applications?: LocalizedText | string[]
  categoryId: string
  desc: LocalizedText
  features?: LocalizedText | string[]
  groupId: string
  hot?: boolean
  id: string
  image?: string
  model: LocalizedText
  name: LocalizedText
  pdf?: string | false
  price?: ProductPrice
  specs?: ProductSpec[]
  tags?: string[]
}

export { productCategories, productGroups, productTags } from './productCategories'

const softServeSpec=(zhLabel:string,enLabel:string,zhValue:string,enValue=zhValue):ProductSpec=>({label:{'zh-TW':zhLabel,en:enLabel},value:{'zh-TW':zhValue,en:enValue}})

export const softServeProducts: Product[] = [
  //霜淇淋
  {
    id: 'ds-td98',
    categoryId: 'equipment',
    groupId: 'softServe',
    model: {
      'zh-TW': 'DS-TD98',
      en: 'DS-TD98',
    },
    name: {
      'zh-TW': '桌上風冷單缸單孔霜淇淋機',
      en: 'Tabletop Air-Cooled Single Tank Soft Serve Machine',
    },
    desc: {
      'zh-TW': '適合攤販、小型店面與創業入門使用的小型高效率商用機種。',
      en: 'Compact commercial model for kiosks, small shops, and startup businesses.',
    },
    image: '/img/products/td98.avif',
    price: '',
    tags: ['tb', 'ac', 'ssm', 'ot', 'ss', 'el'],
    pdf: false,
    specs: [
      softServeSpec('總功率', 'Total power', '880 W'),
      softServeSpec('壓縮機功率', 'Compressor power', '370 W'),
      softServeSpec('風扇功率', 'Fan power', '80 W'),
      softServeSpec('水泵功率', 'Water pump power', '6 W'),
      softServeSpec('產能', 'Output', '200 份／小時', '200 servings/hour'),
      softServeSpec('料缸容量', 'Mix hopper capacity', '2 L'),
      softServeSpec('冷凍缸容量', 'Freezing cylinder capacity', '8 L'),
      softServeSpec('電壓／頻率', 'Voltage / frequency', '220 V／60 Hz', '220 V / 60 Hz'),
      softServeSpec('出料口', 'Nozzle', '單孔', 'Single nozzle'),
      softServeSpec('冷媒', 'Refrigerant', 'R404A'),
      softServeSpec('機重', 'Net weight', '95 kg'),
      softServeSpec('尺寸', 'Dimensions', '890 × 325 × 1050 mm'),
    ],
    hot: true,
    
  },

  {
    id: 'ds-ts99',
    categoryId: 'equipment',
    groupId: 'softServe',
    model: {
      'zh-TW': 'DS-TS99',
      en: 'DS-TS99',
    },
    name: {
      'zh-TW': '桌上風冷雙缸三孔霜淇淋機',
      en: 'Tabletop Air-Cooled Twin Tank Triple Nozzle Soft Serve Machine',
    },
    desc: {
      'zh-TW': '可製作兩種口味與綜合口味，適合中型店面、連鎖門市與商用高需求。',
      en: 'Supports two flavors and mixed flavor output for medium stores and chain businesses.',
    },
    image: '/img/products/ts99.avif',
    price: '',
    tags: ['tb', 'ac', 'tt', 'ssm', 'ms', 'std'],
    pdf: false,
    specs: [
      softServeSpec('總功率', 'Total power', '1100 W × 2'),
      softServeSpec('壓縮機功率', 'Compressor power', '550 W × 2'),
      softServeSpec('風扇功率', 'Fan power', '120 W × 2'),
      softServeSpec('水泵功率', 'Water pump power', '6 W × 2'),
      softServeSpec('產能', 'Output', '500 份／小時', '500 servings/hour'),
      softServeSpec('料缸容量', 'Mix hopper capacity', '2.5 L'),
      softServeSpec('冷凍缸容量', 'Freezing cylinder capacity', '10 L'),
      softServeSpec('電壓／頻率', 'Voltage / frequency', '220 V／60 Hz', '220 V / 60 Hz'),
      softServeSpec('出料口', 'Nozzle', '三孔', 'Triple nozzle'),
      softServeSpec('冷媒', 'Refrigerant', 'R404A'),
      softServeSpec('機重', 'Net weight', '128 kg'),
      softServeSpec('尺寸', 'Dimensions', '990 × 525 × 1180 mm'),
    ],
    hot: false,
  },

  {
    id: 'ds-ls168-air',
    categoryId: 'equipment',
    groupId: 'softServe',
    model: {
      'zh-TW': 'DS-LS168｜風冷',
      en: 'DS-LS168｜Air-Cooled',
    },
    name: {
      'zh-TW': '落地風冷雙缸三孔霜淇淋機',
      en: 'Floor Standing Air-Cooled Twin Tank Triple Nozzle Soft Serve Machine',
    },
    desc: {
      'zh-TW': '多口味高產能風冷旗艦機型，適合中大型門市與連鎖品牌。',
      en: 'High-capacity flagship air-cooled model for larger stores and chain brands.',
    },
    image: '/img/products/ls168a.avif',
    price: '',
    tags: ['fs', 'ac', 'tt', 'ssm', 'ls', 'std'],
    pdf: false,
    specs: [
      softServeSpec('總功率', 'Total power', '1100 W × 2'),
      softServeSpec('壓縮機功率', 'Compressor power', '550 W × 2'),
      softServeSpec('風扇功率', 'Fan power', '120 W × 2'),
      softServeSpec('水泵功率', 'Water pump power', '6 W × 2'),
      softServeSpec('產能', 'Output', '500 份／小時', '500 servings/hour'),
      softServeSpec('料缸容量', 'Mix hopper capacity', '2.5 L'),
      softServeSpec('冷凍缸容量', 'Freezing cylinder capacity', '10 L'),
      softServeSpec('電壓／頻率', 'Voltage / frequency', '220 V／60 Hz', '220 V / 60 Hz'),
      softServeSpec('出料口', 'Nozzle', '三孔', 'Triple nozzle'),
      softServeSpec('冷媒', 'Refrigerant', 'R404A'),
      softServeSpec('機重', 'Net weight', '158 kg'),
      softServeSpec('尺寸', 'Dimensions', '1010 × 525 × 1680 mm'),
    ],
    hot: true,
  },

  {
    id: 'ds-ls168-water',
    categoryId: 'equipment',
    groupId: 'softServe',
    model: {
      'zh-TW': 'DS-LS168｜水冷',
      en: 'DS-LS168｜Water-Cooled',
    },
    name: {
      'zh-TW': '落地水冷雙缸三孔霜淇淋機',
      en: 'Floor Standing Water-Cooled Twin Tank Triple Nozzle Soft Serve Machine',
    },
    desc: {
      'zh-TW': '多口味高產能水冷旗艦機型，適合長時間高負載營運需求。',
      en: 'High-capacity water-cooled model for long-hour commercial operation.',
    },
    image: '/img/products/ls168w.avif',
    price: '',
    tags: ['fs', 'wc', 'tt', 'ssm', 'ls', 'std'],
    pdf: false,
    specs: [
      softServeSpec('總功率', 'Total power', '1100 W × 2'),
      softServeSpec('壓縮機功率', 'Compressor power', '550 W × 2'),
      softServeSpec('風扇功率', 'Fan power', '120 W × 2'),
      softServeSpec('水泵功率', 'Water pump power', '6 W × 2'),
      softServeSpec('產能', 'Output', '500 份／小時', '500 servings/hour'),
      softServeSpec('料缸容量', 'Mix hopper capacity', '2.5 L'),
      softServeSpec('冷凍缸容量', 'Freezing cylinder capacity', '10 L'),
      softServeSpec('電壓／頻率', 'Voltage / frequency', '380 V／60 Hz', '380 V / 60 Hz'),
      softServeSpec('出料口', 'Nozzle', '三孔', 'Triple nozzle'),
      softServeSpec('冷媒', 'Refrigerant', 'R404A'),
      softServeSpec('機重', 'Net weight', '158 kg'),
      softServeSpec('尺寸', 'Dimensions', '1010 × 525 × 1680 mm'),
    ],
    hot: false,
  },


]

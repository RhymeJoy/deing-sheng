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

export const products: Product[] = [
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
    hot: false,
  },

  //製冰機
  {
    id: 'imf-60ef',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'IMF-60EF',
      en: 'IMF-60EF',
    },
    name: {
      'zh-TW': '商用方形冰製冰機',
      en: 'Commercial Cube Ice Machine',
    },
    desc: {
      'zh-TW': '小型一體式商用製冰機，適合飲料店、輕食店與咖啡廳。',
      en: 'Compact commercial ice machine for cafes and beverage shops.',
    },
    price: '',
    tags: ['ci', 'ac', 'el', 'rs', 'ss'],
    pdf: false,
    hot: false,
  },

  {
    id: 'imf-100ef',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'IMF-100EF',
      en: 'IMF-100EF',
    },
    name: {
      'zh-TW': '商用高產能方形冰製冰機',
      en: 'High Capacity Cube Ice Machine',
    },
    desc: {
      'zh-TW': '提升產冰量與儲冰能力，適合中小型餐飲與吧台空間。',
      en: 'Higher ice production capacity for commercial beverage environments.',
    },
    price: '',
    tags: ['ci', 'ac', 'el', 'rs', 'ss'],
    pdf: false,
    hot: false,
  },

  {
    id: 'imf-160ef',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'IMF-160EF',
      en: 'IMF-160EF',
    },
    name: {
      'zh-TW': '商用高產能方形冰製冰機',
      en: 'High Capacity Cube Ice Machine',
    },
    desc: {
      'zh-TW': '提升產冰量與儲冰能力，適合中小型餐飲與吧台空間。',
      en: 'Higher ice production capacity for commercial beverage environments.',
    },
    price: '',
    tags: ['ci', 'ac', 'el', 'rs', 'ms'],
    pdf: false,
    hot: false,
  },

  {
    id: 'imf-230ef',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'IMF-230EF',
      en: 'IMF-230EF',
    },
    name: {
      'zh-TW': '商用高產能方形冰製冰機',
      en: 'High Capacity Cube Ice Machine',
    },
    desc: {
      'zh-TW': '提升產冰量與儲冰能力，適合中小型餐飲與吧台空間。',
      en: 'Higher ice production capacity for commercial beverage environments.',
    },
    price: '',
    tags: ['ci', 'ac', 'std', 'rs', 'ms'],
    pdf: false,
    hot: false,
  },

  {
    id: 'imf-160es',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'IMF-160ES',
      en: 'IMF-160ES',
    },
    name: {
      'zh-TW': '商用高產能方形冰製冰機',
      en: 'High Capacity Cube Ice Machine',
    },
    desc: {
      'zh-TW': '提升產冰量與儲冰能力，適合中小型餐飲與吧台空間。',
      en: 'Higher ice production capacity for commercial beverage environments.',
    },
    price: '',
    tags: ['ci', 'wc', 'std', 'rs', 'ls', 'fs'],
    pdf: false,
    hot: false,
  },

  {
    id: 'imf-400es',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'IMF-400ES',
      en: 'IMF-400ES',
    },
    name: {
      'zh-TW': '商用高產能方形冰製冰機',
      en: 'High Capacity Cube Ice Machine',
    },
    desc: {
      'zh-TW': '提升產冰量與儲冰能力，適合中小型餐飲與吧台空間。',
      en: 'Higher ice production capacity for commercial beverage environments.',
    },
    price: '',
    tags: ['ci', 'wc', 'fg', 'rs', 'ls', 'fs'],
    pdf: false,
    hot: false,
  },

  {
    id: 'am-350',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AM-350',
      en: 'AM-350',
    },
    name: {
      'zh-TW': '礦形冰商用製冰機',
      en: 'Nugget Ice Machine',
    },
    desc: {
      'zh-TW': '小巧高效的礦形冰製冰設備，適合小型門市。',
      en: 'Compact nugget ice machine for small commercial stores.',
    },
    price: '',
    tags: ['ni', 'ac', 'ss', 'rs', 'tb', 'el'],
    pdf: false,
    hot: false,
  },

  {
    id: 'am-450',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AM-450',
      en: 'AM-450',
    },
    name: {
      'zh-TW': '高產能礦形冰製冰機',
      en: 'High Capacity Nugget Ice Machine',
    },
    desc: {
      'zh-TW': '高產能礦形冰設備，適合便利商店與酒吧。',
      en: 'High-capacity nugget ice machine for bars and retail stores.',
    },
    price: '',
    tags: ['ni', 'ac', 'ms', 'rs', 'tb', 'std'],
    pdf: false,
    hot: false,
  },

  {
    id: 'am-500',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AM-500',
      en: 'AM-500',
    },
    name: {
      'zh-TW': '高產能礦形冰製冰機',
      en: 'High Capacity Nugget Ice Machine',
    },
    desc: {
      'zh-TW': '高產能礦形冰設備，適合便利商店與酒吧。',
      en: 'High-capacity nugget ice machine for bars and retail stores.',
    },
    price: '',
    tags: ['ci', 'hc', 'ac', 'ls', 'rs', 'fs', 'fg'],
    pdf: false,
    hot: false,
  },

  {
    id: 'am-500b',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AM-500B',
      en: 'AM-500B',
    },
    name: {
      'zh-TW': '高產能礦形冰製冰機',
      en: 'High Capacity Nugget Ice Machine',
    },
    desc: {
      'zh-TW': '高產能礦形冰設備，適合便利商店與酒吧。',
      en: 'High-capacity nugget ice machine for bars and retail stores.',
    },
    price: '',
    tags: ['ci', 'hc', 'ac', 'ms', 'rs', 'tb', 'std'],
    pdf: false,
    hot: false,
  },

  {
    id: 'am-700',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AM-700',
      en: 'AM-700',
    },
    name: {
      'zh-TW': '高產能礦形冰製冰機',
      en: 'High Capacity Nugget Ice Machine',
    },
    desc: {
      'zh-TW': '高產能礦形冰設備，適合便利商店與酒吧。',
      en: 'High-capacity nugget ice machine for bars and retail stores.',
    },
    price: '',
    tags: ['ci', 'hc', 'ac', 'ls', 'rs', 'fs', 'fg'],
    pdf: false,
    hot: false,
  },

  {
    id: 'am-700b',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AM-700B',
      en: 'AM-700B',
    },
    name: {
      'zh-TW': '高產能礦形冰製冰機',
      en: 'High Capacity Nugget Ice Machine',
    },
    desc: {
      'zh-TW': '高產能礦形冰設備，適合便利商店與酒吧。',
      en: 'High-capacity nugget ice machine for bars and retail stores.',
    },
    price: '',
    tags: ['ci', 'hc', 'ac', 'ms', 'rs', 'tb', 'std'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ac-120x',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-120X',
      en: 'AC-120X',
    },
    name: {
      'zh-TW': '方形冰商用製冰機',
      en: 'Cube Ice Machine',
    },
    desc: {
      'zh-TW': '輕量高效製冰機，適合小型店面與咖啡廳。',
      en: 'Efficient commercial cube ice machine for cafes and small shops.',
    },
    image: '/img/products/120X.avif',
    price: '',
    tags: ['ci', 'ac', 'ss', 'rs', 'fs', 'el'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ac-215x',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-215X',
      en: 'AC-215X',
    },
    name: {
      'zh-TW': '雙冰型商用製冰機',
      en: 'Dual Ice Type Machine',
    },
    desc: {
      'zh-TW': '支援半形冰與方形冰，適合多用途商用需求。',
      en: 'Supports both half cube and cube ice output.',
    },
    image: '/img/products/215X.avif',
    price: '',
    tags: ['ci', 'hc', 'ac', 'ss', 'rs', 'fs', 'std'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ac-300',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-300',
      en: 'AC-300',
    },
    name: {
      'zh-TW': '一體式商用製冰機',
      en: 'Integrated Ice Machine',
    },
    desc: {
      'zh-TW': '中型商用一體式製冰設備，支援多種冰型。',
      en: 'Integrated commercial ice machine with multiple ice formats.',
    },
    price: '',
    tags: ['ci', 'hc', 'bci', 'ac', 'ms', 'fs', 'std'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ac-500a',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-500A',
      en: 'AC-500A',
    },
    name: {
      'zh-TW': '大型分體式製冰機',
      en: 'Split Type Ice Machine',
    },
    desc: {
      'zh-TW': '高產能分體式製冰設備，適合大型餐飲與酒吧。',
      en: 'High-capacity split ice machine for bars and restaurants.',
    },
    price: '',
    tags: ['ci', 'hc', 'bci', 'ac', 'ls', 'fs', 'std'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ac-500w',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-500W',
      en: 'AC-500W',
    },
    name: {
      'zh-TW': '大型分體式製冰機',
      en: 'Split Type Ice Machine',
    },
    desc: {
      'zh-TW': '高產能分體式製冰設備，適合大型餐飲與酒吧。',
      en: 'High-capacity split ice machine for bars and restaurants.',
    },
    price: '',
    tags: ['ci', 'hc', 'bci', 'wc', 'ls', 'fs', 'std'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ac-700a',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-700A',
      en: 'AC-700A',
    },
    name: {
      'zh-TW': '高產能商用製冰機',
      en: 'High Output Ice Machine',
    },
    desc: {
      'zh-TW': '適合高強度營業場所的中大型製冰設備。',
      en: 'Commercial ice machine for high-demand business environments.',
    },
    price: '',
    tags: ['ci', 'hc', 'bci', 'ac', 'ls', 'fs', 'std'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ac-700w',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-700W',
      en: 'AC-700W',
    },
    name: {
      'zh-TW': '高產能商用製冰機',
      en: 'High Output Ice Machine',
    },
    desc: {
      'zh-TW': '適合高強度營業場所的中大型製冰設備。',
      en: 'Commercial ice machine for high-demand business environments.',
    },
    price: '',
    tags: ['ci', 'hc', 'bci', 'wc', 'ls', 'fs', 'std'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ac-1050a',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-1050A',
      en: 'AC-1050A',
    },
    name: {
      'zh-TW': '超高產能製冰機',
      en: 'Ultra High Capacity Ice Machine',
    },
    desc: {
      'zh-TW': '適合大型餐廳與連鎖餐飲的高負載製冰設備。',
      en: 'Heavy-duty commercial ice machine for chain restaurants.',
    },
    image: '/img/products/1050.avif',
    price: '',
    tags: ['ci', 'hc', 'bci', 'ac', 'ls', 'fs', 'fg'],
    pdf: false,
    hot: false,
  },

    {
    id: 'ac-1050w',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-1050W',
      en: 'AC-1050W',
    },
    name: {
      'zh-TW': '超高產能製冰機',
      en: 'Ultra High Capacity Ice Machine',
    },
    desc: {
      'zh-TW': '適合大型餐廳與連鎖餐飲的高負載製冰設備。',
      en: 'Heavy-duty commercial ice machine for chain restaurants.',
    },
    image: '/img/products/1050.avif',
    price: '',
    tags: ['ci', 'hc', 'bci', 'wc', 'ls', 'fs', 'fg'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ac-1500a',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-1500A',
      en: 'AC-1500A',
    },
    name: {
      'zh-TW': '旗艦級大型製冰機',
      en: 'Flagship Industrial Ice Machine',
    },
    desc: {
      'zh-TW': '極高產能大型商用製冰設備，適合中央廚房與展演空間。',
      en: 'Industrial-grade ice machine for central kitchens and large venues.',
    },
    price: '',
    tags: ['ci', 'hc', 'ac', 'ls', 'fs', 'fg'],
    pdf: false,
    hot: false,
  },

    {
    id: 'ac-1500w',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-1500W',
      en: 'AC-1500W',
    },
    name: {
      'zh-TW': '旗艦級大型製冰機',
      en: 'Flagship Industrial Ice Machine',
    },
    desc: {
      'zh-TW': '極高產能大型商用製冰設備，適合中央廚房與展演空間。',
      en: 'Industrial-grade ice machine for central kitchens and large venues.',
    },
    price: '',
    tags: ['ci', 'hc', 'wc', 'ls', 'fs', 'fg'],
    pdf: false,
    hot: false,
  },

  //風幕櫃
  {
    id: 'Melody 15',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'Melody mini 15',
      en: 'Melody mini 15',
    },
    name: {
      'zh-TW': '一米五內藏型冷藏小型風幕櫃',
      en: 'Built-in Refrigerated Small Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'Melody 16l',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'Melody 16L',
      en: 'Melody 16L',
    },
    name: {
      'zh-TW': '一米六內藏型冷藏小型風幕櫃',
      en: 'Built-in Refrigerated Small Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

    {
    id: 'Melody H16A',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MINI - OSC H16A',
      en: 'MINI - OSC H16A',
    },
    name: {
      'zh-TW': '一米六內藏型冷藏自蒸發風幕櫃',
      en: 'Built-in Refrigerated Small Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  //1.9
  {
    id: 'plugin-3/6',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'Magic Plugin 3/6 系列',
      en: 'Magic Plugin 3/6 series',
    },
    name: {
      'zh-TW': '一米九內藏型冷藏開放式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'PRO-3CC',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'PRO 3CC 系列',
      en: 'PRO 3CC series',
    },
    name: {
      'zh-TW': '一米九內藏型雙溫開放式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'melody-SD',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MELDY SD 系列',
      en: 'MELDY SD series',
    },
    name: {
      'zh-TW': '一米九內藏型冷藏開門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'PRO-H19',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'PRO H19',
      en: 'PRO H19',
    },
    name: {
      'zh-TW': '一米九內藏型雙溫開門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'melody-3/4/6sd',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MELDY 3SD/4SD/6SD 系列',
      en: 'MELDY 3SD/4SD/6SD series',
    },
    name: {
      'zh-TW': '一米九內藏型冷藏移門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'PRO-H19-OC',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'PRO H19 OC 系列',
      en: 'PRO H19 OC series',
    },
    name: {
      'zh-TW': '一米九內藏型雙溫移門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-3/6/9-RO',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'Magic 3/6/9 系列',
      en: 'Magic 3/6/9 series',
    },
    name: {
      'zh-TW': '一米九別置型冷藏開放式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-3-cc',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC 3 CC 系列',
      en: 'MAGIC 3 CC series',
    },
    name: {
      'zh-TW': '一米九別置型雙溫開放式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-3/6/9-RD',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC 3/6/9 系列',
      en: 'MAGIC 3/6/9 series',
    },
    name: {
      'zh-TW': '一米九別置型冷藏開門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-3cc-dt',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC 3CC 系列',
      en: 'MAGIC 3CC series',
    },
    name: {
      'zh-TW': '一米九別置型雙溫開門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'Magic-3/4/6sd ',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC 3SD/4SD/6SD 系列',
      en: 'Magic 3SD/4SD/6SD series',
    },
    name: {
      'zh-TW': '一米九別置型冷藏移門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-3cc-dts',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC 3CC 系列',
      en: 'MAGIC 3CC series',
    },
    name: {
      'zh-TW': '一米九別置型雙溫移門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  //2.0
  {
    id: 'melody-pro-3',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'Melody Pro 3 系列',
      en: 'Melody Pro 3 series',
    },
    name: {
      'zh-TW': '二米內藏型冷藏開放式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'melody-pro-3cc',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'Melody Pro 3CC 系列',
      en: 'Melody Pro 3CC series',
    },
    name: {
      'zh-TW': '二米內藏型雙溫開放式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-h19',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC H19',
      en: 'MAGIC H19',
    },
    name: {
      'zh-TW': '二米內藏型冷藏開門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-h19',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC H19',
      en: 'MAGIC H19',
    },
    name: {
      'zh-TW': '二米內藏型雙溫開門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-h19',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC H19',
      en: 'MAGIC H19',
    },
    name: {
      'zh-TW': '二米內藏型冷藏移門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-h19',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC H19',
      en: 'MAGIC H19',
    },
    name: {
      'zh-TW': '二米內藏型雙溫移門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'Magic-H-3/6/9 ',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC H 3/6/9 系列',
      en: 'MAGIC H 3/6/9 series',
    },
    name: {
      'zh-TW': '二米別置型冷藏開放式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-h19',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC H19',
      en: 'MAGIC H19',
    },
    name: {
      'zh-TW': '二米別置型雙溫開放式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-h19',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC H19',
      en: 'MAGIC H19',
    },
    name: {
      'zh-TW': '二米別置型冷藏開門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-h19',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC H19',
      en: 'MAGIC H19',
    },
    name: {
      'zh-TW': '二米別置型雙溫開門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-h19',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC H19',
      en: 'MAGIC H19',
    },
    name: {
      'zh-TW': '二米別置型冷藏移門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-h19',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC H19',
      en: 'MAGIC H19',
    },
    name: {
      'zh-TW': '二米別置型雙溫移門式風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-h19',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC H19',
      en: 'MAGIC H19',
    },
    name: {
      'zh-TW': '別置型冷藏開放風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '開放式設計方便快速取用，適用便利商店、超市量販。',
      en: 'Open display design for quick access, suitable for convenience stores and supermarkets.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-sd',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC SD',
      en: 'MAGIC SD',
    },
    name: {
      'zh-TW': '別置型冷藏移門風幕櫃',
      en: 'Remote Refrigerated Sliding Door Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '移門設計提升節能效率與溫控穩定性，適用飲料專賣店、超市與便利商店。',
      en: 'Sliding-door design improves energy efficiency and temperature control for beverage shops, supermarkets, and convenience stores.',
    },
    price: '',
    tags: ['airc', 'rt', 'sd'],
    pdf: false,
    hot: false,
  },

  {
    id: 'magic-h20',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'MAGIC H20',
      en: 'MAGIC H20',
    },
    name: {
      'zh-TW': '別置型冷藏開放風幕櫃',
      en: 'Remote Refrigerated Open Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '加高展示設計，適合大型超市、量販賣場與商品種類較多的場域。',
      en: 'Taller display design for large supermarkets and high-volume retail spaces.',
    },
    price: '',
    tags: ['airc', 'rt', 'od'],
    pdf: false,
    hot: false,
  },

  {
    id: 'melody-sd',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'Melody SD',
      en: 'Melody SD',
    },
    name: {
      'zh-TW': '內藏型冷藏移門風幕櫃',
      en: 'Built-in Refrigerated Sliding Door Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '內藏式冷藏系統與滑門設計，適合便利商店與小型門市快速部署。',
      en: 'Built-in refrigeration with sliding doors for compact stores and quick deployment.',
    },
    price: '',
    tags: ['airc', 'bi', 'sd', 'ss'],
    pdf: false,
    hot: false,
  },

  //保溫材料
  {
    id: 'VIP',
    categoryId: 'material',
    groupId: 'InsulationPanels',
    model: {
      'zh-TW': '真空絕熱板',
      en: 'Vacuum Insulation Panel',
    },
    name: {
      'zh-TW': '真空絕熱板',
      en: 'Vacuum Insulation Panel',
    },
    desc: {
      'zh-TW': '適合冷藏冷凍（冰箱、冰櫃、冷藏車、冷庫、儲冰槽）及建築防火建材等產業。內部真空、保溫性佳；玻璃纖維耐熱抗腐蝕；厚度僅普通材料七分之一，保溫效果為普通保溫材料7~10倍。',
      en: 'Suitable for cold storage and fire-resistant building materials. Internal vacuum with excellent insulation; thickness is only 1/7 of conventional materials with 7-10x insulation performance.',
    },
    price: '',
    tags: ['ss'],
    pdf: false,
    hot: false,
  },

  {
    id: 'MCSP',
    categoryId: 'material',
    groupId: 'InsulationPanels',
    model: {
      'zh-TW': '組合式冷藏冷凍庫板',
      en: 'Modular Cold Storage Panels',
    },
    name: {
      'zh-TW': '組合式冷藏冷凍庫板',
      en: 'Modular Cold Storage Panels',
    },
    desc: {
      'zh-TW': '內政部營建署認可新技術新工法。適用於食品處理、農藥、醫學、製藥等各行業。可擴大縮小、方便遷移重組、增強冷空氣對流循環。',
      en: 'Approved as new technology. Suitable for food processing, agriculture, medical, and pharmaceutical industries. Expandable, easily relocated and reconfigured.',
    },
    price: '',
    tags: ['ss'],
    pdf: false,
    hot: false,
  },
]
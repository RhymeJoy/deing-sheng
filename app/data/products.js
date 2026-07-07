export type LocaleCode = 'zh-TW' | 'en'

export type LocalizedText = Partial<Record<LocaleCode, string>>

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
  specs?: ProductSpec[]
  tags?: string[]
}
export const productTags: Record<string, ProductTag> = {
  // tabletop
  tb: {
    label: {
      'zh-TW': '桌上型',
      en: 'Tabletop',
    },
  },

  // floorStanding
  fs: {
    label: {
      'zh-TW': '落地型',
      en: 'Floor Standing',
    },
  },

  // airCooled
  ac: {
    label: {
      'zh-TW': '風冷',
      en: 'Air-Cooled',
    },
  },

  // waterCooled
  wc: {
    label: {
      'zh-TW': '水冷',
      en: 'Water-Cooled',
    },
  },

  // startup
  su: {
    label: {
      'zh-TW': '創業入門',
      en: 'Startup',
    },
  },

  // entryLevel
  el: {
    label: {
      'zh-TW': '入門款',
      en: 'Entry Level',
    },
  },

  // highCapacity
  hc: {
    label: {
      'zh-TW': '高產能',
      en: 'High Capacity',
    },
  },

  // ultraCapacity
  uc: {
    label: {
      'zh-TW': '超高產能',
      en: 'Ultra Capacity',
    },
  },

  // flagship
  fg: {
    label: {
      'zh-TW': '旗艦級',
      en: 'Flagship',
    },
  },

  // twinTank
  tt: {
    label: {
      'zh-TW': '雙缸三孔',
      en: 'Twin Tank',
    },
  },
  // SingleTank
  ot: {
    label: {
      'zh-TW': '單缸單孔',
      en: 'Single Tank',
    },
  },

  // cubeIce
  ci: {
    label: {
      'zh-TW': '方形冰',
      en: 'Cube Ice',
    },
  },

  // halfCube
  hc2: {
    label: {
      'zh-TW': '半形冰',
      en: 'Half Cube',
    },
  },

  // nuggetIce
  ni: {
    label: {
      'zh-TW': '礦形冰',
      en: 'Nugget Ice',
    },
  },

  // smallStore
  ss: {
    label: {
      'zh-TW': '小型店面',
      en: 'Small Store',
    },
  },

  // compact
  cp: {
    label: {
      'zh-TW': '輕量',
      en: 'Compact',
    },
  },

  // dualType
  dt: {
    label: {
      'zh-TW': '雙冰型',
      en: 'Dual Type',
    },
  },

  // integrated
  ig: {
    label: {
      'zh-TW': '一體式',
      en: 'Integrated',
    },
  },

  // splitType
  st: {
    label: {
      'zh-TW': '分體式',
      en: 'Split Type',
    },
  },

  // commercial
  cm: {
    label: {
      'zh-TW': '商用',
      en: 'Commercial',
    },
  },

  // largeCommercial
  lc: {
    label: {
      'zh-TW': '大型商用',
      en: 'Commercial',
    },
  },

  // restaurant
  rs: {
    label: {
      'zh-TW': '大型餐飲',
      en: 'Restaurant',
    },
  },

  // industrial
  id: {
    label: {
      'zh-TW': '極高產能',
      en: 'Industrial',
    },
  },

  // centralKitchen
  ck: {
    label: {
      'zh-TW': '中央廚房',
      en: 'Ultra Capacity',
    },
  },

  // airWaterCooling
  aw: {
    label: {
      'zh-TW': '風冷水冷',
      en: 'Air/Water Cooling',
    },
  },

  // remoteType
  rt: {
    label: {
      'zh-TW': '別置型',
      en: 'Remote Type',
    },
  },

  // builtInType
  bi: {
    label: {
      'zh-TW': '內藏型',
      en: 'Built-in Type',
    },
  },

  // openDisplay
  od: {
    label: {
      'zh-TW': '開放式',
      en: 'Open Display',
    },
  },

  // slidingDoor
  sd: {
    label: {
      'zh-TW': '移門',
      en: 'Sliding Door',
    },
  },

  // airCurtain
  airc: {
    label: {
      'zh-TW': '風幕櫃',
      en: 'Air Curtain Cabinet',
    },
  },
}

export const productCategories: ProductCategory[] = [
  {
    id: 'equipment',
    name: {
      'zh-TW': '設備類',
      en: 'Equipment',
    },
    desc: {
      'zh-TW': '商用霜淇淋機、製冷設備與相關應用設備',
      en: 'Commercial soft serve machines and refrigeration equipment',
    },
    icon: '⚙️',
  },

  {
    id: 'chemical',
    name: {
      'zh-TW': '化學類',
      en: 'Chemical',
    },
    desc: {
      'zh-TW': '化學類',
      en: 'Chemical',
    },
    icon: '🧪',
  },

  {
    id: 'material',
    name: {
      'zh-TW': '材料類',
      en: 'Material',
    },
    desc: {
      'zh-TW': '材料類',
      en: 'Material',
    },
    icon: '🧪',
  },
]

export const productGroups: ProductGroup[] = [
  //equipment
  {
    id: 'softServe',
    categoryId: 'equipment',
    name: {
      'zh-TW': '霜淇淋機',
      en: 'Soft Serve Machines',
    },
    desc: {
      'zh-TW': '商用桌上型、落地型、風冷與水冷霜淇淋設備',
      en: 'Commercial countertop, floor-standing, air-cooled, and water-cooled soft serve equipment',
    },
  },

  {
    id: 'iceMachine',
    categoryId: 'equipment',
    name: {
      'zh-TW': '商用製冰機',
      en: 'Commercial Ice Machines',
    },
    desc: {
      'zh-TW': '商用方塊冰、半方冰、礦形冰製冰設備',
      en: 'Commercial cube ice, half cube ice, and nugget ice machines',
    },
  },

  {
    id: 'airCurtainCabinet',
    categoryId: 'equipment',
    name: {
      'zh-TW': '商用風幕櫃',
      en: 'Commercial Air Curtain Cabinets',
    },
    desc: {
      'zh-TW': '商用冷藏開放櫃、移門風幕櫃與小型展示冷藏櫃',
      en: 'Commercial refrigerated open display, sliding-door, and compact display cabinets',
    },
  },

  //chemical
  {
    id: 'ADM',
    categoryId: 'chemical',
    name: {
      'zh-TW': 'ADM 系列',
      en: 'ADM Series',
    },
    desc: {
      'zh-TW': '高溫離型劑及氮化硼專業用劑，適用於各類高溫加工製程',
      en: 'High-temperature release agents and boron nitride products for high-temperature processes',
    },
  },

  {
    id: 'ChemicalRawMaterials',
    categoryId: 'chemical',
    name: {
      'zh-TW': '化工原料',
      en: 'Chemical Raw Materials',
    },
    desc: {
      'zh-TW': 'MDI、PUF系統料、PU清洗劑等聚氨酯相關原料',
      en: 'MDI, PUF system materials, PU cleaners and other polyurethane-related materials',
    },
  },

  {
    id: 'Pentane',
    categoryId: 'chemical',
    name: {
      'zh-TW': '戊烷系列',
      en: 'Pentane Series',
    },
    desc: {
      'zh-TW': '正戊烷、異戊烷、環戊烷等各類戊烷產品',
      en: 'N-pentane, isopentane, cyclopentane and other pentane products',
    },
  },

  //material
  {
    id: 'InsulationPanels',
    categoryId: 'material',
    name: {
      'zh-TW': '保溫材料',
      en: 'Insulation Materials',
    },
    desc: {
      'zh-TW': '真空絕熱板、組合式冷藏冷凍庫板等保溫保冷解決方案',
      en: 'Vacuum insulation panels, modular cold storage panels and thermal solutions',
    },
  },
]

export const products: Product[] = [
  //霜淇淋
  {
    id: 'ds-td98',
    categoryId: 'equipment',
    groupId: 'softServe',
    model: {
      'zh-TW': 'DS-TD98',
      en: 'DS-TD98｜Tabletop Single Tank',
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
    tags: ['tb', 'ac', 'su', 'ot'],
    pdf: false,
    hot: true,
    
  },

  {
    id: 'ds-ts99',
    categoryId: 'equipment',
    groupId: 'softServe',
    model: {
      'zh-TW': 'DS-TS99',
      en: 'DS-TS99｜Tabletop Twin Tank Triple Nozzle',
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
    tags: ['tb', 'ac', 'tt', 'hc'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ds-ls168-air',
    categoryId: 'equipment',
    groupId: 'softServe',
    model: {
      'zh-TW': 'DS-LS168｜風冷',
      en: 'DS-LS168｜Floor Standing Air-Cooled',
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
    tags: ['fs', 'ac', 'hc'],
    pdf: false,
    hot: true,
  },

  {
    id: 'ds-ls168-water',
    categoryId: 'equipment',
    groupId: 'softServe',
    model: {
      'zh-TW': 'DS-LS168｜水冷',
      en: 'DS-LS168｜Floor Standing Water-Cooled',
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
    tags: ['fs', 'wc', 'hc'],
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
    tags: ['ci', 'ac', 'el'],
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
    tags: ['ci', 'ac', 'hc'],
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
    tags: ['ni', 'ac', 'ss'],
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
    tags: ['ni', 'hc', 'cm'],
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
    tags: ['ci', 'ac', 'cp'],
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
    tags: ['hc2', 'ci', 'dt'],
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
    tags: ['ig', 'ci', 'hc2'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ac-500',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-500',
      en: 'AC-500',
    },
    name: {
      'zh-TW': '大型分體式製冰機',
      en: 'Split Type Ice Machine',
    },
    desc: {
      'zh-TW': '高產能分體式製冰設備，適合大型餐飲與酒吧。',
      en: 'High-capacity split ice machine for bars and restaurants.',
    },
    tags: ['st', 'hc', 'lc'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ac-700',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-700',
      en: 'AC-700',
    },
    name: {
      'zh-TW': '高產能商用製冰機',
      en: 'High Output Ice Machine',
    },
    desc: {
      'zh-TW': '適合高強度營業場所的中大型製冰設備。',
      en: 'Commercial ice machine for high-demand business environments.',
    },
    tags: ['hc', 'lc', 'aw'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ac-1050',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-1050',
      en: 'AC-1050',
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
    tags: ['uc', 'rs', 'st'],
    pdf: false,
    hot: false,
  },

  {
    id: 'ac-1500',
    categoryId: 'equipment',
    groupId: 'iceMachine',
    model: {
      'zh-TW': 'AC-1500',
      en: 'AC-1500',
    },
    name: {
      'zh-TW': '旗艦級大型製冰機',
      en: 'Flagship Industrial Ice Machine',
    },
    desc: {
      'zh-TW': '極高產能大型商用製冰設備，適合中央廚房與展演空間。',
      en: 'Industrial-grade ice machine for central kitchens and large venues.',
    },
    tags: ['fg', 'id', 'ck'],
    pdf: false,
    hot: false,
  },

  //風幕櫃
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
    tags: ['airc', 'rt', 'od', 'cm'],
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
    tags: ['airc', 'rt', 'sd', 'cm'],
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
    tags: ['airc', 'rt', 'od', 'lc'],
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
    tags: ['airc', 'bi', 'sd', 'ss'],
    pdf: false,
    hot: false,
  },

  {
    id: 'melody-15l',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'Melody 15L',
      en: 'Melody 15L',
    },
    name: {
      'zh-TW': '內藏型冷藏小型風幕櫃',
      en: 'Built-in Compact Refrigerated Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '體積精巧、擺放彈性高，適用咖啡廳、甜點店與櫃檯展示。',
      en: 'Compact and flexible display cabinet for cafés, dessert shops, and counter displays.',
    },
    tags: ['airc', 'bi', 'cp', 'ss'],
    pdf: false,
    hot: false,
  },

  {
    id: 'melody-16l',
    categoryId: 'equipment',
    groupId: 'airCurtainCabinet',
    model: {
      'zh-TW': 'Melody 16L',
      en: 'Melody 16L',
    },
    name: {
      'zh-TW': '內藏型冷藏小型風幕櫃',
      en: 'Built-in Compact Refrigerated Air Curtain Cabinet',
    },
    desc: {
      'zh-TW': '小型冷藏展示櫃，適合咖啡廳、甜點店與櫃檯展示使用。',
      en: 'Compact refrigerated display cabinet for cafés, dessert shops, and counter displays.',
    },
    tags: ['airc', 'bi', 'cp', 'ss'],
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
    tags: ['cp', 'ss'],
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
    tags: ['cp', 'ss'],
    pdf: false,
    hot: false,
  },
]
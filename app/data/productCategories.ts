import type { ProductCategory, ProductGroup, ProductTag } from './softServeCatalog'

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

  // entryLevel
  el: {
    label: {
      'zh-TW': '入門款',
      en: 'Entry Level',
    },
  },

  // flagship
  fg: {
    label: {
      'zh-TW': '旗艦款',
      en: 'Flagship',
    },
  },

  // Standard
  std: {
    label: {
      'zh-TW': '主流款',
      en: 'Standard',
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

  // bigcubeIce
  bci: {
    label: {
      'zh-TW': '大方形冰',
      en: 'Big Cube Ice',
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
  hc: {
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

  // mediumStore
  ms: {
    label: {
      'zh-TW': '中型店面',
      en: 'Medium Store',
    },
  },

  // largeStore
  ls: {
    label: {
      'zh-TW': '大型店面',
      en: 'Large Store',
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

  // restaurant
  rs: {
    label: {
      'zh-TW': '餐飲',
      en: 'Restaurant',
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

  // refrigeratedType
  rft: {
    label: {
      'zh-TW': '冷藏式',
      en: 'Refrigerated type',
    },
  },

  // dualtempType
  dtt: {
    label: {
      'zh-TW': '雙溫式',
      en: 'Dual Temperature Type',
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
      'zh-TW': '移門式',
      en: 'Sliding Door',
    },
  },

  // hingedDoor
  hd: {
    label: {
      'zh-TW': '開門式',
      en: 'Hinged Door',
    },
  },

  // 1.5m
  '1.5m': {
    label: {
      'zh-TW': '1米5',
      en: '1.5m',
    },
  },

  // 1.6m
  '1.6m': {
    label: {
      'zh-TW': '1米6',
      en: '1.6m',
    },
  },

  // 1.9m
  '1.9m': {
    label: {
      'zh-TW': '1米9',
      en: '1.9m',
    },
  },

  // 2m
  '2m': {
    label: {
      'zh-TW': '2米',
      en: '2m',
    },
  },

  // wheel
  wl: {
    label: {
      'zh-TW': '輪子',
      en: 'Wheel',
    },
  },

  // airCurtain
  airc: {
    label: {
      'zh-TW': '風幕櫃',
      en: 'Air Curtain Cabinet',
    },
  },

  // softserveMachine
  ssm: {
    label: {
      'zh-TW': '霜淇淋機',
      en: 'Soft Serve Machine',
    },
  },

  // IceMachine
  im: {
    label: {
      'zh-TW': '製冰機',
      en: 'Ice Machine',
    },
  },

  // dualtempcabinet
  dtc: {
    label: {
      'zh-TW': '雙溫櫃',
      en: 'Dual Temperature Cabinet',
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
    icon: '📌',
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

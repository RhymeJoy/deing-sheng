import type { LocalizedText, Product } from './softServeCatalog'

const text = (zh: string, en: string): LocalizedText => ({
  'zh-TW': zh,
  en,
})

export const insulationProducts: Product[] = [
  {
    id: 'VIP',
    categoryId: 'material',
    groupId: 'InsulationPanels',
    model: text('真空絕熱板', 'Vacuum Insulation Panel'),
    name: text('真空絕熱板', 'Vacuum Insulation Panel'),
    desc: text(
      '適合冷藏冷凍（冰箱、冰櫃、冷藏車、冷庫、儲冰槽）及建築防火建材等產業。內部真空、保溫性佳；玻璃纖維耐熱抗腐蝕；厚度僅普通材料七分之一，保溫效果為普通保溫材料7~10倍。',
      'Suitable for cold storage and fire-resistant building materials. Internal vacuum with excellent insulation; thickness is only 1/7 of conventional materials with 7-10x insulation performance.',
    ),
    price: '',
    tags: ['ss'],
    pdf: false,
    hot: false,
  },
  {
    id: 'MCSP',
    categoryId: 'material',
    groupId: 'InsulationPanels',
    model: text('組合式冷藏冷凍庫板', 'Modular Cold Storage Panels'),
    name: text('組合式冷藏冷凍庫板', 'Modular Cold Storage Panels'),
    desc: text(
      '內政部營建署認可新技術新工法。適用於食品處理、農藥、醫學、製藥等各行業。可擴大縮小、方便遷移重組、增強冷空氣對流循環。',
      'Approved as new technology. Suitable for food processing, agriculture, medical, and pharmaceutical industries. Expandable, easily relocated and reconfigured.',
    ),
    price: '',
    tags: ['ss'],
    pdf: false,
    hot: false,
  },
]

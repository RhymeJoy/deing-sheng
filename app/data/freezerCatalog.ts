import type { Product } from './softServeCatalog'
import { createProduct, local, spec, type CatalogProductInput } from './catalogUtils'

type ProductInput = CatalogProductInput

const freezerFeatures = [
  '適合冷凍食品與冰淇淋展示、保存。',
  '可依產品配置選擇玻璃門、燈箱與腳輪等配件。',
]

const freezerProduct = (x: ProductInput): Product & { seriesId?: string } => createProduct({ groupId: 'freezerCabinet', features: freezerFeatures, tags: ['frz'], ...x })
export const freezerProducts = [
  freezerProduct({ id: 'ivgf-2d-7519wa', seriesId: 'freezer-upright', model: local('IVGF-2D-7519WA'), name: local('IVGF-2D-7519WA 自攜立式冷凍玻璃門櫃', 'IVGF-2D-7519WA Self-contained Upright Freezer Glass-door Cabinet'), desc: local('適合便利商店與超市量販的冷凍食品陳列與保存。', 'For frozen food display and storage in convenience stores and supermarkets.'), applications: ['便利商店', '超市量販'], specs: [spec('產品尺寸（長×寬×高）', 'Dimensions (L × W × H)', '1220 × 750 × 1930 mm'), spec('包裝尺寸（長×寬×高）', 'Packing dimensions (L × W × H)', '1295 × 845 × 2065 mm'), spec('用途', 'Application', '冷凍品', 'Frozen goods'), spec('工作溫度', 'Working temperature', '低於 -18℃', 'Below -18℃'), spec('環境條件', 'Ambient conditions', '25℃ 60%RH～27℃ 70%RH', '25℃ 60%RH to 27℃ 70%RH'), spec('輸入功率', 'Input power', '1854 W / 8.43 A'), spec('電壓／頻率', 'Voltage / frequency', '220V／60Hz', '220V / 60Hz'), spec('控制器', 'Controller', 'PJEZCOEOOO'), spec('製冷劑', 'Refrigerant', 'R290'), spec('展示面積', 'Display area', '1.08 m²'), spec('容積', 'Capacity', '628 L'), spec('層數', 'Number of shelves', '5'), spec('淨重', 'Net weight', '247 kg'), spec('排水管徑', 'Drain pipe diameter', 'φ 40'), spec('選配件', 'Optional accessory', '腳輪', 'Castors')] }),
  freezerProduct({ id: 'ivgf-c-1-5-5711wa', seriesId: 'ice-cream-freezer', model: local('IVGF / C-1.5-5711WA'), name: local('IVGF / C-1.5-5711WA 冰淇淋子櫃', 'IVGF / C-1.5-5711WA Ice Cream Child Cabinet'), desc: local('附燈箱的冰淇淋子櫃，適合便利商店與超市量販展示。', 'An illuminated ice cream child cabinet for convenience stores and supermarkets.'), applications: ['便利商店', '超市量販'], specs: [spec('產品尺寸（長×寬×高）', 'Dimensions (L × W × H)', '1500 × 565 × 1100 mm'), spec('門數', 'Number of doors', '對開雙門', 'Two hinged doors'), spec('燈箱', 'Light box', '有', 'Yes'), spec('工作溫度', 'Working temperature', '≤ -22℃／1～10℃', '≤ -22℃ / 1 to 10℃'), spec('展示面積', 'Display area', '0.69 m²'), spec('有效容積', 'Net capacity', '389 L')] }),
  freezerProduct({ id: 'ivgf-c-1-8-5711wa', seriesId: 'ice-cream-freezer', model: local('IVGF / C-1.8-5711WA'), name: local('IVGF / C-1.8-5711WA 冰淇淋子櫃', 'IVGF / C-1.8-5711WA Ice Cream Child Cabinet'), desc: local('附燈箱的加長型冰淇淋子櫃，提供更大的展示容量。', 'An extended illuminated ice cream child cabinet with larger display capacity.'), applications: ['便利商店', '超市量販'], specs: [spec('產品尺寸（長×寬×高）', 'Dimensions (L × W × H)', '1860 × 565 × 1100 mm'), spec('門數', 'Number of doors', '3門', '3 doors'), spec('燈箱', 'Light box', '有', 'Yes'), spec('工作溫度', 'Working temperature', '≤ -22℃／1～10℃', '≤ -22℃ / 1 to 10℃'), spec('展示面積', 'Display area', '0.88 m²'), spec('有效容積', 'Net capacity', '493 L')] }),
  freezerProduct({ id: 'sd585qs', seriesId: 'ice-cream-freezer', model: local('SD585QS'), name: local('SD585QS 冰淇淋母櫃', 'SD585QS Ice Cream Parent Cabinet'), desc: local('搭配冰淇淋子櫃使用的母櫃，具下櫃視窗與自蒸發設計。', 'A parent cabinet for the ice cream child cabinet, with a lower-cabinet window and self-evaporation.'), applications: ['便利商店', '超市量販'], specs: [spec('產品尺寸（長×寬×高）', 'Dimensions (L × W × H)', '1500 × 850 × 880 mm'), spec('門數', 'Number of doors', '上下推拉雙門', 'Two upper-and-lower sliding doors'), spec('燈箱', 'Light box', '無', 'No'), spec('工作溫度', 'Working temperature', '≤ -18℃', '≤ -18℃'), spec('展示面積', 'Display area', '1.02 m²'), spec('有效容積', 'Net capacity', '347 L'), spec('下櫃視窗', 'Lower-cabinet window', '有', 'Yes')] }),
  freezerProduct({ id: 'sd785qs', seriesId: 'ice-cream-freezer', model: local('SD785QS'), name: local('SD785QS 冰淇淋母櫃', 'SD785QS Ice Cream Parent Cabinet'), desc: local('加長型冰淇淋母櫃，具下櫃視窗與自蒸發設計。', 'An extended ice cream parent cabinet with a lower-cabinet window and self-evaporation.'), applications: ['便利商店', '超市量販'], specs: [spec('產品尺寸（長×寬×高）', 'Dimensions (L × W × H)', '1860 × 850 × 880 mm'), spec('門數', 'Number of doors', '上下推拉雙門', 'Two upper-and-lower sliding doors'), spec('燈箱', 'Light box', '無', 'No'), spec('工作溫度', 'Working temperature', '≤ -18℃', '≤ -18℃'), spec('展示面積', 'Display area', '1.29 m²'), spec('有效容積', 'Net capacity', '463 L'), spec('下櫃視窗', 'Lower-cabinet window', '有', 'Yes')] }),
]


export type FreezerSeries = {
  categoryId: string
  desc: ReturnType<typeof local>
  groupId: string
  id: string
  name: ReturnType<typeof local>
  productIds: string[]
}

export const productSeries: FreezerSeries[] = [
  {
    id: 'freezer-upright',
    categoryId: 'equipment',
    groupId: 'freezerCabinet',
    name: local('立式冷凍櫃系列', 'Upright Freezer Series'),
    desc: local('自攜立式冷凍玻璃門櫃，適合冷凍食品陳列與保存。', 'Self-contained upright freezer glass-door cabinet for frozen food display and storage.'),
    productIds: ['ivgf-2d-7519wa'],
  },
  {
    id: 'ice-cream-freezer',
    categoryId: 'equipment',
    groupId: 'freezerCabinet',
    name: local('冰淇淋子母櫃系列', 'Ice Cream Parent-child Freezer Series'),
    desc: local('冰淇淋子櫃與母櫃產品，提供不同展示面積與容量選擇。', 'Ice cream child and parent cabinets in multiple display areas and capacities.'),
    productIds: ['ivgf-c-1-5-5711wa', 'ivgf-c-1-8-5711wa', 'sd585qs', 'sd785qs'],
  },
]

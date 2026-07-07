import { computed, ref, watch } from 'vue'

import { products } from '~/data/products'

const STORAGE_KEY = 'deing-sheng:inquiry-list'

function readStoredIds() {
  if (!import.meta.client) return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = JSON.parse(raw || '[]')

    return Array.isArray(parsed)
      ? parsed.filter(id => typeof id === 'string')
      : []
  } catch {
    return []
  }
}

const inquiryIds = ref(readStoredIds())

watch(
  inquiryIds,
  (ids) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  },
  {
    deep: true,
  }
)

const inquiryItems = computed(() => {
  return inquiryIds.value
    .map(id => products.find(product => product.id === id))
    .filter(Boolean)
})

const inquiryCount = computed(() => inquiryItems.value.length)

export function useInquiryList() {
  function addInquiryItem(itemOrId) {
    const id = typeof itemOrId === 'string'
      ? itemOrId
      : itemOrId?.id

    if (!id || inquiryIds.value.includes(id)) return

    inquiryIds.value = [
      ...inquiryIds.value,
      id,
    ]
  }

  function removeInquiryItem(id) {
    inquiryIds.value = inquiryIds.value.filter(itemId => itemId !== id)
  }

  function clearInquiryList() {
    inquiryIds.value = []
  }

  function isInquiryItemSelected(id) {
    return inquiryIds.value.includes(id)
  }

  return {
    inquiryIds,
    inquiryItems,
    inquiryCount,
    addInquiryItem,
    removeInquiryItem,
    clearInquiryList,
    isInquiryItemSelected,
  }
}

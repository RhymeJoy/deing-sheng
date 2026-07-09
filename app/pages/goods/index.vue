<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalePath, usePublicAsset } from '#imports'

import {
  productCategories,
  productGroups,
  products,
  productTags,
} from '~/data/products'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const publicAsset = usePublicAsset()

const ALL_ID = 'all'
const FILTER_STORAGE_KEY = 'deing-sheng:goods-filter-state'

const keyword = ref('')
const filtersOpen = ref(false)
const activeSort = ref('popular')
const activeCategoryId = ref(ALL_ID)
const activeGroupId = ref(ALL_ID)
let filtersRestored = false

const sortOptions = [
  { id: 'popular', label: { 'zh-TW': '綜合排序', en: 'Popular' } },
  { id: 'priceLow', label: { 'zh-TW': '價格▲', en: 'Price Low to High' } },
  { id: 'priceHigh', label: { 'zh-TW': '價格▼', en: 'Price High to Low' } },
  // { id: 'newest', label: { 'zh-TW': '最新', en: 'Newest' } },
]

const allCategory = {
  id: ALL_ID,
  name: { 'zh-TW': '全部', en: 'All' },
  icon: '📦',
}

const allGroup = {
  id: ALL_ID,
  categoryId: ALL_ID,
  name: { 'zh-TW': '全部', en: 'All' },
}

const controlPanelRef = ref<HTMLElement | null>(null)

function isSortId(value: unknown) {
  return typeof value === 'string' &&
    sortOptions.some(option => option.id === value)
}

function isCategoryId(value: unknown) {
  return value === ALL_ID ||
    (
      typeof value === 'string' &&
      productCategories.some(category => category.id === value)
    )
}

function normalizeGroupId(value: unknown, categoryId: string) {
  if (value === ALL_ID) return ALL_ID
  if (typeof value !== 'string') return ALL_ID

  const group = productGroups.find(group => group.id === value)

  if (!group) return ALL_ID

  return categoryId === ALL_ID || group.categoryId === categoryId
    ? value
    : ALL_ID
}

function saveFilterState() {
  if (!import.meta.client || !filtersRestored) return

  sessionStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify({
    categoryId: activeCategoryId.value,
    groupId: activeGroupId.value,
    keyword: keyword.value,
    sort: activeSort.value,
  }))
}

function restoreFilterState() {
  if (!import.meta.client) return

  try {
    const savedState = JSON.parse(
      sessionStorage.getItem(FILTER_STORAGE_KEY) || '{}'
    )

    const nextCategoryId = isCategoryId(savedState.categoryId)
      ? savedState.categoryId
      : ALL_ID

    activeCategoryId.value = nextCategoryId
    activeGroupId.value = normalizeGroupId(savedState.groupId, nextCategoryId)
    activeSort.value = isSortId(savedState.sort)
      ? savedState.sort
      : 'popular'
    keyword.value = typeof savedState.keyword === 'string'
      ? savedState.keyword
      : ''
  } catch {
    sessionStorage.removeItem(FILTER_STORAGE_KEY)
  } finally {
    filtersRestored = true
  }
}

restoreFilterState()

function handleOutsideClick(event: MouseEvent) {
  if (!filtersOpen.value) return

  const panel = controlPanelRef.value

  if (!panel) return

  if (!panel.contains(event.target as Node)) {
    filtersOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})

watch(
  [keyword, activeSort, activeCategoryId, activeGroupId],
  saveFilterState
)

function text(data) {
  return data?.[locale.value] || data?.['zh-TW'] || ''
}

function tagLabel(tag: string) {
  return productTags[tag]?.label?.[locale.value] ||
    productTags[tag]?.label?.['zh-TW'] ||
    tag
}

function tagSortScore(tag: string) {
  return Array.from(tagLabel(tag)).reduce((score, char) => {
    return score + (char.charCodeAt(0) <= 0x7F ? .55 : 1)
  }, 0)
}

function compactTags(tags: string[] = []) {
  return tags
    .map((tag, index) => ({
      index,
      score: tagSortScore(tag),
      tag,
    }))
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map(item => item.tag)
}

function optionText(option) {
  return text(option.label)
}

function priceValue(price) {
  if (price === '' || price === undefined || price === null) return null

  const value = typeof price === 'number'
    ? price
    : Number(price.replace(/,/g, ''))

  return Number.isFinite(value) ? value : null
}

function hasPrice(item) {
  return priceValue(item.price) !== null
}

function formatPrice(price) {
  return priceValue(price)?.toLocaleString() || ''
}

function comparePrice(a, b, direction) {
  const aPrice = priceValue(a.price)
  const bPrice = priceValue(b.price)

  if (aPrice === null && bPrice === null) return 0
  if (aPrice === null) return 1
  if (bPrice === null) return -1

  return direction === 'asc'
    ? aPrice - bPrice
    : bPrice - aPrice
}

const displayCategories = computed(() => [
  allCategory,
  ...productCategories.filter(item => item.id !== ALL_ID),
])

const activeGroups = computed(() => {
  if (activeCategoryId.value === ALL_ID) return [allGroup]

  return [
    allGroup,
    ...productGroups.filter(group => (
      group.id !== ALL_ID &&
      group.categoryId === activeCategoryId.value
    )),
  ]
})

const allItems = computed(() => {
  return products.map((item) => {
    const category = productCategories.find(category => category.id === item.categoryId)
    const group = productGroups.find(group => group.id === item.groupId)

    return {
      ...item,
      category,
      group,
    }
  })
})

const visibleItems = computed(() => {
  const key = keyword.value.trim().toLowerCase()

  const list = allItems.value.filter((item) => {
    const categoryMatch =
      activeCategoryId.value === ALL_ID ||
      item.categoryId === activeCategoryId.value

    const groupMatch =
      activeGroupId.value === ALL_ID ||
      item.groupId === activeGroupId.value

    const tagText = (item.tags || []).map(tagLabel)

    const content = [
      text(item.model),
      text(item.name),
      text(item.desc),
      text(item.category?.name),
      text(item.group?.name),
      ...tagText,
    ].join(' ').toLowerCase()

    return categoryMatch && groupMatch && (!key || content.includes(key))
  })

  return [...list].sort((a, b) => {
    if (activeSort.value === 'priceLow') return comparePrice(a, b, 'asc')
    if (activeSort.value === 'priceHigh') return comparePrice(a, b, 'desc')
    return 0
  })
})

const hasActiveFilters = computed(() => (
  keyword.value.trim() !== '' ||
  activeCategoryId.value !== ALL_ID ||
  activeGroupId.value !== ALL_ID
))

function selectCategory(category) {
  activeCategoryId.value = category.id
  activeGroupId.value = ALL_ID
  keyword.value = ''
}

function selectGroup(group) {
  activeGroupId.value = group.id
  keyword.value = ''
}

function clearFilters() {
  keyword.value = ''
  activeCategoryId.value = ALL_ID
  activeGroupId.value = ALL_ID
}
</script>

<template>
  <main class="goods-page">
    <div class="goods-shop-shell">

      <section class="goods-hero">
        <p class="goods-kicker">
          {{ t('products.kicker') }}
        </p>

        <h1>
          {{ t('products.title') }}
        </h1>

        <p>
          {{ t('products.heroDesc') }}
        </p>
      </section>

      <section
        ref="controlPanelRef"
        class="goods-control-panel"
      >

        <div class="goods-searchbar">
          <div class="goods-searchbox">
            <span>⌕</span>

            <input
              v-model="keyword"
              type="search"
              :placeholder="t('products.searchPlaceholder')"
            >
          </div>

          <div class="goods-filter-actions">
            <button
              v-if="hasActiveFilters"
              type="button"
              class="goods-clear-filter"
              @click="clearFilters"
            >
              {{ t('products.clearFilters') }}
            </button>

            <button
              type="button"
              class="goods-filter-toggle"
              :class="{ active: filtersOpen }"
              @click="filtersOpen = !filtersOpen"
            >
              篩選
            </button>
          </div>
        </div>

        <Transition name="goods-collapse">
          <div
            v-show="filtersOpen"
            class="goods-filter-sort-row"
          >
            <div class="goods-filters">
              <div class="goods-filter-block">
                <p class="goods-filter-title">
                  {{ t('products.categoryTitle') }}
                </p>

                <div class="goods-filter-tags">
                  <button
                    v-for="category in displayCategories"
                    :key="category.id"
                    type="button"
                    class="goods-filter-chip"
                    :class="{
                      active:
                        category.id === activeCategoryId &&
                        !keyword.trim(),
                    }"
                    @click="selectCategory(category)"
                  >
                    {{ text(category.name) }}
                  </button>
                </div>
              </div>

              <div class="goods-filter-block">
                <p class="goods-filter-title">
                  {{ t('products.groupTitle') }}
                </p>

                <div class="goods-filter-tags">
                  <button
                    v-for="group in activeGroups"
                    :key="group.id"
                    type="button"
                    class="goods-filter-chip"
                    :class="{
                      active:
                        group.id === activeGroupId &&
                        !keyword.trim(),
                    }"
                    @click="selectGroup(group)"
                  >
                    {{ text(group.name) }}
                  </button>
                </div>
              </div>
            </div>

            <div class="goods-sorts">
              <span class="goods-sort-label">
                排序
              </span>

              <button
                v-for="option in sortOptions"
                :key="option.id"
                type="button"
                class="goods-sort-btn"
                :class="{ active: activeSort === option.id }"
                @click="activeSort = option.id"
              >
                {{ optionText(option) }}
              </button>

              <b class="goods-count-pill">
                {{ visibleItems.length }}
              </b>
            </div>
          </div>
        </Transition>
      </section>

      <section class="goods-main">
        <TransitionGroup
          v-if="visibleItems.length"
          name="goods-filter"
          tag="div"
          class="goods-list"
        >
          <NuxtLink
            v-for="item in visibleItems"
            :key="item.id"
            class="goods-item-card"
            :to="localePath(`/goods/${item.id}`)"
          >
            <div class="goods-product-thumb">
              <span
                v-if="item.hot"
                class="goods-sale-badge"
              >
                HOT
              </span>

              <img
                v-if="item.image"
                :src="publicAsset(item.image)"
                :alt="text(item.name)"
                class="goods-thumb-image"
              >

              <div
                v-else
                class="goods-thumb-placeholder"
              >
                <span class="goods-placeholder-device"></span>
              </div>
            </div>

            <div class="goods-card-body">
              <div class="goods-item-top">
                <strong>
                  {{ text(item.model) }}
                </strong>
              </div>

              <p class="goods-product-name">
                {{ text(item.name) }}
              </p>

              <div
                v-if="hasPrice(item)"
                class="goods-price-row"
              >
                <small>NT$</small>

                <strong>
                  {{ formatPrice(item.price) }}
                </strong>

                <small>
                  {{ t('products.from') }}
                </small>
              </div>

              <div
                v-if="item.pdf"
                class="goods-meta-row"
              >
                <span class="goods-pdf-label">
                  {{ t('products.pdf') }}
                </span>
              </div>

              <div class="goods-tags">
                <em
                  v-for="tag in compactTags(item.tags)"
                  :key="tag"
                >
                  {{ tagLabel(tag) }}
                </em>
              </div>
            </div>
          </NuxtLink>
        </TransitionGroup>

        <div
          v-else
          class="goods-empty"
        >
          {{ t('products.empty') }}
        </div>
      </section>

    </div>
  </main>
</template>

<style scoped src="~/assets/css/goods.css"></style>
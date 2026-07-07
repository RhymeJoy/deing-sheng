<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#imports'

import {
  productCategories,
  productGroups,
  products,
  productTags,
} from '~/data/products'

const { t, locale } = useI18n()
const localePath = useLocalePath()

const ALL_ID = 'all'

const keyword = ref('')
const filtersOpen = ref(false)
const activeSort = ref('popular')
const activeCategoryId = ref(ALL_ID)
const activeGroupId = ref(ALL_ID)

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

const controlPanelRef = ref(null)

function handleOutsideClick(event) {

  if (!filtersOpen.value) return

  const panel = controlPanelRef.value

  if (!panel) return

  if (!panel.contains(event.target)) {
    filtersOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})

function text(data) {
  return data?.[locale.value] || data?.['zh-TW'] || ''
}

function optionText(option) {
  return text(option.label)
}

function fakePrice(item, index) {
  const base = 68000 + index * 18000

  if (item.id?.includes('water')) return base + 32000
  if (item.id?.includes('ls')) return base + 22000

  return base
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
  return products.map((item, index) => {
    const category = productCategories.find(category => category.id === item.categoryId)
    const group = productGroups.find(group => group.id === item.groupId)

    return {
      ...item,
      category,
      group,
      shopPrice: fakePrice(item, index),
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

    const tagText = (item.tags || []).map(tag => {
      return productTags[tag]?.label?.[locale.value] || tag
    })

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
    if (activeSort.value === 'priceLow') return a.shopPrice - b.shopPrice
    if (activeSort.value === 'priceHigh') return b.shopPrice - a.shopPrice
    if (activeSort.value === 'newest') return b.shopPrice - a.shopPrice
    return 0
  })
})

function selectCategory(category) {
  activeCategoryId.value = category.id
  activeGroupId.value = ALL_ID
  keyword.value = ''
}

function selectGroup(group) {
  activeGroupId.value = group.id
  keyword.value = ''
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

          <button
            type="button"
            class="goods-filter-toggle"
            :class="{ active: filtersOpen }"
            @click="filtersOpen = !filtersOpen"
          >
            篩選
          </button>
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
                :src="item.image"
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

              <!-- <div class="goods-price-row">
                <small>NT$</small>

                <strong>
                  {{ item.shopPrice.toLocaleString() }}
                </strong>

                <small>
                  {{ t('products.from') }}
                </small>
              </div> -->

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
                  v-for="tag in item.tags || []"
                  :key="tag"
                >
                  {{ productTags[tag]?.label?.[locale] || tag }}
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
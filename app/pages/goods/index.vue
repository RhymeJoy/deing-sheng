<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalePath, usePublicAsset } from '#imports'

import { productCategories, productGroups, productTags } from '~/data/productCategories'
import { productSeries, products } from '~/data/catalogProducts'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const publicAsset = usePublicAsset()
const keyword = ref('')
const activeCategoryId = ref('all')
const activeGroupId = ref('all')
const filtersOpen = ref(false)

function text(data: any): string {
  if (typeof data === 'string') return data
  return data?.[locale.value] || data?.['zh-TW'] || ''
}

function localizedTextValues(data?: Record<string, string | undefined>) {
  return Object.values(data || {}).filter((value): value is string => Boolean(value))
}

function tagLabel(tag: string) {
  return productTags[tag]?.label?.[locale.value] || productTags[tag]?.label?.['zh-TW'] || tag
}

const filterToggleText = computed(() => {
  if (filtersOpen.value) return locale.value === 'zh-TW' ? '隱藏篩選' : 'Hide filters'
  return locale.value === 'zh-TW' ? '顯示篩選' : 'Show filters'
})

const displayCategories = computed(() => [
  { id: 'all', name: { 'zh-TW': '全部', en: 'All' } },
  ...productCategories,
])

const displayGroups = computed(() => {
  const allGroup = { id: 'all', categoryId: 'all', name: { 'zh-TW': '全部', en: 'All' } }

  if (activeCategoryId.value === 'all') return [allGroup]

  const categoryItems = allItems.value.filter(item => item.categoryId === activeCategoryId.value)
  const availableGroupIds = new Set(categoryItems.map(item => item.groupId))

  return [
    allGroup,
    ...productGroups.filter(group => (
      group.categoryId === activeCategoryId.value && availableGroupIds.has(group.id)
    )),
  ]
})

const groupedProductIds = computed(() => new Set(productSeries.flatMap(series => series.productIds)))

const allItems = computed<any[]>(() => {
  const productsWithoutSeries = products
    .filter(item => !groupedProductIds.value.has(item.id))
    .map(item => ({
      ...item,
      isSeries: false,
      productCount: undefined,
      category: productCategories.find(category => category.id === item.categoryId),
      group: productGroups.find(group => group.id === item.groupId),
    }))

  const seriesCards = productSeries.map(series => {
    const children = series.productIds
      .map(id => products.find(item => item.id === id))
      .filter(Boolean)

    return {
      id: `series:${series.id}`,
      seriesId: series.id,
      defaultProductId: children[0]?.id,
      isSeries: true,
      model: series.name,
      name: series.name,
      desc: series.desc,
      categoryId: series.categoryId,
      groupId: series.groupId,
      image: undefined,
      hot: false,
      price: '',
      pdf: false,
      productCount: children.length,
      tags: [...new Set(children.flatMap(item => item?.tags || []))],
      searchTerms: children.flatMap(item => [
        ...localizedTextValues(item?.model),
        ...localizedTextValues(item?.name),
      ]),
      category: productCategories.find(category => category.id === series.categoryId),
      group: productGroups.find(group => group.id === series.groupId),
    }
  })

  return [...productsWithoutSeries, ...seriesCards]
})

const visibleItems = computed<any[]>(() => {
  const search = keyword.value.trim().toLowerCase()

  return allItems.value.filter(item => {
    const categoryMatch = activeCategoryId.value === 'all' || item.categoryId === activeCategoryId.value
    const groupMatch = activeGroupId.value === 'all' || item.groupId === activeGroupId.value
    const content = [
      item.id,
      ...localizedTextValues(item.model),
      ...localizedTextValues(item.name),
      ...localizedTextValues(item.desc),
      ...(item.searchTerms || []),
      ...localizedTextValues(item.category?.name),
      ...localizedTextValues(item.group?.name),
      ...(item.tags || []).flatMap((tag: string) => [tag, tagLabel(tag)]),
    ].join(' ').toLowerCase()

    return categoryMatch && groupMatch && (!search || content.includes(search))
  })
})

function clearFilters() {
  keyword.value = ''
  activeCategoryId.value = 'all'
  activeGroupId.value = 'all'
}

function itemPath(item: any) {
  return item.isSeries ? `/goods/${item.defaultProductId}` : `/goods/${item.id}`
}
</script>

<template>
  <main class="goods-page">
    <div class="goods-shop-shell">
      <section class="goods-hero">
        <p class="goods-kicker">{{ t('products.kicker') }}</p>
        <h1>{{ t('products.title') }}</h1>
        <p>{{ t('products.heroDesc') }}</p>
      </section>

      <section class="goods-control-panel">
        <div class="goods-searchbar">
          <div class="goods-searchbox">
            <span>⌕</span>
            <input v-model="keyword" type="search" :placeholder="t('products.searchPlaceholder')">
          </div>
          <div class="goods-filter-actions">
            <button
              type="button"
              class="goods-filter-toggle"
              :class="{ active: filtersOpen }"
              :aria-expanded="filtersOpen"
              @click="filtersOpen = !filtersOpen"
            >
              {{ filterToggleText }}
            </button>
            <button v-if="keyword || activeCategoryId !== 'all' || activeGroupId !== 'all'" type="button" class="goods-clear-filter" @click="clearFilters">
              {{ t('products.clearFilters') }}
            </button>
          </div>
        </div>

        <Transition name="goods-collapse">
          <div v-if="filtersOpen" class="goods-filter-sort-row">
          <div class="goods-filters">
            <div class="goods-filter-block">
              <p class="goods-filter-title">{{ t('products.categoryTitle') }}</p>
              <div class="goods-filter-tags">
                <button
                  v-for="category in displayCategories"
                  :key="category.id"
                  type="button"
                  class="goods-filter-chip"
                  :class="{ active: activeCategoryId === category.id }"
                  @click="activeCategoryId = category.id; activeGroupId = 'all'"
                >
                  {{ text(category.name) }}
                </button>
              </div>
            </div>

            <div class="goods-filter-block">
              <p class="goods-filter-title">{{ t('products.groupTitle') }}</p>
              <div class="goods-filter-tags">
                <button
                  v-for="group in displayGroups"
                  :key="group.id"
                  type="button"
                  class="goods-filter-chip"
                  :class="{ active: activeGroupId === group.id }"
                  @click="activeGroupId = group.id"
                >
                  {{ text(group.name) }}
                </button>
              </div>
            </div>
          </div>
          <b class="goods-count-pill">{{ visibleItems.length }}</b>
        </div>
        </Transition>
      </section>

      <section class="goods-main">
        <TransitionGroup v-if="visibleItems.length" name="goods-filter" tag="div" class="goods-list">
          <NuxtLink v-for="item in visibleItems" :key="item.id" class="goods-item-card" :to="localePath(itemPath(item))">
            <div class="goods-product-thumb">
              <span v-if="item.hot" class="goods-sale-badge">HOT</span>
              <img v-if="item.image" :src="publicAsset(item.image)" :alt="text(item.name)" class="goods-thumb-image">
              <div v-else class="goods-thumb-placeholder"><span class="goods-placeholder-device"></span></div>
            </div>
            <div class="goods-card-body">
              <div class="goods-item-top">
                <strong>{{ text(item.model) }}</strong>
              </div>
              <p class="goods-product-name">{{ text(item.name) }}</p>
              <div class="goods-tags">
                <em v-for="tag in item.tags" :key="tag">{{ tagLabel(tag) }}</em>
              </div>
            </div>
          </NuxtLink>
        </TransitionGroup>
        <div v-else class="goods-empty">{{ t('products.empty') }}</div>
      </section>
    </div>
  </main>
</template>

<style scoped src="~/assets/css/goods.css"></style>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#app'
import { useI18n } from 'vue-i18n'
import { useLocalePath, usePublicAsset } from '#imports'

import { productCategories, productGroups, productTags } from '~/data/productCategories'
import { productSeries, products } from '~/data/catalogProducts'

const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const publicAsset = usePublicAsset()

function text(data: any): string {
  if (typeof data === 'string') return data
  return data?.[locale.value] || data?.['zh-TW'] || ''
}

function list(data: any): string[] {
  const value = data?.[locale.value] || data?.['zh-TW'] || data
  return Array.isArray(value) ? value : []
}

function tagLabel(tag: string) {
  return productTags[tag]?.label?.[locale.value] || productTags[tag]?.label?.['zh-TW'] || tag
}

const currentItem = computed(() => products.find(product => product.id === route.params.id))
const category = computed(() => productCategories.find(candidate => candidate.id === currentItem.value?.categoryId))
const group = computed(() => productGroups.find(candidate => candidate.id === currentItem.value?.groupId))
const series = computed(() => productSeries.find(candidate => candidate.id === currentItem.value?.seriesId))
const siblingProducts = computed(() => {
  if (!series.value) return []
  return series.value.productIds
    .map(id => products.find(product => product.id === id))
    .filter(Boolean)
})
const featureList = computed(() => list(currentItem.value?.features))
const applicationList = computed(() => list(currentItem.value?.applications))
const specList = computed(() => currentItem.value?.specs || [])
</script>

<template>
  <main class="item-page">
    <section v-if="currentItem" class="item-shell">
      <NuxtLink class="item-back" :to="localePath('/goods')">
        {{ t('item.back') }}
      </NuxtLink>

      <section class="item-hero">
        <div class="item-media">
          <img v-if="currentItem.image" :src="publicAsset(currentItem.image)" :alt="text(currentItem.name)">
          <div v-else class="item-image-placeholder">
            <strong>{{ text(currentItem.model) }}</strong>
            <span>{{ t('item.catalog') }}</span>
          </div>
        </div>

        <div class="item-info">
          <p class="item-kicker">{{ text(category?.name) }} / {{ text(group?.name) }}</p>
          <h1>{{ text(currentItem.name) }}</h1>
          <p class="item-model">{{ text(currentItem.model) }}</p>
          <p class="item-desc">{{ text(currentItem.desc) }}</p>

          <div v-if="currentItem.tags?.length" class="item-tags">
            <em v-for="tag in currentItem.tags" :key="tag">{{ tagLabel(tag) }}</em>
          </div>

          <div class="item-actions">
            <NuxtLink class="item-primary-btn" :to="localePath('/contact')">
              {{ t('item.contactSales') }}
            </NuxtLink>
            <a v-if="currentItem.pdf" class="item-secondary-btn" :href="currentItem.pdf" target="_blank" rel="noopener">
              {{ t('item.download') }}
            </a>
          </div>
        </div>
      </section>

      <section v-if="series && siblingProducts.length" class="item-series-section">
        <div>
          <p class="item-series-kicker">{{ t('item.series') }}</p>
          <h2>{{ text(series.name) }}</h2>
        </div>
        <div class="item-series-links">
          <NuxtLink
            v-for="sibling in siblingProducts"
            :key="sibling.id"
            :class="{ active: sibling.id === currentItem.id }"
            :to="localePath(`/goods/${sibling.id}`)"
          >
            {{ text(sibling.model) }}
          </NuxtLink>
        </div>
      </section>

      <section class="item-section">
        <h2>{{ t('item.description') }}</h2>
        <p>{{ text(currentItem.desc) }}</p>
      </section>

      <section v-if="featureList.length || applicationList.length || specList.length" class="item-grid">
        <article v-if="featureList.length" class="item-card">
          <h3>{{ t('item.features') }}</h3>
          <ul><li v-for="feature in featureList" :key="feature">{{ feature }}</li></ul>
        </article>

        <article v-if="applicationList.length" class="item-card">
          <h3>{{ t('item.applications') }}</h3>
          <ul><li v-for="application in applicationList" :key="application">{{ application }}</li></ul>
        </article>

        <article v-if="specList.length" class="item-card item-spec-card">
          <h3>{{ t('item.specifications') }}</h3>
          <dl>
            <div v-for="itemSpec in specList" :key="text(itemSpec.label)">
              <dt>{{ text(itemSpec.label) }}</dt>
              <dd>{{ text(itemSpec.value) }}</dd>
            </div>
          </dl>
        </article>
      </section>

      <section class="item-section">
        <h2>{{ t('item.basicInfo') }}</h2>
        <dl class="item-basic-list">
          <div><dt>{{ t('item.category') }}</dt><dd>{{ text(category?.name) }}</dd></div>
          <div><dt>{{ t('item.group') }}</dt><dd>{{ text(group?.name) }}</dd></div>
          <div><dt>{{ t('item.model') }}</dt><dd>{{ text(currentItem.model) }}</dd></div>
          <div><dt>{{ t('products.catalog') }}</dt><dd>{{ currentItem.pdf ? t('item.available') : t('item.notAvailable') }}</dd></div>
        </dl>
      </section>
    </section>

    <section v-else class="item-shell item-empty">
      <h1>{{ t('item.nofound') }}</h1>
      <NuxtLink :to="localePath('/goods')">{{ t('item.back') }}</NuxtLink>
    </section>
  </main>
</template>

<style scoped>
.item-series-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 1.5rem 0 2rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid rgb(79 98 80 / 14%);
  border-radius: 1rem;
  background: #f4f0e9;
}

.item-series-kicker {
  margin: 0 0 .35rem;
  color: #6b805d;
  font-size: .75rem;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.item-series-section h2 {
  margin: 0;
  color: #2f493b;
  font-size: 1.2rem;
}

.item-series-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: .5rem;
}

.item-series-links a {
  padding: .5rem .75rem;
  border: 1px solid rgb(79 98 80 / 22%);
  border-radius: 999px;
  color: #526550;
  font-size: .85rem;
  font-weight: 700;
  text-decoration: none;
}

.item-series-links a.active,
.item-series-links a:hover {
  color: #fff;
  background: #526d58;
}

@media (max-width: 720px) {
  .item-series-section {
    align-items: flex-start;
    flex-direction: column;
  }

  .item-series-links {
    justify-content: flex-start;
  }
}
</style>

<style scoped src="~/assets/css/item.css"></style>


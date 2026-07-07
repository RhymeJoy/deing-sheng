<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#app'
import { useLocalePath } from '#imports'
import { useI18n } from 'vue-i18n'

import {
  productCategories,
  productGroups,
  products,
  productTags,
} from '~/data/products'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

function text(data) {
  if (typeof data === 'string') return data

  return (
    data?.[locale.value] ||
    data?.['zh-TW'] ||
    ''
  )
}

function list(data) {
  const value = data?.[locale.value] || data?.['zh-TW'] || data

  return Array.isArray(value) ? value : []
}

const item = computed(() => {
  return products.find((product) => {
    return product.id === route.params.id
  })
})

const category = computed(() => {
  return productCategories.find((category) => {
    return category.id === item.value?.categoryId
  })
})

const group = computed(() => {
  return productGroups.find((group) => {
    return group.id === item.value?.groupId
  })
})

const tagLabels = computed(() => {
  return (item.value?.tags || []).map((tag) => {
    return productTags[tag]?.label?.[locale.value] ||
      productTags[tag]?.label?.['zh-TW'] ||
      tag
  })
})

const featureList = computed(() => list(item.value?.features))
const applicationList = computed(() => list(item.value?.applications))

const specList = computed(() => {
  return item.value?.specs || []
})

const hasExtraInfo = computed(() => {
  return (
    featureList.value.length ||
    applicationList.value.length ||
    specList.value.length
  )
})
</script>

<template>
  <main class="item-page">

    <section
      v-if="item"
      class="item-shell"
    >
      <NuxtLink
        class="item-back"
        :to="localePath('/goods')"
      >
        ← {{ t('item.back') }}
      </NuxtLink>

      <section class="item-hero">
        <div class="item-media">
          <img
            v-if="item.image"
            :src="item.image"
            :alt="text(item.name)"
          >

          <div
            v-else
            class="item-image-placeholder"
          >
            <strong>{{ text(item.model) }}</strong>
            <span>Product Catalog</span>
          </div>
        </div>

        <div class="item-info">
          <p class="item-kicker">
            {{ text(category?.name) }} / {{ text(group?.name) }}
          </p>

          <h1>
            {{ text(item.name) }}
          </h1>

          <p class="item-model">
            {{ text(item.model) }}
          </p>

          <p class="item-desc">
            {{ text(item.desc) }}
          </p>

          <div
            v-if="tagLabels.length"
            class="item-tags"
          >
            <em
              v-for="tag in tagLabels"
              :key="tag"
            >
              {{ tag }}
            </em>
          </div>

          <div class="item-actions">
            <NuxtLink
              class="item-primary-btn"
              :to="localePath('/contact')"
            >
              聯絡詢問
            </NuxtLink>

            <a
              v-if="item.pdf"
              class="item-secondary-btn"
              :href="item.pdf || undefined"
              target="_blank"
              rel="noopener"
            >
              下載型錄
            </a>
          </div>
        </div>
      </section>

      <section class="item-section">
        <h2>商品介紹</h2>

        <p>
          {{ text(item.desc) }}
        </p>
      </section>

      <section
        v-if="hasExtraInfo"
        class="item-grid"
      >
        <article
          v-if="featureList.length"
          class="item-card"
        >
          <h3>產品特色</h3>

          <ul>
            <li
              v-for="feature in featureList"
              :key="feature"
            >
              {{ feature }}
            </li>
          </ul>
        </article>

        <article
          v-if="applicationList.length"
          class="item-card"
        >
          <h3>適用場景</h3>

          <ul>
            <li
              v-for="application in applicationList"
              :key="application"
            >
              {{ application }}
            </li>
          </ul>
        </article>

        <article
          v-if="specList.length"
          class="item-card item-spec-card"
        >
          <h3>基本規格</h3>

          <dl>
            <div
              v-for="spec in specList"
              :key="text(spec.label)"
            >
              <dt>{{ text(spec.label) }}</dt>
              <dd>{{ text(spec.value) }}</dd>
            </div>
          </dl>
        </article>
      </section>

      <section class="item-section">
        <h2>型錄資訊</h2>

        <dl class="item-basic-list">
          <div>
            <dt>產品分類</dt>
            <dd>{{ text(category?.name) }}</dd>
          </div>

          <div>
            <dt>產品系列</dt>
            <dd>{{ text(group?.name) }}</dd>
          </div>

          <div>
            <dt>產品型號</dt>
            <dd>{{ text(item.model) }}</dd>
          </div>

          <div>
            <dt>型錄</dt>
            <dd>
              {{ item.pdf ? '可下載' : '請聯絡業務取得' }}
            </dd>
          </div>
        </dl>
      </section>
    </section>

    <section
      v-else
      class="item-shell item-empty"
    >
      <h1>{{ t('item.nofound') }}</h1>

      <NuxtLink 
        :to="localePath('/goods')">
        {{ t('item.back') }}
      </NuxtLink>
    </section>

  </main>
</template>

<style scoped src="~/assets/css/item.css"></style>
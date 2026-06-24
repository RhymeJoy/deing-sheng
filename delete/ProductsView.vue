<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  productCategories,
  productGroups,
  products,
} from '../src/data/products'

const { t, locale } = useI18n()

const keyword = ref('')
const activeCategoryId = ref(productCategories[0]?.id || '')
const activeGroupId = ref(
  productGroups.find((group) => group.categoryId === activeCategoryId.value)?.id || ''
)
const activeProductId = ref(
  products.find((item) => item.groupId === activeGroupId.value)?.id || ''
)

function text(data) {
  return data?.[locale.value] || data?.['zh-TW'] || ''
}

const activeCategory = computed(() => {
  return productCategories.find((item) => item.id === activeCategoryId.value) || productCategories[0]
})

const activeGroups = computed(() => {
  return productGroups.filter((group) => group.categoryId === activeCategory.value?.id)
})

const activeGroup = computed(() => {
  return activeGroups.value.find((item) => item.id === activeGroupId.value) || activeGroups.value[0]
})

const allItems = computed(() => {
  return products.map((item) => {
    const category = productCategories.find((category) => category.id === item.categoryId)
    const group = productGroups.find((group) => group.id === item.groupId)

    return {
      ...item,
      category,
      group,
    }
  })
})

const visibleItems = computed(() => {
  const key = keyword.value.trim().toLowerCase()

  if (key) {
    return allItems.value.filter((item) => {
      const content = [
        item.model,
        text(item.name),
        text(item.desc),
        text(item.category?.name),
        text(item.group?.name),
        ...(item.tags?.[locale.value] || item.tags?.['zh-TW'] || []),
      ].join(' ').toLowerCase()

      return content.includes(key)
    })
  }

  return allItems.value.filter((item) => item.groupId === activeGroup.value?.id)
})

const selectedProduct = computed(() => {
  return (
    allItems.value.find((item) => item.id === activeProductId.value) ||
    visibleItems.value[0] ||
    allItems.value[0]
  )
})

function selectCategory(category) {
  const firstGroup = productGroups.find((group) => group.categoryId === category.id)
  const firstItem = products.find((item) => item.groupId === firstGroup?.id)

  activeCategoryId.value = category.id
  activeGroupId.value = firstGroup?.id || ''
  activeProductId.value = firstItem?.id || ''
  keyword.value = ''
}

function selectGroup(group) {
  const firstItem = products.find((item) => item.groupId === group.id)

  activeGroupId.value = group.id
  activeProductId.value = firstItem?.id || ''
  keyword.value = ''
}

function selectProduct(item) {
  activeCategoryId.value = item.categoryId
  activeGroupId.value = item.groupId
  activeProductId.value = item.id
}
</script>

<template>
  <main class="products-page">
    <section class="products-hero">
      <p class="products-kicker">{{ t('products.kicker') }}</p>
      <h1>{{ t('products.title') }}</h1>
      <p>{{ t('products.heroDesc') }}</p>
    </section>

    <section class="products-searchbar">
      <div class="products-searchbox">
        <span>⌕</span>
        <input
          v-model="keyword"
          type="search"
          :placeholder="t('products.searchPlaceholder')"
        >
      </div>

      <RouterLink class="products-contact-btn" to="/contact">
        {{ t('products.contact') }}
      </RouterLink>
    </section>

    <section class="products-layout">
      <aside class="products-panel products-category-panel">
        <h2>{{ t('products.categoryTitle') }}</h2>

        <button
          v-for="category in productCategories"
          :key="category.id"
          type="button"
          class="products-category-card"
          :class="{
            active: category.id === activeCategoryId && !keyword.trim(),
          }"
          @click="selectCategory(category)"
        >
          <strong>
            <span>{{ category.icon }}</span>
            {{ text(category.name) }}
          </strong>
          <small>{{ text(category.desc) }}</small>
        </button>
      </aside>

      <section class="products-panel products-group-panel">
        <h2>{{ t('products.groupTitle') }}</h2>
        <p class="products-panel-title">{{ text(activeCategory?.name) }}</p>

        <button
          v-for="group in activeGroups"
          :key="group.id"
          type="button"
          class="products-group-card"
          :class="{
            active: group.id === activeGroupId && !keyword.trim(),
          }"
          @click="selectGroup(group)"
        >
          <strong>
            {{ text(group.name) }}
            <span>›</span>
          </strong>
          <small>{{ text(group.desc) }}</small>
        </button>
      </section>

      <section class="products-main">
        <div class="products-panel products-list-panel">
          <div class="products-list-head">
            <div>
              <h2>{{ t('products.productList') }}</h2>
              <p class="products-panel-title">
                {{ keyword.trim() ? t('products.searchResult') : text(activeGroup?.name) }}
              </p>
            </div>

            <span>{{ t('products.count', { count: visibleItems.length }) }}</span>
          </div>

          <div v-if="visibleItems.length" class="products-list">
            <button
              v-for="item in visibleItems"
              :key="item.id"
              type="button"
              class="products-item-card"
              :class="{
                active: item.id === selectedProduct?.id,
              }"
              @click="selectProduct(item)"
            >
              <div class="products-item-top">
                <div>
                  <strong>{{ text(item.model) }}</strong>
                  <!-- <p>{{ text(item.name) }}</p> -->
                </div>

                <span v-if="item.pdf">{{ t('products.pdf') }}</span>
              </div>

              <!-- <small>{{ text(item.desc) }}</small> -->

              <div class="products-tags">
                <em
                  v-for="tag in item.tags?.[locale] || item.tags?.['zh-TW'] || []"
                  :key="tag"
                >
                  {{ tag }}
                </em>
              </div>
            </button>
          </div>

          <div v-else class="products-empty">
            {{ t('products.empty') }}
          </div>
        </div>

        <aside
          v-if="selectedProduct"
          class="products-panel products-detail-panel"
        >
          <div class="products-detail-card">
            <p>{{ t('products.selected') }}</p>
            <h3>{{ text(selectedProduct.model) }}</h3>
            <strong>{{ text(selectedProduct.name) }}</strong>
            <small>{{ text(selectedProduct.desc) }}</small>
          </div>

          <dl class="products-info-list">
            <div>
              <dt>{{ t('products.categoryTitle') }}</dt>
              <dd>{{ text(selectedProduct.category?.name) }}</dd>
            </div>

            <div>
              <dt>{{ t('products.groupTitle') }}</dt>
              <dd>{{ text(selectedProduct.group?.name) }}</dd>
            </div>

            <div>
              <dt>{{ t('products.catalog') }}</dt>
              <dd>
                {{ selectedProduct.pdf ? t('products.available') : t('products.contactSales') }}
              </dd>
            </div>
          </dl>

          <div class="products-actions">
            <a
              class="products-download-btn"
              :class="{ disabled: !selectedProduct.pdf }"
              href="#"
            >
              {{ t('products.download') }}
            </a>

            <RouterLink class="products-ask-btn" to="/contact">
              {{ t('products.ask') }}
            </RouterLink>
          </div>
        </aside>
      </section>
    </section>
  </main>
</template>

<style scoped src="../assets/css/product.css"></style>
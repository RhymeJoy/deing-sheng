<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from '#app'
import { useI18n } from 'vue-i18n'

import { usePageSeo } from '~/composables/usePageSeo'
const { locale } = useI18n()
const route = useRoute()

usePageSeo()

function scrollToTopBeforeEnter() {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function normalizeLocale(value: unknown) {
  return value === 'en' || value === 'zh-TW'
    ? value
    : null
}

function detectInitialLocale() {
  const queryLocale = normalizeLocale(route.query.lang)

  if (queryLocale) return queryLocale

  const savedLocale = normalizeLocale(localStorage.getItem('lang'))

  if (savedLocale) return savedLocale

  const systemLocale = navigator.language.toLowerCase()

  if (systemLocale.includes('en')) return 'en'

  return 'zh-TW'
}

onMounted(() => {
  const initialLocale = detectInitialLocale()

  locale.value = initialLocale
  localStorage.setItem('lang', initialLocale)
  document.documentElement.lang = initialLocale
})

watch(locale, (value) => {
  document.documentElement.lang = value
  localStorage.setItem('lang', value)
})
</script>

<template>
  <div id="page-wrapper">
    <Navbar />

    <NuxtPage v-slot="{ Component, route: pageRoute }">
      <Transition
        name="page"
        mode="out-in"
        @before-enter="scrollToTopBeforeEnter"
      >
        <component
          :is="Component"
          :key="pageRoute.fullPath"
        />
      </Transition>
    </NuxtPage>

    <Footer />
  </div>
</template>

<style src="~/assets/css/leaflet.css"></style>

<style>
.page-enter-active,
.page-leave-active {
  transition:
    opacity .25s ease-out,
    transform .25s ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(18px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-18px);
}
</style>
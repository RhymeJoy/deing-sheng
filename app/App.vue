<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { navigateTo, useRoute } from '#imports'

import { usePageSeo } from '~/composables/usePageSeo'

const { locale } = useI18n()
const route = useRoute()

function htmlLocale(locale: string) {
  return locale === 'zh-TW' ? 'zh-TW' : locale === 'zh-CN' ? 'zh-CN' : 'en'
}

usePageSeo()

function scrollToTopBeforeEnter() {
  if (!import.meta.client) return

  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function ensureLocaleQuery() {
  if (!import.meta.client || route.query.lang !== undefined) return

  void navigateTo({
    path: route.path,
    query: {
      ...route.query,
      lang: locale.value,
    },
  }, { replace: true })
}

onMounted(() => {
  document.documentElement.lang = locale.value
  ensureLocaleQuery()
})

watch(
  () => route.query.lang,
  (lang) => {
    if (lang === undefined) {
      ensureLocaleQuery()
    }
  },
)

watch(locale, (value) => {
  if (!import.meta.client) return

  document.documentElement.lang = value
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
          :key="pageRoute.path"
        />
      </Transition>
    </NuxtPage>

    <Footer />
  </div>
</template>

<style src="~/assets/css/global.css"></style>
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

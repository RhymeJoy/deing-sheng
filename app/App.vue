<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from '#imports'

import { usePageSeo } from '~/composables/usePageSeo'

type LocaleCode = 'zh-TW' | 'en'

const { locale } = useI18n()
const route = useRoute()
const router = useRouter()

usePageSeo()

function normalizeLocale(value: unknown): LocaleCode | null {
  const candidate = Array.isArray(value) ? value[0] : value

  return candidate === 'en' || candidate === 'zh-TW'
    ? candidate
    : null
}

function localizedPath(path: string, localeCode: LocaleCode) {
  const cleanPath = path.replace(/^\/en(?=\/|$)/, '') || '/'

  if (localeCode === 'zh-TW') return cleanPath

  return cleanPath === '/'
    ? '/en'
    : `/en${cleanPath}`
}

function removeLegacyLocaleQuery() {
  if (!import.meta.client) return

  const legacyLocale = normalizeLocale(route.query.lang)

  if (!legacyLocale) return

  const query = {
    ...route.query,
  }

  delete query.lang

  void router.replace({
    path: localizedPath(route.path, legacyLocale),
    query,
    hash: route.hash,
  })
}

function scrollToTopBeforeEnter() {
  if (!import.meta.client) return

  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

onMounted(() => {
  document.documentElement.lang = locale.value
  removeLegacyLocaleQuery()
})

watch(locale, (value) => {
  if (!import.meta.client) return

  document.documentElement.lang = value
})

watch(() => route.fullPath, () => {
  removeLegacyLocaleQuery()
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
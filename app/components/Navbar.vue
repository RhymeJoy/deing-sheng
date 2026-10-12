<script setup lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  watch,
  ref,
  computed,
} from 'vue'

import { useI18n } from 'vue-i18n'
import {
  navigateTo,
  useLocalePath,
  useRoute,
} from '#imports'

type LocaleCode = 'zh-TW' | 'zh-CN' | 'en'
type ThemeMode = 'light' | 'dark' | 'system'
type RealTheme = 'light' | 'dark'

const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

function htmlLocale(locale: string) {
  return locale === 'zh-TW' ? 'zh-TW' : locale === 'zh-CN' ? 'zh-CN' : 'en'
}

defineOptions({
  name: 'SiteNavbar',
})

const currentLang = computed(() => locale.value)

const navLinks = computed(() => [
  { path: '/', label: t('nav.home') },
  { path: '/about', label: t('nav.about') },
  { path: '/goods', label: t('nav.goods') },
  { path: '/contact', label: t('nav.contact') },
])

const mobileMenuOpen = ref(false)
const mobileSettingsOpen = ref(false)
const desktopSettingsOpen = ref(false)
const TEXT_SCALE_KEY = 'site-text-scale'

function normalizeTextScale(value: string | null) {
  if (value === null) return 100

  const numeric = Number(value)

  if (!Number.isFinite(numeric)) return 100

  return Math.min(150, Math.max(75, Math.round(numeric)))
}

const savedTextScale = import.meta.client
  ? localStorage.getItem(TEXT_SCALE_KEY)
  : null

const textScale = ref(normalizeTextScale(savedTextScale))

function applyTextScale(value: number) {
  const nextScale = normalizeTextScale(String(value))

  textScale.value = nextScale

  if (!import.meta.client) return

  document.documentElement.style.setProperty('--site-font-scale', String(nextScale / 100))
  localStorage.setItem(TEXT_SCALE_KEY, String(nextScale))
}

function handleTextScaleInput(event: Event) {
  applyTextScale(Number((event.target as HTMLInputElement).value))
}

function withLang(path: string) {
  const rawLang = route.query.lang
  const lang = Array.isArray(rawLang) ? rawLang[0] : rawLang

  return lang ? { path: localePath(path), query: { lang } } : localePath(path)
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
  mobileSettingsOpen.value = false
}

function closeDesktopSettings() {
  desktopSettingsOpen.value = false
}

watch(mobileMenuOpen, (open) => {
  document.body.classList.toggle('navPanel-visible', open)

  if (!open) {
    mobileSettingsOpen.value = false
  }
})

watch(
  () => route.fullPath,
  () => {
    closeMobileMenu()
    closeDesktopSettings()
  }
)

let resizeHandler: (() => void) | null = null
let scrollHandler: (() => void) | null = null
let mediaHandler: (() => void) | null = null
let mediaQuery: MediaQueryList | null = null
let keydownHandler: ((event: KeyboardEvent) => void) | null = null

let lastScrollY = 0
let scrollTicking = false
let headerEl: Element | null = null

function eventTargetValue(event: Event) {
  return (event.target as HTMLSelectElement).value
}

function isLocaleCode(value: string): value is LocaleCode {
  return value === 'zh-TW' || value === 'zh-CN' || value === 'en'
}

function isThemeMode(value: string): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system'
}

function handleLangChange(event: Event) {
  const lang = eventTargetValue(event)

  if (isLocaleCode(lang)) {
    switchLang(lang)
  }
}

function handleThemeChange(event: Event) {
  const nextTheme = eventTargetValue(event)

  if (isThemeMode(nextTheme)) {
    theme.value = nextTheme
  }
}

function switchLang(lang: LocaleCode) {
  if (import.meta.client) {
    localStorage.setItem('site-language', lang)
  }

  void navigateTo({
    path: route.path,
    query: {
      ...route.query,
      lang,
    },
  }, { replace: true })

  closeDesktopSettings()
  closeMobileMenu()
}

const savedTheme = import.meta.client
  ? localStorage.getItem('theme-mode')
  : null

const theme = ref<ThemeMode>(isThemeMode(savedTheme || '') ? savedTheme as ThemeMode : 'system')
const realTheme = ref<RealTheme>('light')

function getSystemTheme(): RealTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(mode: ThemeMode) {
  const finalTheme: RealTheme = mode === 'system'
    ? getSystemTheme()
    : mode

  realTheme.value = finalTheme

  document.documentElement.setAttribute('data-theme', finalTheme)
  localStorage.setItem('theme-mode', mode)

  window.dispatchEvent(new Event('themechange'))
}

watch(theme, (value) => {
  applyTheme(value)
})

function updateHeaderVisibility() {
  if (!headerEl) return

  const mobileTitleEl = document.querySelector('#mobileTitle')

  const currentY = window.scrollY
  const delta = currentY - lastScrollY

  if (currentY < 10) {
    headerEl.classList.remove('nav-hidden')
    mobileTitleEl?.classList.remove('nav-hidden')
    lastScrollY = currentY
    return
  }

  if (delta > 8) {
    headerEl.classList.add('nav-hidden')
    mobileTitleEl?.classList.add('nav-hidden')
  } else if (delta < -8) {
    headerEl.classList.remove('nav-hidden')
    mobileTitleEl?.classList.remove('nav-hidden')
  }

  lastScrollY = currentY
}

onMounted(() => {
  document.documentElement.lang = locale.value
  applyTextScale(textScale.value)

  applyTheme(theme.value)

  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  mediaHandler = () => {
    if (theme.value === 'system') {
      applyTheme('system')
    }
  }

  mediaQuery.addEventListener('change', mediaHandler)

  resizeHandler = () => {
    updateHeaderVisibility()
  }

  window.addEventListener('resize', resizeHandler)

  keydownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeDesktopSettings()
      closeMobileMenu()
    }
  }

  window.addEventListener('keydown', keydownHandler)

  headerEl = document.querySelector('#header')
  lastScrollY = window.scrollY

  scrollHandler = () => {
    if (scrollTicking) return

    scrollTicking = true

    requestAnimationFrame(() => {
      updateHeaderVisibility()
      scrollTicking = false
    })
  }

  window.addEventListener('scroll', scrollHandler, {
    passive: true,
  })
})

onBeforeUnmount(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }

  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
    scrollHandler = null
  }

  if (keydownHandler) {
    window.removeEventListener('keydown', keydownHandler)
    keydownHandler = null
  }

  if (mediaQuery && mediaHandler) {
    mediaQuery.removeEventListener('change', mediaHandler)
    mediaQuery = null
    mediaHandler = null
  }

  document.body.classList.remove('navPanel-visible')
  headerEl = null
})
</script>

<template>
  <section id="header">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 id="logo">
            {{ t('company.name') }}
          </h1>

          <nav id="nav">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="withLang(link.path)"
            >
              {{ link.label }}
            </NuxtLink>

            <div id="nav-tools">
              <button
                class="desktop-settings-btn"
                type="button"
                :aria-expanded="desktopSettingsOpen"
                aria-controls="desktopSettingsDialog"
                @click="desktopSettingsOpen = true"
              >
                <span class="desktop-settings-icon">⚙</span>

                <span>
                  {{ t('settings.button') }}
                </span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </section>

  <Transition name="settings-fade">
    <button
      v-if="desktopSettingsOpen"
      class="settings-dialog-backdrop"
      type="button"
      :aria-label="t('settings.close')"
      @click="closeDesktopSettings"
    ></button>
  </Transition>

  <Transition name="settings-pop">
    <div
      v-if="desktopSettingsOpen"
      id="desktopSettingsDialog"
      class="settings-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div class="settings-dialog-header">
        <h2>
          {{ t('settings.title') }}
        </h2>

        <button
          class="settings-dialog-close"
          type="button"
          :aria-label="t('settings.close')"
          @click="closeDesktopSettings"
        >
          ⨉
        </button>
      </div>

      <div class="settings-dialog-body">
        <div class="setting-row">
          <label for="desktopLangSelect">
            {{ t('settings.language') }}
          </label>

          <select
            id="desktopLangSelect"
            :value="currentLang"
            @change="handleLangChange"
          >
            <option value="zh-TW">
              繁體中文
            </option>

            <option value="zh-CN">
              简体中文
            </option>

            <option value="en">
              English
            </option>
          </select>
        </div>

        <div class="setting-row">
          <label for="desktopThemeSelect">
            {{ t('settings.theme') }}
          </label>

          <select
            id="desktopThemeSelect"
            :value="theme"
            @change="handleThemeChange"
          >
            <option value="light">
              {{ t('settings.light') }}
            </option>

            <option value="dark">
              {{ t('settings.dark') }}
            </option>

            <option value="system">
              {{ t('settings.system') }}
            </option>
          </select>
        </div>
        <div class="setting-row">
          <label for="desktopTextScale">
            {{ t('settings.textSize') }}
          </label>

          <div class="text-scale-control">
            <input
              id="desktopTextScale"
              type="range"
              min="75"
              max="150"
              step="1"
              :value="textScale"
              :aria-valuenow="textScale"
              @input="handleTextScaleInput"
            />

            <output class="text-scale-value" for="desktopTextScale">
              {{ textScale }}%
            </output>
          </div>
        </div>

      </div>
    </div>
  </Transition>

  <button
    id="mobileHamburger"
    type="button"
    :class="{ open: mobileMenuOpen }"
    :aria-expanded="mobileMenuOpen"
    aria-controls="navPanel"
    @click="mobileMenuOpen = !mobileMenuOpen"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

  <div id="mobileTitle">
    {{ t('company.name') }}
  </div>

  <div id="navPanel">
    <div class="nav-panel-topbar">
      <button
        class="nav-settings-btn"
        type="button"
        :aria-label="t('settings.button')"
        :title="t('settings.button')"
        :class="{ active: mobileSettingsOpen }"
        @click="mobileSettingsOpen = !mobileSettingsOpen"
      >
        <span class="nav-settings-icon">⚙</span>

        <span class="nav-settings-text">
          {{ t('settings.button') }}
        </span>
      </button>
    </div>

    <Transition name="mobile-settings">
      <div
        v-if="mobileSettingsOpen"
        class="mobile-nav-tools"
      >
        <div class="mobile-setting-group">
          <label>
            {{ t('settings.language') }}
          </label>

          <select
            :value="currentLang"
            @change="handleLangChange"
          >
            <option value="zh-TW">
              繁體中文
            </option>

            <option value="zh-CN">
              简体中文
            </option>

            <option value="en">
              English
            </option>
          </select>
        </div>

        <div class="mobile-setting-group">
          <label>
            {{ t('settings.theme') }}
          </label>

          <select
            :value="theme"
            @change="handleThemeChange"
          >
            <option value="light">
              {{ t('settings.light') }}
            </option>

            <option value="dark">
              {{ t('settings.dark') }}
            </option>

            <option value="system">
              {{ t('settings.system') }}
            </option>
          </select>
        </div>
        <div class="mobile-setting-group">
          <label for="mobileTextScale">
            {{ t('settings.textSize') }}
          </label>

          <div class="text-scale-control">
            <input
              id="mobileTextScale"
              type="range"
              min="75"
              max="150"
              step="1"
              :value="textScale"
              :aria-valuenow="textScale"
              @input="handleTextScaleInput"
            />

            <output class="text-scale-value" for="mobileTextScale">
              {{ textScale }}%
            </output>
          </div>
        </div>

      </div>
    </Transition>

    <nav>
      <NuxtLink
        v-for="link in navLinks"
        :key="`mobile-${link.path}`"
        class="link"
        :to="withLang(link.path)"
        @click="closeMobileMenu"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </div>

  <button
    v-if="mobileMenuOpen"
    class="nav-panel-backdrop"
    type="button"
    :aria-label="t('settings.closeMenu')"
    @click="closeMobileMenu"
  ></button>
</template>

<style scoped src="~/assets/css/navbar.css"></style>

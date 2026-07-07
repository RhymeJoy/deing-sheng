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
  useSwitchLocalePath,
} from '#imports'

type LocaleCode = 'zh-TW' | 'en'
type ThemeMode = 'light' | 'dark' | 'system'
type RealTheme = 'light' | 'dark'

const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

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

function withLang(path: string) {
  return localePath(path)
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
  return value === 'zh-TW' || value === 'en'
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
  const nextPath = switchLocalePath(lang)

  if (nextPath) {
    void navigateTo(nextPath)
  }

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
                  {{
                    currentLang === 'zh-TW'
                      ? '設定'
                      : 'Settings'
                  }}
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
      aria-label="Close settings"
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
          {{
            currentLang === 'zh-TW'
              ? '網站設定'
              : 'Website Settings'
          }}
        </h2>

        <button
          class="settings-dialog-close"
          type="button"
          aria-label="Close settings"
          @click="closeDesktopSettings"
        >
          ⨉
        </button>
      </div>

      <div class="settings-dialog-body">
        <div class="setting-row">
          <label for="desktopLangSelect">
            {{
              currentLang === 'zh-TW'
                ? '語言'
                : 'Language'
            }}
          </label>

          <select
            id="desktopLangSelect"
            :value="currentLang"
            @change="handleLangChange"
          >
            <option value="zh-TW">
              繁體中文
            </option>

            <option value="en">
              English
            </option>
          </select>
        </div>

        <div class="setting-row">
          <label for="desktopThemeSelect">
            {{
              currentLang === 'zh-TW'
                ? '主題'
                : 'Theme'
            }}
          </label>

          <select
            id="desktopThemeSelect"
            :value="theme"
            @change="handleThemeChange"
          >
            <option value="light">
              {{
                currentLang === 'zh-TW'
                  ? '淺色'
                  : 'Light'
              }}
            </option>

            <option value="dark">
              {{
                currentLang === 'zh-TW'
                  ? '深色'
                  : 'Dark'
              }}
            </option>

            <option value="system">
              {{
                currentLang === 'zh-TW'
                  ? '跟隨系統'
                  : 'System'
              }}
            </option>
          </select>
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
        :aria-label="currentLang === 'zh-TW' ? '設定' : 'Settings'"
        :title="currentLang === 'zh-TW' ? '設定' : 'Settings'"
        :class="{ active: mobileSettingsOpen }"
        @click="mobileSettingsOpen = !mobileSettingsOpen"
      >
        <span class="nav-settings-icon">⚙</span>

        <span class="nav-settings-text">
          {{
            currentLang === 'zh-TW'
              ? '設定'
              : 'Settings'
          }}
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
            {{
              currentLang === 'zh-TW'
                ? '語言'
                : 'Language'
            }}
          </label>

          <select
            :value="currentLang"
            @change="handleLangChange"
          >
            <option value="zh-TW">
              繁體中文
            </option>

            <option value="en">
              English
            </option>
          </select>
        </div>

        <div class="mobile-setting-group">
          <label>
            {{
              currentLang === 'zh-TW'
                ? '主題'
                : 'Theme'
            }}
          </label>

          <select
            :value="theme"
            @change="handleThemeChange"
          >
            <option value="light">
              {{
                currentLang === 'zh-TW'
                  ? '淺色'
                  : 'Light'
              }}
            </option>

            <option value="dark">
              {{
                currentLang === 'zh-TW'
                  ? '深色'
                  : 'Dark'
              }}
            </option>

            <option value="system">
              {{
                currentLang === 'zh-TW'
                  ? '跟隨系統'
                  : 'System'
              }}
            </option>
          </select>
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
    aria-label="Close menu"
    @click="closeMobileMenu"
  ></button>
</template>

<style scoped src="~/assets/css/navbar.css"></style>

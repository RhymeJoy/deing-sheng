<script setup>
import {
  onMounted,
  onBeforeUnmount,
  watch,
  ref,
  computed,
} from 'vue'

import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t, locale } = useI18n()
const route = useRoute()

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

function withLang(path) {
  return {
    path,
    query: {
      lang: currentLang.value,
    },
  }
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

let resizeHandler = null
let scrollHandler = null
let mediaHandler = null
let mediaQuery = null
let keydownHandler = null

let lastScrollY = 0
let scrollTicking = false
let headerEl = null

function switchLang(lang) {
  locale.value = lang
  localStorage.setItem('lang', lang)

  const url = new URL(window.location)
  url.searchParams.set('lang', lang)
  window.history.replaceState({}, '', url)

  document.documentElement.lang = lang
}

const theme = ref(localStorage.getItem('theme-mode') || 'system')
const realTheme = ref('light')

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(mode) {
  let finalTheme = mode

  if (mode === 'system') {
    finalTheme = getSystemTheme()
  }

  realTheme.value = finalTheme

  document.documentElement.setAttribute('data-theme', finalTheme)
  localStorage.setItem('theme-mode', mode)

  window.dispatchEvent(new Event('themechange'))
}

watch(theme, (v) => {
  applyTheme(v)
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

  keydownHandler = (event) => {
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
            <RouterLink
              v-for="link in navLinks"
              :key="link.path"
              :to="withLang(link.path)"
            >
              {{ link.label }}
            </RouterLink>

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
            @change="switchLang($event.target.value)"
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
            @change="theme = $event.target.value"
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
            @change="switchLang($event.target.value)"
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
            @change="theme = $event.target.value"
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
      <RouterLink
        v-for="link in navLinks"
        :key="`mobile-${link.path}`"
        class="link"
        :to="withLang(link.path)"
        @click="closeMobileMenu"
      >
        {{ link.label }}
      </RouterLink>
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

<style scoped src="../../src/assets/css/navbar.css"></style>

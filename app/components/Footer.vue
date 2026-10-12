<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { navigateTo, useLocalePath, useRoute } from '#imports'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

defineOptions({
  name: 'SiteFooter',
})

const startYear = 2026
const currentYear = new Date().getFullYear()

const copyrightYear = computed(() => {
  return currentYear > startYear
    ? `${startYear} - ${currentYear}`
    : `${startYear}`
})

function withLanguage(path: string) {
  const rawLang = route.query.lang
  const lang = Array.isArray(rawLang) ? rawLang[0] : rawLang

  return lang ? { path: localePath(path), query: { lang } } : localePath(path)
}

const phoneHref = computed(() => {
  return `tel:${t('footer.phone').replace(/[^0-9+]/g, '')}`
})

const languageOptions = [
  { code: 'zh-TW', labelKey: 'footer.traditional' },
  { code: 'zh-CN', labelKey: 'footer.simplified' },
  { code: 'en', labelKey: 'footer.english' },
] as const

async function switchLanguage(code: typeof languageOptions[number]['code']) {
  if (import.meta.client) {
    localStorage.setItem('site-language', code)
  }

  await navigateTo({
    path: route.path,
    query: {
      ...route.query,
      lang: code,
    },
  }, { replace: true })
}
</script>

<template>
  <footer class="site-footer">
    <div class="footer-glow"></div>

    <div class="footer-inner">
      <section class="footer-brand">
        <p class="footer-kicker">
          {{ t('footer.kicker') }}
        </p>

        <h2>
          {{ t('footer.companyname') }}
        </h2>

        <p class="footer-desc">
          {{ t('footer.desc') }}
        </p>
      </section>

      <nav class="footer-nav">
        <h3>
          {{ t('footer.navigation') }}
        </h3>

        <NuxtLink :to="withLanguage('/')">
          {{ t('nav.home') }}
        </NuxtLink>

        <NuxtLink :to="withLanguage('/about')">
          {{ t('nav.about') }}
        </NuxtLink>

        <NuxtLink :to="withLanguage('/goods')">
          {{ t('nav.goods') }}
        </NuxtLink>

        <NuxtLink :to="withLanguage('/contact')">
          {{ t('nav.contact') }}
        </NuxtLink>
      </nav>

      <section class="footer-contact">
        <h3>
          {{ t('footer.contact') }}
        </h3>

        <a :href="phoneHref">
          TEL：{{ t('footer.phone') }}
        </a>

        <a style="pointer-events: none;">
          FAX：{{ t('footer.fax') }}
        </a>

        <a style="pointer-events: none;">
          {{ t('footer.address') }}
        </a>

        <section class="footer-language" aria-labelledby="footer-language-title">
          <h3 id="footer-language-title">
            {{ t('footer.language') }}
          </h3>

          <div class="footer-language-buttons" role="group" :aria-label="t('footer.language')">
            <button
              v-for="language in languageOptions"
              :key="language.code"
              class="footer-language-button"
              :class="{ active: locale === language.code }"
              type="button"
              :aria-pressed="locale === language.code"
              @click="switchLanguage(language.code)"
            >
              {{ t(language.labelKey) }}
            </button>
          </div>
        </section>
      </section>
    </div>

    <div class="footer-bottom">
      <p>
        &copy; {{ copyrightYear }} {{ t('company.name') }} · {{ t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>

<style src="~/assets/css/footer.css"></style>

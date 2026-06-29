<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineOptions({
  name: 'SiteFooter',
})

const startYear = 2026
const currentYear = new Date().getFullYear()

const copyrightYear = computed(() => {
  return currentYear > startYear
    ? `${startYear}-${currentYear}`
    : `${startYear}`
})

const phoneHref = computed(() => {
  return `tel:${t('footer.phone').replace(/[^0-9+]/g, '')}`
})
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
          {{ t('company.name') }}
        </h2>

        <p class="footer-desc">
          {{ t('footer.desc') }}
        </p>
      </section>

      <nav class="footer-nav">
        <h3>
          {{ t('footer.navigation') }}
        </h3>

        <RouterLink to="/">
          {{ t('nav.home') }}
        </RouterLink>

        <RouterLink to="/about">
          {{ t('nav.about') }}
        </RouterLink>

        <RouterLink to="/goods">
          {{ t('nav.goods') }}
        </RouterLink>

        <RouterLink to="/contact">
          {{ t('nav.contact') }}
        </RouterLink>
      </nav>

      <section class="footer-contact">
        <h3>
          {{ t('footer.contact') }}
        </h3>

        <a :href="phoneHref">
          TEL｜{{ t('footer.phone') }}
        </a>

        <a style="pointer-events: none;">
          FAX｜{{ t('footer.fax') }}
        </a>

        <a style="pointer-events: none;">
          {{ t('footer.address') }}
        </a>
      </section>
    </div>

    <div class="footer-bottom">
      <p>
        &copy; {{ copyrightYear }} {{ t('company.name') }} · {{ t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>

<style src="../assets/css/footer.css"></style>

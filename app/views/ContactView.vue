<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const companyEmail = 'ds0978088119@gmail.com'

const mapUrl =
  'https://www.google.com/maps/search/?api=1&query=%E5%8F%B0%E4%B8%AD%E5%B8%82%E8%B1%90%E5%8E%9F%E5%8D%80%E7%A4%BE%E7%9A%AE%E8%B7%AF293%E5%B7%B733%E8%99%9F'

const form = reactive({
  company: '',
  name: '',
  country: '',
  email: '',
  address: '',
  tel: '',
  fax: '',
  category: '',
  subject: '',
  message: '',
  website: '',
})

function cleanInput(value) {
  return String(value)
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/data:/gi, '')
    .trim()
}

function submitForm() {
  if (form.website) {
    return
  }

  const cleaned = {}

  Object.keys(form).forEach((key) => {
    cleaned[key] = cleanInput(form[key])
  })

  const subject =
    cleaned.subject ||
    t('contact.defaultMailSubject')

  const body = [
    `${t('contact.company')}: ${cleaned.company}`,
    `${t('contact.name')}: ${cleaned.name}`,
    `${t('contact.country')}: ${cleaned.country}`,
    `${t('contact.email')}: ${cleaned.email}`,
    `${t('contact.address')}: ${cleaned.address}`,
    `${t('contact.tel')}: ${cleaned.tel}`,
    `${t('contact.fax')}: ${cleaned.fax}`,
    `${t('contact.category')}: ${cleaned.category}`,
    '',
    `${t('contact.message')}:`,
    cleaned.message,
  ].join('\n')

  window.location.href =
    `mailto:${companyEmail}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
}
</script>

<template>
  <main class="contact-page">
    <section class="contact-hero">
      <h1>{{ t('contact.title') }}</h1>
      <p>{{ t('contact.desc') }}</p>
    </section>

    <section class="contact-layout">
      <form class="contact-form" @submit.prevent="submitForm">
        <h2>{{ t('contact.formTitle') }}</h2>

        <input
          v-model="form.website"
          class="contact-honeypot"
          type="text"
          name="website"
          tabindex="-1"
          autocomplete="off"
        />

        <div class="form-grid">
          <label>
            {{ t('contact.company') }}
            <input v-model="form.company" type="text" name="company" maxlength="80" />
          </label>

          <label>
            {{ t('contact.name') }}
            <input v-model="form.name" type="text" name="name" maxlength="60" required />
          </label>

          <label>
            {{ t('contact.country') }}
            <input v-model="form.country" type="text" name="country" maxlength="30" />
          </label>

          <label>
            {{ t('contact.email') }}
            <input v-model="form.email" type="email" name="email" maxlength="50" required />
          </label>

          <label>
            {{ t('contact.address') }}
            <input v-model="form.address" type="text" name="address" maxlength="200" />
          </label>

          <label>
            {{ t('contact.tel') }}
            <input v-model="form.tel" type="tel" name="tel" maxlength="40" />
          </label>

          <label>
            {{ t('contact.fax') }}
            <input v-model="form.fax" type="text" name="fax" maxlength="40" />
          </label>

          <label>
            {{ t('contact.category') }}
            <select v-model="form.category" name="category" required>
              <option value="">{{ t('contact.categoryPlaceholder') }}</option>
              <option value="product">{{ t('contact.categoryProduct') }}</option>
              <option value="cooperation">{{ t('contact.categoryCooperation') }}</option>
              <option value="technical">{{ t('contact.categoryTechnical') }}</option>
              <option value="security">{{ t('contact.categorySecurity') }}</option>
              <option value="other">{{ t('contact.categoryOther') }}</option>
            </select>
          </label>

          <label class="full">
            {{ t('contact.subject') }}
            <input v-model="form.subject" type="text" name="subject" maxlength="120" required />
          </label>
        </div>

        <label class="full">
          {{ t('contact.message') }}
          <textarea
            v-model="form.message"
            name="message"
            rows="7"
            maxlength="1000"
            required
          ></textarea>
        </label>

        <p class="form-note">
          {{ t('contact.securityNote') }}
        </p>

        <button type="submit">
          {{ t('contact.submit') }}
        </button>
      </form>

      <aside class="contact-info">
        <h2>{{ t('contact.infoTitle') }}</h2>

        <div class="info-card">
          <h3>{{ t('contact.infoEmail') }}</h3>

          <a :href="`mailto:${companyEmail}`">
            {{ companyEmail }}
          </a>
        </div>

        <div class="info-card">
          <h3>{{ t('contact.infoTel') }}</h3>

          <a :href="`tel:${t('contact.info.tel').replace(/[^\d+]/g, '')}`">
            {{ t('contact.info.tel') }}
          </a>
        </div>

        <div class="info-card">
          <h3>{{ t('contact.infoFax') }}</h3>

          <p>{{ t('contact.info.fax') }}</p>
        </div>

        <div class="info-card">
          <h3>{{ t('contact.infoAddress') }}</h3>

          <a
            :href="mapUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ t('contact.info.address') }}
          </a>
        </div>
      </aside>
    </section>
  </main>
</template>

<style src="../assets/css/contact.css"></style>
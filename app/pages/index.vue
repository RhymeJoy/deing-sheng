<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalePath, usePublicAsset } from '#imports'

const { t } = useI18n()
const localePath = useLocalePath()
const publicAsset = usePublicAsset()
</script>

<template>
  <main>

    <!-- Banner -->
    <section id="banner">
      <div class="container">
        <div class="row">

          <div class="col-6 col-12-medium">
            <p>
              {{ t('home.banner') }}
            </p>

            <NuxtLink :to="localePath('/contact')" class="button-large">
              {{ t('home.contact') }}
            </NuxtLink>
          </div>

          <div class="col-6 col-12-medium imp-medium">
            <a href="#" class="bordered-feature-image">
              <img :src="publicAsset('/img/banner.jpg')" alt="鼎盛企業形象圖" />
            </a>
          </div>

        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features">
      <div class="container">
        <div class="row">

          <div class="col-3 col-6-medium col-12-small">
            <section>

              <a href="#" class="bordered-feature-image">
                <img :src="publicAsset('/img/pic01.jpg')" alt="" />
              </a>

              <h2>
                {{ t('home.materials') }}
              </h2>

              <p>
                {{ t('home.materialsDesc') }}
              </p>

            </section>
          </div>

          <div class="col-3 col-6-medium col-12-small">
            <section>

              <a href="#" class="bordered-feature-image">
                <img :src="publicAsset('/img/pic02.jpg')" alt="" />
              </a>

              <h2>
                {{ t('home.support') }}
              </h2>

              <p>
                {{ t('home.supportDesc') }}
              </p>

            </section>
          </div>

          <div class="col-3 col-6-medium col-12-small">
            <section>

              <a href="#" class="bordered-feature-image">
                <img :src="publicAsset('/img/pic03.jpg')" alt="" />
              </a>

              <h2>
                {{ t('home.supply') }}
              </h2>

              <p>
                {{ t('home.supplyDesc') }}
              </p>

            </section>
          </div>

          <div class="col-3 col-6-medium col-12-small">
            <section>

              <a href="#" class="bordered-feature-image">
                <img :src="publicAsset('/img/pic04.jpg')" alt="" />
              </a>

              <h2>
                {{ t('home.custom') }}
              </h2>

              <p>
                {{ t('home.customDesc') }}
              </p>

            </section>
          </div>

        </div>
      </div>
    </section>

    <!-- Content -->
    <section id="content">
      <div class="container">
        <div class="row aln-center">

          <div class="col-4 col-12-medium">
            <section>

              <header>
                <h2>
                  {{ t('home.aboutTitle') }}
                </h2>

                <h3>
                  {{ t('home.aboutSub') }}
                </h3>
              </header>

              <a href="#" class="feature-image">
                <img :src="publicAsset('/img/pic05.jpg')" alt="" />
              </a>

              <p>
                {{ t('home.aboutDesc') }}
              </p>

            </section>
          </div>

          <div class="col-4 col-6-medium col-12-small">
            <section>

              <header>
                <h2>
                  {{ t('home.serviceTitle') }}
                </h2>

                <h3>
                  {{ t('home.serviceSub') }}
                </h3>
              </header>

              <ul class="check-list">
                <li>{{ t('home.service1') }}</li>
                <li>{{ t('home.service2') }}</li>
                <li>{{ t('home.service3') }}</li>
                <li>{{ t('home.service4') }}</li>
                <li>{{ t('home.service5') }}</li>
              </ul>

            </section>
          </div>

          <div class="col-4 col-6-medium col-12-small">
            <section>

              <header>
                <h2>
                  {{ t('home.contactTitle') }}
                </h2>

                <h3>
                  {{ t('home.contactSub') }}
                </h3>
              </header>

              <ul class="quote-list">

                <li>
                  <p>
                    {{ t('home.phone') }}：{{ t('home.phonenumber') }}
                  </p>

                  <span>
                    {{ t('home.phoneDesc') }}
                  </span>
                </li>

                <li>
                  <p>
                    {{ t('home.fax') }}：{{ t('home.faxnumber') }}
                  </p>

                  <span>
                    {{ t('home.faxDesc') }}
                  </span>
                </li>

                <li>
                  <p>
                    Email：ds0978088119@gmail.com
                  </p>

                  <span>
                    {{ t('home.emailDesc') }}
                  </span>
                </li>

              </ul>

            </section>
          </div>

        </div>
      </div>
    </section>

  </main>
</template>

<style src="~/assets/css/main.css"></style>
<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

function scrollToTopBeforeEnter() {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}
</script>

<template>
  <div id="page-wrapper">

    <Navbar />

    <RouterView v-slot="{ Component, route }">

      <Transition
        name="page"
        mode="out-in"
        @before-enter="scrollToTopBeforeEnter"
      >

        <component
          :is="Component"
          :key="route.fullPath"
        />

      </Transition>

    </RouterView>

    <Footer />

  </div>
</template>

<style src="./assets/css/leaflet.css"></style>

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
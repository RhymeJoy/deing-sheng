import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../i18n'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import GoodsView from '../views/GoodsView.vue'
import ContactView from '../views/ContactView.vue'
import ItemView from '../views/ItemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: HomeView,
      meta: {
        titleKey: 'title.home'
      }
    },
    {
      path: '/about',
      component: AboutView,
      meta: {
        titleKey: 'title.about'
      }
    },
    {
      path: '/goods',
      component: GoodsView,
      meta: {
        titleKey: 'title.goods'
      }
    },
    {
      path: '/goods/:id',
      component: ItemView,
      name: 'item',
      
      meta: {
        titleKey: 'title.item',
      },
    },
    {
      path: '/contact',
      component: ContactView,
      meta: {
        titleKey: 'title.contact'
      }
    }
  ],
})

router.afterEach((to) => {
  const t = i18n.global.t

  document.title = `${t(to.meta.titleKey || 'title.home')} | ${t('company.name')}`
})

export default router
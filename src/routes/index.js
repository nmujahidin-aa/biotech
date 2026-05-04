import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/presentation/pages/students/HomePage.vue'
import NewsPage from '@/presentation/pages/students/NewsPage.vue'
import MaterialPage from '@/presentation/pages/students/MaterialPage.vue'
import WorksheetPage from '@/presentation/pages/students/WorksheetPage.vue'
import PosterPage from '@/presentation/pages/publish/PosterPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      layout: 'MainLayout',
    },
  },
  {
    path: '/news',
    name: 'news',
    component: NewsPage,
  },
  {
    path: '/material',
    name: 'material',
    component: MaterialPage,
  },
  {
    path: '/worksheet',
    name: 'worksheet',
    component: WorksheetPage,
  },

  // ===== PUBLISH =====
  {
    path: '/poster',
    name: 'poster',
    component: PosterPage,
    meta: {
      layout: 'PublishLayout',
    },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

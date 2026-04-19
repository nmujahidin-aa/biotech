import { createMemoryHistory, createRouter } from 'vue-router'
import HomePage from '@/presentation/pages/students/HomePage.vue'
import NewsPage from '@/presentation/pages/students/NewsPage.vue'
import DetailNewsPage from '@/presentation/pages/students/DetailNewsPage.vue'
import MaterialPage from '@/presentation/pages/students/MaterialPage.vue'
import WorksheetPage from '@/presentation/pages/students/WorksheetPage.vue'

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
    path: '/detail-news',
    name: 'detail-news',
    component: DetailNewsPage,
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
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

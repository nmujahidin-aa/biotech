import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/presentation/pages/students/HomePage.vue'
import NewsPage from '@/presentation/pages/students/NewsPage.vue'
import MaterialPage from '@/presentation/pages/students/MaterialPage.vue'
import WorksheetPage from '@/presentation/pages/students/WorksheetPage.vue'
import AdminPage from '@/presentation/pages/admin/AdminPage.vue'

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

  // ===== ADMIN =====
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
    meta: {
      layout: 'AdminLayout',
    },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

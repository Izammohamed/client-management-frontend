import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import ClientManagement from '../views/AdminSide/ClientManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: '/clients',
      children: [
        {
          path: 'clients',
          name: 'clients',
          component: ClientManagement
        },
        {
          path: 'reports',
          name: 'reports',
          component: () => import('../views/AdminSide/ReportsManagement.vue')
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/AdminSide/ReportsManagement.vue') // Placeholder
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/AdminSide/ReportsManagement.vue') // Placeholder
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/AdminSide/ReportsManagement.vue') // Placeholder
        }
      ]
    }
  ]
})

export default router

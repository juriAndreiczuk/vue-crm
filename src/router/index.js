import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { 
      layout: 'main-layout',
      sidebar: true,
      auth: true
     },
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'auth-layout', sidebar: false },
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'auth-layout', sidebar: false },
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { 
      layout: 'main-layout',
      sidebar: true,
      auth: true
     },
    component: () => import('@/views/CategoriesView.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: { 
      layout: 'main-layout',
      sidebar: true,
      auth: true
     },
    component: import('@/views/RecordView.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { 
      layout: 'main-layout',
      sidebar: false,
      auth: true
     },
    component: import('@/views/DetailView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { 
      layout: 'main-layout',
      sidebar: true,
      auth: true
     },
    component: import('@/views/ProfileView.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { 
      layout: 'main-layout',
      sidebar: true,
      auth: true
     },
    component: import('@/views/PlanningView.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: { 
      layout: 'main-layout',
      sidebar: true,
      auth: true
     },
    component: import('@/views/HistoryView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const auth = getAuth()
  if(to.meta.auth && !auth.currentUser) {
    next('/login?=login')
  } 
  next()
})

export default router

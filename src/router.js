import { createRouter, createWebHistory } from 'vue-router'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import DashboardPage from './views/DashboardPage.vue'

const routes = [
  { path: '/', redirect: '/signin' },
  { path: '/signin', component: SignIn },
  { path: '/signup', component: SignUp },
  { path: '/dashboard', component: DashboardPage, 
    meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/signin')
  } else {
    next()
  }
})

export default router
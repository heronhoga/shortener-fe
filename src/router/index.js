import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import LinkIndex from '@/views/shortlink/LinkIndex.vue'
import { getToken } from '@/utils/token'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/links',
      name: 'links',
      component: LinkIndex,
      meta: { requiresAuth:true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuth = !!getToken()

  if (to.meta.requiresAuth && !isAuth) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }

  next()
})

export default router

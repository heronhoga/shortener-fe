import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Links from '@/views/shortlink/Links.vue'
import Profile from '@/views/profile/Profile.vue'
import api from '@/api'

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
      component: Links,
      meta: { requiresAuth:true }
    }, {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth:true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next()
  }

  try {
    await api.get('/users/me')
    next()
  } catch (err) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  }
})

export default router

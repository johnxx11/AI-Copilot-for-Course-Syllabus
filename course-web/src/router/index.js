import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)
export const constantRoutes = [{
  path: '/',
  name: 'home',
  redirect: '/dashboard',
  component: Layout,
  children: [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { title: 'User Login' }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register'),
    meta: { title: 'User Sign Up' }
  }, {
    path: '/upload',
    name: 'upload',
    component: () => import('@/views/upload'),
    meta: { title: 'Upload' }
  }, {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard'),
    meta: { title: 'My Dashboard' }
  }]
}]

export const asyncRoutes = []

const createRouter = () => new Router({
  mode: 'history', // require service support
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  asyncRoutes.length = 0
  router.matcher = newRouter.matcher // reset router
}

export default router

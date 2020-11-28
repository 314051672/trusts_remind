/*
 * @Author: tian.gao
 * @Date: 2020-11-24 10:36:10
 * @LastEditors: tian.gao
 * @LastEditTime: 2020-11-25 16:09:35
 * @Description:
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  },
  {
    path: '/trusts',
    name: 'trusts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Trusts.vue')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/' && !window.sessionStorage.getItem('token')) {
    next({ path: '/' })
  } else if (to.fullPath === '/' && window.sessionStorage.getItem('token')) {
    next({ path: '/trusts' })
  }
  next()
})
export default router

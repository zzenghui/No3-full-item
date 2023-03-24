import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },
  {
    path: "/",
    name: "layout",
    component: () => import('../views/Layout.vue'),
    redirect: '/account',
    meta: { isAuth: true },
    children: [
      {
        path: '/account',
        name: 'account',
        component: () => import('../pages/Account.vue')
      },
      {
        path: '/character',
        name: "character",
        component: () => import('../pages/Character.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('../pages/Orders.vue')
      },
      {
        path: "/store",
        name: 'store',
        component: () => import('../pages/store.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

//路由守卫   判断登录
router.beforeEach((to, from, next) => {
  console.log(to);
  let token = localStorage.getItem('token')
  if (!to.meta.isAuth) {
    next()
  } else {
    if (token) {
      next()
    } else {
      next('/login')
    }
  }

})

export default router

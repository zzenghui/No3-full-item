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
    path: '/student',
    name: 'student',
    component: () => import('../views/Student.vue')
  },
  {
    path: "/",
    name: "layout",
    component: () => import('../views/Layout.vue'),
    redirect: '/index',
    meta: { isAuth: true },
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../pages/Index.vue')
      },
      {
        path: '/teacher',
        name: 'teacher',
        component: () => import('../pages/Teacher.vue')
      },
      {
        path: '/bedroom',
        name: 'bedroom',
        component: () => import('../pages/myBedroom.vue')
      },
      {
        path: '/mystudent',
        name: "mystudent",
        component: () => import('../pages/myStudent.vue')
      },
      {
        path: '/myclass',
        name: 'myclass',
        component: () => import('../pages/myClass.vue')
      },
      {
        path: "/checkgather",
        name: 'checkgather',
        component: () => import('../pages/checkGather.vue')
      },
      {
        path: "/checkinfo",
        name: 'checkinfo',
        component: () => import('../pages/checkInfo.vue')
      },
      {
        path: "/affairs",
        name: 'affairs',
        component: () => import('../pages/affairs.vue')
      },
      {
        path: "/checkAffairs",
        name: 'checkAffairs',
        component: () => import('../pages/checkAffairs.vue')
      },
      {
        path: "/practice",
        name: 'practice',
        component: () => import('../pages/practice.vue')
      },
      {
        path: "/practice",
        name: 'practice',
        component: () => import('../pages/practice.vue')
      },
      {
        path: "/system",
        name: 'system',
        component: () => import('../pages/system.vue')
      },
      {
        path: "/supervisory",
        name: 'supervisory',
        component: () => import('../pages/supervisory.vue')
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

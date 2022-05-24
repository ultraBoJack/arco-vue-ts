import { PageEnum } from '@/enums/pageEnum'
import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { RedirectRoute } from './base'
import { Layout } from './constant'
import { createRouterGuard } from './guard'

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
}

export const DashboardRoute: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Layout,
  meta: {
    title: '首页',
  },
  children: [
    {
      path: '/dashboard/index',
      name: 'DashboardIndex',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: '仪表盘',
      },
    },
  ],
}

export const UserRoute: AppRouteRecordRaw = {
  path: '/user',
  name: 'User',
  component: Layout,
  meta: {
    title: '我的',
  },
  children: [
    {
      path: '/user/profile',
      name: 'UserProfile',
      component: () => import('@/views/user/profile.vue'),
      meta: {
        title: '个人中心',
      },
    },
  ],
}

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/auth/login.vue'),
  meta: {
    title: '登录',
  },
}

// 普通路由 无需验证权限
export const constantRouter: any[] = [RootRoute, LoginRoute, RedirectRoute, DashboardRoute, UserRoute]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuard(router)
}

export default router

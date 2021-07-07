import Vue from 'vue';
import VueRouter from 'vue-router';
// import configRouterNavigationGuard from '@utils/auth';
import Layout from '@src/layout';

Vue.use(VueRouter);
// 基础路由
const routes = [
  {
    path: '/',
    name: 'admin',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@src/pages/dashboard'),
      },
    ],
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: '',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '@src/pages/test'),
      },
    ],
  },
  {
    path: '/resources',
    component: Layout,
    children: [
      {
        path: '',
        name: 'resources',
        component: () => import(/* webpackChunkName: "resources" */ '@src/pages/system/permission/resources'),
      },
    ],
  },
  {
    path: '/roles',
    component: Layout,
    children: [
      {
        path: '',
        name: 'roles',
        component: () => import(/* webpackChunkName: "roles" */ '@src/pages/system/permission/roles'),
        children: [
          {
            path: '',
            name: 'rolesIndex',
            component: () => import(/* webpackChunkName: "rolesIndex" */ '@src/pages/system/permission/roles/components/roles'),
          },
          {
            path: '/roles/:id/users',
            name: 'allocatedUsers',
            component: () => import(/* webpackChunkName: "allocatedUsers" */ '@src/pages/system/permission/roles/components/allocatedUsers'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '@src/pages/login/login.vue'),
  },
];

const router = new VueRouter({
  routes,
});

// 配置授权相关代码
// configRouterNavigationGuard(router);

export default router;

import store from '@src/store';

export default function configRouterNavigationGuard(router) {
  router.beforeEach((to, from, next) => {
    // 登录页放行
    if (to.path === '/login') return next();
    // 获取token
    const { token } = store.getters;
    // 无token跳登录页
    if (!token) {
      next('login');
    }
    // 自己跳转自己不执行
    if (from.path === to.path) return next(false);

    return next();
  });
}

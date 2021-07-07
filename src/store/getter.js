export default {
  token: (state) => state.auth.token,
  refreshToken: (state) => state.auth.refreshToken,
  roles: (state) => state.auth.roles,
  menus: (state) => state.auth.menus,
  permissions: (state) => state.auth.permissions,
  siderIsCollapse: (state) => state.layout.siderIsCollapse,
  tabs: (state) => state.layout.tabs,
};

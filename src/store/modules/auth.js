import { login, getSelfInfo, getNewToken } from '@apis/login';

const getDefaultState = () => ({
  token: sessionStorage.getItem('access_token'),
  refreshToken: sessionStorage.getItem('refresh_token'),
  username: '',
  roles: [],
  menus: [],
  permissions: [],
});
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_REFRESH_TOKEN: (state, refreshToken) => {
    state.refreshToken = refreshToken;
  },
  SET_USER_NAME: (state, refreshToken) => {
    state.refreshToken = refreshToken;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions;
  },
};
const actions = {
  // 登录
  login(state, { username, password }) {
    const { commit } = state;
    return new Promise((res, rej) => {
      login(username, password)
        .then(({ accessToken, refreshToken }) => {
          // 设置token及refreshToken
          commit('SET_TOKEN', accessToken);
          commit('SET_REFRESH_TOKEN', refreshToken);
          sessionStorage.setItem('access_token', accessToken);
          sessionStorage.setItem('refresh_token', refreshToken);
          // 请求获取用户信息及对应的权限相关信息
          getSelfInfo().then((userInfo) => {
            console.log(userInfo);
            // 设置菜单等信息
            res();
          });
        })
        .catch((err) => rej(err));
    });
  },
  // 获取新token
  refreshToken({ commit, getters }) {
    return new Promise((res, rej) => {
      getNewToken(getters.refreshToken)
        .then((data) => {
          commit('SET_TOKEN', data.accessToken);
          commit('SET_REFRESH_TOKEN', data.refreshToken);
          sessionStorage.setItem('access_token', data.accessToken);
          sessionStorage.setItem('refresh_token', data.refreshToken);
          res(data);
        })
        .catch((e) => rej(e));
    });
  },
  // 登出
};
export default {
  namespaced: true,
  state: getDefaultState(),
  mutations,
  actions,
};

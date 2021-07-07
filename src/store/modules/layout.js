const state = {
  siderIsCollapse: false,
  tabs: [],
};
const mutations = {
  SET_SIDER_IS_COLLAPSE: (state, payload) => {
    state.siderIsCollapse = payload;
  },
  TABS_PUSH: (state, tab) => {
    state.tabs.push(tab);
  },
};
const actions = {
  toggleMenu({ commit, state }) {
    const isCollapse = state.siderIsCollapse;
    commit('SET_SIDER_IS_COLLAPSE', !isCollapse);
  },
  addTab({ commit }, tab) {
    commit('TABS_PUSH', tab);
  },
};
export default {
  namespace: true,
  state,
  mutations,
  actions,
};

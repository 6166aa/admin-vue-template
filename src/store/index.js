import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getter';

Vue.use(Vuex);

const moduleFiles = require.context('./modules/', true, /\.js$/);

// eslint-disable-next-line no-shadow
const modules = moduleFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/\.\/(.+)\.(\w+)$/, '$1');
  modules[moduleName] = moduleFiles(modulePath).default;
  return modules;
}, {});
console.log(modules);
export default new Vuex.Store({
  modules,
  getters,
});

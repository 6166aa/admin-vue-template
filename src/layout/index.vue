<template>
  <div class="layout">
    <sider />
    <div class="right">
      <navbar />
      <tab-menu :tabs="tabMenuData" @tabsClose="tabsClose" />
      <main-content></main-content>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { getSelfInfo } from '@apis/login';
import sider from './components/aside';
import navbar from './components/header';
import tabMenu from './components/tabMenu';
import mainContent from './components/mainContent';

export default {
  components: {
    sider,
    navbar,
    tabMenu,
    mainContent,
  },
  data() {
    return {
      tabMenuData: [
        {
          iconUrl: 'el-icon-menu',
          name: 'test',
          title: '测试',
          route: '/test',
        },
        {
          iconUrl: 'el-icon-menu',
          name: 'test2',
          title: '测试2',
          route: '/test2',
        },
      ],
    };
  },
  methods: {
    test() {
      getSelfInfo();
    },
    tabsClose(item) {
      this.tabMenuData.splice(
        this.tabMenuData.findIndex((i) => i.route === item.route),
        1,
      );
    },
  },
};
</script>

<style lang="stylus" scoped>
.layout
  width 100%
  height 100%
  display flex
  .right
    flex 1
    display flex
    flex-direction column
</style>

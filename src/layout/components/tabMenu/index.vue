<template>
  <div class="tab-menu">
    <el-tag :effect="isActive({ route: '/dashboard' })" @click="tagClick({ route: '/dashboard' })" >工作台</el-tag>
    <scroll-panel>
      <el-tag :effect="isActive(item)" @click="tagClick(item)" @close="tagClose(item)" closable v-for="item in tabs" :key="item.route">
        {{ item.title }}
      </el-tag>
    </scroll-panel>
    <el-dropdown trigger="click">
      <el-tag>
        <i class="el-icon-s-tools"></i>
      </el-tag>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>关闭所有</el-dropdown-item>
        <el-dropdown-item>关闭其他</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import scrollPanel from './scrollPanel.vue';

export default {
  props: {
    tabs: {
      type: Array,
      default() {
        return [
          {
            name: 'test',
            title: '测试',
            route: '/test',
          },
          // {
          //   name: 'test',
          //   title: '测试',
          //   route: '/test',
          // },
          // {
          //   name: 'test',
          //   title: '测试',
          //   route: '/test',
          // },
        ];
      },
    },
  },
  components: {
    scrollPanel,
  },
  methods: {
    isActive(item) {
      return this.$route.path === item.route ? 'dark' : 'plain';
    },
    tagClose(item) {
      this.$emit('tabsClose', item);
    },
    tagClick(item) {
      this.$router.push(item.route);
    },
  },
};
</script>

<style lang="stylus" scoped>
.tab-menu
  border-bottom 1px solid #eee
  box-shadow 0 0 3px rgba(0, 0, 0, 0.3)
  display flex
  padding 0.15em 0.3em
  margin-bottom 3px
.el-tag
  cursor pointer
  user-select none
  border-radius .13em
</style>

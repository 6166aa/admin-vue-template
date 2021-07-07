<template>
  <div :class="{ aside: true, collapse: siderIsCollapse }">
    <logo :collapse="siderIsCollapse" :logoUrl="require('@src/common/images/logo.png')" :collapseLogoUrl="require('@src/common/images/collapse-logo.jpg')" />
    <el-menu :collapse-transition="false" default-active="1" class="el-menu-vertical-demo" :background-color="variables.menuPrimaryBGColor" text-color="#fff" active-text-color="#ffd04b" :collapse="siderIsCollapse" :router="true">
      <menu-item :data="item" @click="test" v-for="item in menus" :key="item.route" />
    </el-menu>
  </div>
</template>

<script>
import variables from '@src/common/styles/variables';
import { mapGetters, mapActions } from 'vuex';
import logo from './logo.vue';
import menuItem from './menuItem.vue';

export default {
  components: {
    logo,
    menuItem,
  },
  computed: {
    ...mapGetters(['siderIsCollapse', 'tabs']),
    variables() {
      return variables;
    },
  },
  data() {
    return {
      menus: [
        {
          icon: 'el-icon-menu',
          name: 'dashboard',
          route: '/dashboard',
          title: '工作台',
        },
        {
          icon: 'el-icon-menu',
          name: 'system',
          route: '/system',
          title: '系统设置',
          children: [
            {
              icon: 'el-icon-menu',
              name: 'auth',
              route: '/auth',
              title: '权限管理',
              children: [
                {
                  icon: 'el-icon-menu',
                  name: 'resources',
                  route: '/resources',
                  title: '资源管理',
                },
                {
                  icon: 'el-icon-menu',
                  name: 'roles',
                  route: '/roles',
                  title: '角色列表',
                },
              ],
            },
          ],
        },
        {
          name: 'test',
          route: '/nest',
          title: '用户管理',
          children: [
            {
              name: 'test',
              route: '/nest2',
              title: '用户列表',
            },
          ],
        },
      ],
    };
  },
  methods: {
    ...mapActions(['addTab']),
    test(e) {
      console.log(e);
      // this.addTab({ title: '测试', routes: e });
    },
  },
};
</script>

<style lang="stylus" scoped>
.aside
  height 100%
  flex 0 0 200px
  overflow hidden
  background $menuPrimaryBGColor
  transition .3s
  &.collapse
    flex 0 0 64px

  .el-menu
    border none

</style>

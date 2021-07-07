<template>
  <header>
    <el-button class="menu-toggle" @click="toggleMenu" type="text">
      <i :class="[siderIsCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
    </el-button>
    <el-dropdown trigger="click">
      <div>
        <el-avatar shape="square" size="medium"></el-avatar>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >个人主页</el-dropdown-item>
        <el-dropdown-item >我的Git</el-dropdown-item>
        <el-dropdown-item >退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['siderIsCollapse']),
  },
  methods: {
    ...mapActions(['toggleMenu']),
  },
};
</script>

<style lang="stylus" scoped>
header
  height 60px
  padding 0 1em
  display flex
  align-items center
  border-bottom 1px solid #eee
  box-shadow 1px 0 4px rgba(0,0,0,.12)
  .menu-toggle
    font-size 22px
    margin-right auto
</style>

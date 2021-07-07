<template>
  <el-submenu :index="data.route" v-if="data.children && data.children.length > 0">
    <template slot="title">
      <i :class="data.icon"></i>
      <span>{{ data.title }}</span>
    </template>
    <menu-item :data="item" v-for="item in data.children" :key="item.route" @click="$emit('click', data)"></menu-item>
  </el-submenu>
  <el-menu-item :index="data.route" @click="$emit('click', data)" v-else>
    <i :class="data.icon"></i>
    <span slot="title">{{ data.title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'menuItem',
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style></style>

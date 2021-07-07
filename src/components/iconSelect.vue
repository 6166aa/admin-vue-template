<template>
  <div class="icon-select">
    <el-popover style="padding:0;" popper-class="icon-select__icons-wrap" placement="bottom-start" width="385" trigger="click">
      <el-input slot="reference" size="small" @click.native="showIcons = !showIcons" v-model="value" readonly>
        <span class="clear" @click="$emit('update:value', '')" slot="suffix" v-show="value">
          <i class="el-icon-circle-close"></i>
        </span>
        <el-button slot="append" :icon="icon"></el-button>
      </el-input>
      <el-scrollbar :wrap-style="[{ height: '169px' }, { width: '385px' }]">
        <div class="icon-select__icons">
          <div class="icon-select__icon" @click="iconClick(item)" v-for="item in icons" :key="item">
            <el-tag :type="iconType(item)">
              <i :class="item"></i>
            </el-tag>
          </div>
        </div>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script>
import icons from '@src/configs/el-icons';

export default {
  model: {
    prop: 'value',
    event: 'update:value',
  },
  props: ['value'],
  computed: {
    icon() {
      return this.value || 'el-icon-edit';
    },
  },
  data() {
    return {
      icons,
      showIcons: false,
    };
  },
  methods: {
    iconClick(item) {
      this.$emit('update:value', item);
    },
    iconType(type) {
      return type === this.value ? 'dark' : 'plain';
    },
  },
};
</script>
<style lang="stylus" scoped>
.icon-select
  position relative
.clear
  display flex
  height 100%
  width 22px
  cursor pointer
  align-items center
  justify-content center
.icon-select__icon
  flex 0 0 40px
  height 40px
  font-size 1.2em
  text-align center
  cursor pointer
  &:hover
    .el-tag
      background-color #409eff
      color #fff
      border-color #409eff
.icon-select__icons
    display flex
    top:40px
    background-color #fff
    padding-right 0
    flex-wrap wrap
.el-scrollbar
  margin-right -9px
  >>>.el-scrollbar__bar
    right 0px
</style>

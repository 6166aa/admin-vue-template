<template>
  <div class="container">
    <div class="left panel" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="right panel">
      <slot name="right">
        <div class="header panel" v-if="$slots.header">
          <slot name="header"></slot>
        </div>
        <div class="main panel" v-if="$slots.default">
          <slot name="default"></slot>
        </div>
        <div class="footer panel" v-if="$slots.footer">
          <slot name="header"></slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.container
  width 100%
  height 100%
  display flex
  .panel
    box-sizing border-box
    border 10px solid #f0f2f5
    background-color #fff
  .left
    width 200px
    &+.right.panel
      border-left 0
  .right
    flex 1
    display flex
    flex-direction column
    .header,.main,.footer
      border-left 0
      border-right 0
    .header
      border-top 0
      &+.main.panel
        border-top 0
    .main
      flex 1
      &+.footer.panel
        border-top 0
    >div
      &:first-child
          border-top 0
        &:last-child
          border-bottom 0
</style>

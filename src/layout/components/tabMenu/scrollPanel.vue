<template>
  <div class="scroll-panel">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.scroll-panel
  padding 0 0.2em

  .el-tag+.el-tag
    margin-left 0.2em
</style>

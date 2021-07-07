<template>
  <div class="logo">
    <img :src="[collapse ? collapseLogoUrl : logoUrl]" alt="logo" />
  </div>
</template>

<script>
export default {
  props: ['collapse', 'logoUrl', 'collapseLogoUrl'],
};
</script>

<style lang="stylus" scoped>
.logo
    height 60px
    img
      width 100%
      height 100%
</style>

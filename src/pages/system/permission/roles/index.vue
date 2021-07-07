<template>
  <!-- <div class="role"> -->
    <router-view></router-view>
  <!-- <component :is="showContainer" :showContainer.sync="showContainer"></component> -->
  <!-- <allocated-users-container/> -->
  <!-- <roles-container /> -->

  <!-- </div> -->
</template>

<script>
// import rolesContainer from './components/roles';
// import allocatedUsersContainer from './components/allocatedUsers.vue';

export default {
  components: {
    // rolesContainer,
    // allocatedUsersContainer,
  },
  data() {
    return {
      showContainer: 'rolesContainer',
    };
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
.role
  width 100%
  height 100%

.user-list
  .header
    justify-content flex-start
  .content
    .actions
      padding .3em 0
      .title
        margin-right auto
</style>

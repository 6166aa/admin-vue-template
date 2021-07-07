<template>
  <div class="login">
    <div class="form">
      <div class="left">
        <h1 class="title">你好！</h1>
        <img src="@src/common/images/logo.png" />
      </div>
      <div class="right">
        <div class="form-item">
          <input type="text" v-model="username" autocomplete="off" required />
          <div class="placeholder">用户名</div>
          <div class="border-line"></div>
        </div>
        <div class="form-item">
          <input type="password" v-model="password" autocomplete="off" required />
          <div class="placeholder">密码</div>
          <div class="border-line"></div>
        </div>
        <button @click="submit">登录</button>
        <!-- <button @click="test">test</button> -->
        <!-- <button @click="test2">test2</button> -->
      </div>
    </div>
  </div>
</template>

<script>
// import { test1, test2 } from '@apis/test';

export default {
  data() {
    return {
      username: 'root',
      password: 'admin',
      redirectPath: '',
    };
  },
  methods: {
    async submit() {
      this.$message.closeAll();
      if (!this.username.trim() || !this.password.trim()) {
        this.$message({
          message: '用户名或密码不能为空',
          type: 'error',
        });
        return;
      }
      try {
        await this.$store.dispatch('auth/login', {
          username: this.username,
          password: this.password,
        });
        this.$router.push('/');
      } catch (error) {
        console.log(error);
        this.$message.error(error);
      }
    },
    // test() {
    //   test1();
    // },
    // test2() {
    //   test2();
    // },
  },
  watch: {
    $route: {
      handler(router) {
        const { query } = router;
        if (query) {
          this.redirectPath = query.redirect;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
@require './index'
</style>

<template>
  <yt-dialog :visible="visible" @open="open" title="人员选择" @submit="handle" @update:visible="$emit('update:visible', false)">
    <div class="body">
      <section>
        <header>
          <el-input size="small" placeholder="请输入内容" v-model="searchValue" class="search">
            <el-button slot="append" size="small" type="primary" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="text" icon="el-icon-circle-plus-outline" @click="addAll">选择全部</el-button>
        </header>
        <el-scrollbar class="users-wrap" :wrap-style="[{ height: '161px' }]">
          <div class="users">
            <div
              class="user-item"
              v-for="user in searchValue ? notAllocatedUsers.filter(user => user.username.includes(searchValue)) : notAllocatedUsers"
              :key="user.id"
              @click="add(user)"
              :title="user.username"
            >
              <div class="avatar">
                {{ user.username.slice(0, 1).toUpperCase() }}
                <div class="add-btn btn">
                  <i class="el-icon-circle-plus-outline"></i>
                </div>
              </div>
              <div class="name">{{ user.username }}</div>
            </div>
          </div>
        </el-scrollbar>
      </section>
      <section>
        <header>
          <div class="title">已选择{{ allocatedUsers.length }}项</div>
          <el-button type="text" icon="el-icon-delete" @click="removeAll">
            删除全部
          </el-button>
        </header>
        <el-scrollbar class="users-wrap" :wrap-style="[{ height: '161px' }]">
          <div class="users">
            <div class="user-item" v-for="user in allocatedUsers" :key="user.id" @click="remove(user)" :title="user.username">
              <div class="avatar">
                {{ user.username.slice(0, 1).toUpperCase() }}
                <div class="del-btn btn">
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div class="name">{{ user.username }}</div>
            </div>
          </div>
        </el-scrollbar>
      </section>
    </div>
  </yt-dialog>
</template>

<script>
import ytDialog from '@src/components/dialog';
import { getOneNotUsers, getOneUsers, reallocateUsers } from '@apis/roles';

export default {
  name: 'allocateUserDialog',
  components: {
    ytDialog,
  },
  props: ['visible', 'roleId'],
  data() {
    return {
      allocatedUsers: [],
      notAllocatedUsers: [],
      roleInfo: {},
      searchValue: '',
    };
  },
  methods: {
    mouseEnter() {
      this.userAvatarHover = 'delete';
    },
    mouseLeave() {
      this.userAvatarHover = 'delete';
    },
    async initData() {
      console.log(this.roleId);
      this.allocatedUsers = (await getOneUsers(this.roleId)).users;
      this.notAllocatedUsers = await getOneNotUsers(this.roleId);
    },
    async open() {
      this.initData();
    },
    add(user) {
      [].push.apply(
        this.allocatedUsers,
        this.notAllocatedUsers.splice(
          this.notAllocatedUsers.findIndex((item) => item.id === user.id),
          1,
        ),
      );
    },
    addAll() {
      [].push.apply(this.allocatedUsers, this.notAllocatedUsers.splice(0));
    },
    remove(user) {
      [].push.apply(
        this.notAllocatedUsers,
        this.allocatedUsers.splice(
          this.allocatedUsers.findIndex((item) => item.id === user.id),
          1,
        ),
      );
    },
    removeAll() {
      [].push.apply(this.notAllocatedUsers, this.allocatedUsers.splice(0));
    },
    async handle() {
      await reallocateUsers(this.roleId, this.allocatedUsers);
      this.$message.success('修改成功');
      this.$emit('update:visible', false);
      this.$emit('submitSuccess', 'ok');
    },
  },
};
</script>

<style lang="stylus" scoped>
.body
  section
    header
      display flex
      align-items  center
      .title
        margin-right auto
      .search
        margin-right auto
        width 60%
    .users-wrap
      border 1px solid #eee
      border-radius 3px
      .users
        padding .3em
        display flex
        flex-wrap wrap
        .user-item
          display flex
          align-items center
          cursor pointer
          width 20%
          margin .4em 0
          .avatar
            width: 36px;
            height: 36px;
            border-radius 100%
            background-color #419ff4
            position relative
            color #fff
            display flex
            align-items center
            justify-content center
            .btn
              position absolute
              display none
              top 0
              left 0
              width 100%
              height 100%
              justify-content center
              align-items center
              border-radius 100%
              background-color rgba(0,0,0,.6)
          &:hover
            .avatar .btn
              display flex
          .name
            flex 1
            margin-left .4em
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
</style>

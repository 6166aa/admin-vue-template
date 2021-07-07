<template>
  <container class="allocated-users">
    <template #header>
      <div class="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/roles' }">角色管理</el-breadcrumb-item>
          <el-breadcrumb-item>人员列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </template>
    <template #default>
      <div class="content">
        <el-tag style="width:100%"> <i class="el-icon-info"></i> 当前角色为：{{roleInfo.name}}</el-tag>
        <div class="actions">
          <span class="title">已分配人员</span>
          <el-button size="small" @click="$router.back()">返回角色列表</el-button>
          <el-button type="primary" size="small" @click="openAllocateUserDialog">可分配人员</el-button>
        </div>
        <div class="table-wrap">
          <div>
            <el-table :data="roleInfo.users" style="width: 100%;" max-height="250">
              <el-table-column prop="username" label="名称"> </el-table-column>
              <el-table-column prop="status" label="状态">
                <template #default="{row}">
                  <el-tag size="small" :type="row.status ? 'success' : 'danger'">{{ row.status ? "启动" : "禁止" }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createAt" label="创建时间"> </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template>
                  <el-button type="text" size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <allocate-user-dialog :visible.sync="usersAllocateDialogVisible" :roleId="roleInfo.id" @submitSuccess="initData"/>
    </template>
  </container>
</template>

<script>
import container from '@src/components/container';
import { getOneUsers } from '@apis/roles';
import allocateUserDialog from './allocateUserDialog';

export default {
  name: 'allocatedUsers',
  components: {
    container,
    allocateUserDialog,
  },
  data() {
    return {
      roleInfo: {},
      usersAllocateDialogVisible: false,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.roleInfo = await getOneUsers(this.$route.params.id);
    },
    openAllocateUserDialog() {
      this.usersAllocateDialogVisible = true;
    },
  },
};
</script>

<style lang="stylus" scoped>
.allocated-users
  .header
    padding .5em
    display flex
    align-items center
  .content
    height 100%
    width 100%
    display flex
    flex-direction column
    padding 10px .8em
    .actions
      display flex
      margin 1em 0
      .title
        margin-right auto
    .table-wrap
      position relative
      flex 1
      >div
        position absolute
        width 100%
        height 100%
</style>

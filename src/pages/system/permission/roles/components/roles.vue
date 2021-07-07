<template>
  <container>
    <template #header>
      <div class="header">
        <el-input size="small" placeholder="请输入内容" class="search">
          <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
        </el-input>
        <el-button size="small">高级搜索</el-button>
      </div>
    </template>
    <template #default>
      <div class="content">
        <div class="actions">
          <el-button size="small" class="add-btn" type="primary">新增资源</el-button>
          <el-dropdown trigger="click">
            <el-button type="default" size="small"> 批量操作<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item>启动</el-dropdown-item>
              <el-dropdown-item>禁止</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="table-wrap">
          <div>
            <el-table :data="roles" style="width: 100%;" max-height="100%">
              <el-table-column prop="name" label="名称"> </el-table-column>
              <el-table-column prop="desc" label="描述"> </el-table-column>
              <el-table-column prop="status" label="状态">
                <template #default="{row}">
                  <el-tag size="small" :type="row.status ? 'success' : 'danger'">{{ row.status ? "启动" : "禁止" }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createAt" label="创建时间"> </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template #default="{row}">
                  <el-button @click="jumpAllocatedUsers(row)" type="text" size="small">
                    人员列表
                  </el-button>
                  <el-button type="text" @click="row" size="small">
                    编辑
                  </el-button>
                  <el-button type="text" size="small">
                    <el-dropdown trigger="click" @command="dropdownHandle(row, $event)">
                      <el-button type="text" size="small">更多操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-plus" command="allocatePerms">分配权限</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-delete-solid" command="dele">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <allocate-resources-dialog :visible.sync="permAllocateDialogVisible" :roleId="selectRoleId" />
    </template>
  </container>
</template>

<script>
import { getAll } from '@apis/roles';
import container from '@src/components/container';
import allocateResourcesDialog from './allocateResourceDialog.vue';

export default {
  name: 'roles',
  components: {
    container,
    allocateResourcesDialog,
  },
  props: ['showContainer'],
  data() {
    return {
      roles: [],
      pageInfo: {},
      // 权限分配dialog是否显示
      permAllocateDialogVisible: false,
      // 选中角色的Id
      selectRoleId: '',
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.roles = await getAll();
    },
    async del(row) {
      console.log(row);
    },
    dropdownHandle(row, command) {
      if (command === 'delete') {
        console.log('delete');
      } else {
        this.showAllocatePermDialog(row);
      }
    },
    async showAllocatePermDialog(role) {
      this.selectRoleId = role.id;
      this.permAllocateDialogVisible = true;
    },
    jumpAllocatedUsers(item) {
      this.$router.push(`/roles/${item.id}/users`);
    },
  },
};
</script>

<style lang="stylus" scoped>
.actions
    display flex

.header
  padding .5em
  display flex
  align-items center
  justify-content center
  .search
    width 350px
    margin-right 1em
.content
  height 100%
  width 100%
  display flex
  flex-direction column
  padding 10px .8em
  .actions
    display flex
    .add-btn
      margin-right auto
  .table-wrap
    position relative
    flex 1
    >div
      position absolute
      width 100%
      height 100%
</style>

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
          <el-button size="small" @click="addNewBefore" class="add-resource-btn" type="primary">新增资源</el-button>
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
            <el-table
              :header-cell-style="tableHeaderStyle"
              :header-row-style="tableHeaderStyle"
              row-key="id"
              size="small"
              :data="resources"
              default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
              <el-table-column prop="title" label="名称" width="180"> </el-table-column>
              <el-table-column prop="type" label="类型" width="180"> </el-table-column>
              <el-table-column prop="icon" label="图标">
                <template #default="{row,column}"> <i :class="row[column.property]"></i> </template>
              </el-table-column>
              <el-table-column prop="actions" label="操作" width="180">
                <template #default="{row}">
                  <el-button @click="addSubBefore(row)" v-if="!row.type" type="text" size="small">添加下级</el-button>
                  <el-button @click="editBefore(row)" type="text" size="small">修改</el-button>
                  <el-button type="text">
                    <el-popconfirm title="确定删除该资源吗?" @confirm="del(row)">
                      <el-button slot="reference" type="text" size="small">删除</el-button>
                    </el-popconfirm>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <yt-dialog :visible.sync="visible" :title="isEdit ? '编辑' : '新增'" @cancel="cancelHandle" @submit="submitHandle">
        <el-form ref="resourceForm" size="small" :rules="rules" :model="resource" label-width="80px">
          <el-form-item label="资源类型" prop="type">
            <el-radio-group v-model="resource.type" :disabled="isEdit" @change="typeChange">
              <el-radio :label="0">菜单</el-radio>
              <el-radio :label="1">资源</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单名称" :rules="rules.menuTitle" v-show="!resource.type" prop="title">
            <el-input v-model="resource.title"></el-input>
          </el-form-item>
          <el-form-item label="资源名称" :rules="rules.resourceTitle" v-show="resource.type" prop="title">
            <el-select v-model="resource.title" filterable allow-create style="width:100%;" placeholder="请选择" @change="resourcesNameChange">
              <el-option v-for="title in resourceTitles" :key="title" :label="title" :value="title"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属上级" prop="parentId">
            <el-cascader v-model="resource.parentId" :props="{ label: 'title', value: 'id', multiple: false, emitPath: false, checkStrictly: true }" style="width:100%;" :options="menus"></el-cascader>
          </el-form-item>
          <el-form-item label="资源路径" v-show="resource.type" prop="path">
            <el-input v-model="resource.path"></el-input>
          </el-form-item>
          <el-form-item label="菜单路由" v-show="!resource.type" prop="route">
            <el-input v-model="resource.route"></el-input>
          </el-form-item>
          <el-form-item label="文件路径" v-show="!resource.type" prop="path">
            <el-input v-model="resource.path"></el-input>
          </el-form-item>
          <el-form-item label="资源方法" v-show="resource.type" prop="method">
            <el-radio-group v-model="resource.method">
              <el-radio-button v-for="item in methods" :key="item" :label="item"></el-radio-button>
            </el-radio-group>
            <!-- <el-select v-model="resource.method" placeholder="请选择">
            <el-option v-for="item in methods" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
          <el-input v-model="resource.method"></el-input> -->
          </el-form-item>
          <el-form-item label="菜单图标" v-show="!resource.type" prop="icon">
            <icon-select v-model="resource.icon"></icon-select>
          </el-form-item>
          <el-form-item label="序号" v-show="!resource.type" prop="order">
            <el-input-number style="width:100%;text-align:left" v-model="resource.order" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
        </el-form>
      </yt-dialog>
    </template>
  </container>
</template>

<script>
import container from '@src/components/container';
import iconSelect from '@src/components/iconSelect';
import {
  getAll, create, del, update,
} from '@apis/resources';
import ytDialog from '@src/components/dialog';
import { arrayToTree } from 'performant-array-to-tree';
import cleanDeep from 'clean-deep';

export default {
  components: {
    container,
    iconSelect,
    ytDialog,
  },
  created() {
    this.initData();
  },
  data() {
    return {
      tableHeaderStyle: {
        backgroundColor: '#f5f7fa',
      },
      visible: false,
      isEdit: false,
      resources: [],
      menus: [],
      resourceTitles: ['所有', '查询', '添加', '修改', '删除'],
      methods: ['all', 'get', 'post', 'put/patch', 'delete'],
      resource: {
        type: 0, // 0-菜单，1-资源
        title: '',
        name: '',
        path: '',
        route: '',
        method: 'all',
        desc: '',
        icon: '',
        order: 0,
        parentId: '',
      },
      rules: {
        menuTitle: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
        resourceTitle: [{ required: true, message: '资源名称不能为空', trigger: 'blur' }],
        resourcePath: [{ required: true, message: '资源路径不能为空', trigger: 'blur' }],
      },
    };
  },
  methods: {
    // 初始化整个页面数据
    async initData() {
      this.resource = this.$options.data().resource;
      const list = await getAll();
      this.resources = arrayToTree(list, { dataField: null });
      console.log(this.resources);
      this.menus = cleanDeep(
        arrayToTree(
          list.filter((item) => item.type === 0),
          { dataField: null },
        ),
      );
    },
    // 资源下拉框改变事件
    resourcesNameChange(name) {
      switch (name) {
        case '所有':
          this.resource.method = 'all';
          break;
        case '查询':
          this.resource.method = 'get';
          break;
        case '添加':
          this.resource.method = 'post';
          break;
        case '修改':
          this.resource.method = 'put/patch';
          break;
        case '删除':
          this.resource.method = 'delete';
          break;
        default:
          break;
      }
    },
    // 资源类型改变事件
    typeChange(type) {
      if (type === 1) {
        this.resource.method = 'all';
      } else {
        this.resource.method = '';
      }
      // this.$refs.resourceForm.resetFields();
      // this.resource.type = type;
    },
    // dialog点击确定事件
    async submitHandle() {
      this.$refs.resourceForm.validate(async (result) => {
        if (result) {
          let msg = '添加成功';
          this.resource.parent = { id: this.resource.parentId };
          if (this.isEdit) {
            await update(this.resource);
            msg = '编辑成功';
          } else {
            await create(this.resource);
          }
          this.initData();
          this.$message.success(msg);
          this.visible = false;
        }
      });
      console.log('submitHandle');
    },
    // 添加前的逻辑处理
    addNewBefore() {
      this.isEdit = false;
      this.visible = true;
    },
    // 添加下级前的逻辑处理
    addSubBefore(item) {
      this.resource.parentId = item.id;
      if (item.isEnd) {
        this.resource.type = 1;
      }
      this.isEdit = false;
      this.visible = true;
    },
    // dialog消失时事件
    cancelHandle() {
      this.$refs.resourceForm.resetFields();
      this.resource = this.$options.data().resource;
    },
    // 修改前的逻辑处理
    editBefore(item) {
      this.resource = { ...item };
      this.isEdit = true;
      this.visible = true;
    },
    // 资源删除事件
    async del(item) {
      await del(item.id);
      this.$message.success('删除成功');
      this.initData();
    },
  },
};
</script>

<style lang="stylus" scoped>
.header
  padding .3em
  display flex
  align-items center
  justify-content center
  .search
    width 350px
    margin-right 1em
.content
  padding 10px .8em
  display flex
  flex-direction column
  height 100%
  .actions
    display flex
    .add-resource-btn
      margin-right auto
  .table-wrap
    position relative
    flex 1
    >div
      position absolute
      width 100%
      height 100%
      overflow-y auto
.el-input-number
  >>>input
    text-align left
</style>

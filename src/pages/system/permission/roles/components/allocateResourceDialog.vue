<template>
  <yt-dialog :visible="visible" @open="test" title="权限分配" @submit="handle" @cancel="closeDialog" @update:visible="$emit('update:visible', false)">
    <el-tree ref="permTreeRef" :props="defaultProps" node-key="id" show-checkbox :default-checked-keys="perms" :data="treeData"> </el-tree>
  </yt-dialog>
</template>

<script>
import ytDialog from '@src/components/dialog';
import { getAllTree } from '@apis/resources';
import { allocateResource, getOneResources } from '@apis/roles';

export default {
  name: 'allocateResourcesDialog',
  components: {
    ytDialog,
  },
  props: ['visible', 'roleId'],
  data() {
    return {
      treeData: '',
      defaultProps: {
        children: 'children',
        label: 'title',
      },
      perms: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.treeData = await getAllTree();
    },
    async test() {
      this.perms = (await getOneResources(this.roleId)).resources.map((item) => item.id);
      this.$refs.permTreeRef.setCheckedKeys(this.perms);
    },
    closeDialog() {
      this.perms = [];
      this.$refs.permTreeRef.setCheckedKeys(this.perms);
    },
    async handle() {
      const permsIds = this.$refs.permTreeRef.getCheckedKeys();
      await allocateResource(this.roleId, permsIds);
    },
  },
};
</script>

<style></style>

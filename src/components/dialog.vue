<template>
  <el-dialog v-bind="{ ...$attrs, ...$props }" @open="e => $emit('open', e)" @update:visible="cancel">
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  // model: {
  //   prop: 'visible',
  //   event: 'update:visible',
  // },
  props: {
    visible: {
      type: Boolean,
    },
    'close-on-click-modal': {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cancel() {
      this.$emit('update:visible', false);
      this.$emit('cancel');
    },
    submit() {
      this.$emit('submit');
    },
  },
};
</script>

<style></style>

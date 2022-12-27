<template>
  <el-dialog v-model="dialogVisible" :show-close="false" center width="30%">
    <el-form :model="form">
      <el-form-item label="Room name">
        <el-input v-model="form.roomName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button color="#4e73df" @click="handleCreate"> Create </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['update:modelValue']);

  const dialogVisible = ref(props.modelValue);

  watch(
    () => dialogVisible.value,
    () => {
      emit('update:modelValue', false);
    },
  );

  const form = reactive({
    roomName: '',
  });
  const handleCreate = async () => {};
</script>

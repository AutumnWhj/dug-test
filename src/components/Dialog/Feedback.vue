<template>
  <el-dialog v-model="dialogVisible" :show-close="false" center width="25%">
    <div class="flex flex-col items-center mb-36">
      <el-image class="h-16 w-16 mb-12" :src="logoTextImage" />
      <div class="text-xl text-gray-300 mb-4">{{ $t('home.ContactFeedback') }}</div>
      <div class="text-sm text-gray-300/50">{{ $t('home.ContactFeedbackDesc') }}</div>
    </div>
    <template #footer>
      <el-button class="w-full !rounded-3xl mb-5" color="#2C72FE" size="large" @click="dialogVisible = false">
        {{ $t('home.ContactFeedbackBtn') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import logoTextImage from '/@/assets/images/logo_text.png';
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
</script>

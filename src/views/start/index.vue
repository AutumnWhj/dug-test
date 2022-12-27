<template>
  <div class="pt-4 flex flex-col items-center relative">
    <div class="text-center mb-10">
      <div class="text-xl font-extrabold text-primary">立即加入我们</div>
      <div class="text-gray-300/50 text-sm">如有问题需要咨询，可点击左下方按钮联系我们</div>
    </div>
    <div class="min-w-80 max-w-96 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="flex flex-col items-center mb-36">
        <el-image class="h-16 mb-16" :src="logoTextImage" />
        <div class="text-base text-black font-medium mb-3">首3月免费试用</div>
        <div class="text-base text-black font-medium">立即开始，节省您的时间</div>
      </div>
      <el-button class="w-2/3 self-center rounded-3xl mb-8" size="large" color="#2C72FE"> Join us </el-button>
    </div>
  </div>
  <LeaveMessage class="fixed left-14 bottom-14 w-auto" />
</template>

<script lang="ts" setup>
  import LeaveMessage from './components/LeaveMessage.vue';
  import logoTextImage from '/@/assets/images/logo_text.png';
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <div class="text-gray-600 font-bold text-center leading-snug mb-6">
      <div class="text-[4.5rem] text-blue-500">{{ $t('home.Slogan[0]') }}</div>
      <div class="text-[3.75rem]">{{ $t('home.Slogan[1]') }}</div>
      <div class="text-[4.5rem] text-blue-500" :class="{ '!text-[#8D8E91] !text-5xl mt-4': $t('message.lang') === '中文' }">{{
        $t('home.Slogan[2]')
      }}</div>
      <div class="text-[3.75rem]">{{ $t('home.Slogan[3]') }}</div>
    </div>
    <div class="w-full md:w-[580px] h-96 bg-black mt-11">
      <iframe :src="videoUrl" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" class="w-full h-full">
      </iframe>
    </div>
    <div class="flex justify-center gap-4 md:gap-6 mt-8">
      <el-button class="w-56 md:w-60 !h-16 !rounded-[56px] !font-bold !text-primary !text-lg !border-primary cursor-pointer">
        <div class="py-4" @click="dialogVisible = true">{{ $t('home.ButtonTexts[0]') }}</div>
      </el-button>
      <el-button class="w-48 md:w-60 !h-16 !rounded-[48px] !font-bold text-white !text-lg cursor-pointer" color="#2c73ff" @click="toLogin">
        <div class="py-4">{{ $t('home.ButtonTexts[1]') }}</div>
      </el-button>
    </div>
  </div>
  <ContactUs v-if="dialogVisible" v-model="dialogVisible" />
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import ContactUs from '/@/components/Dialog/ContactUs.vue';
  import { useI18n } from 'vue-i18n';
  const dialogVisible = ref(false);
  const router = useRouter();

  const { t } = useI18n();
  const toLogin = () => {
    router.push('/login');
  };
  const videoUrl = computed(() => {
    //     中文：https://data-1256210609.cos.ap-guangzhou.myqcloud.com/DUG-0406%E4%B8%AD%E6%96%87.mp4
    // 英文：https://data-1256210609.cos.ap-guangzhou.myqcloud.com/DUG-0406%E8%8B%B1%E6%96%87.mp4
    return t('message.lang') === '中文'
      ? 'https://data-1256210609.cos.ap-guangzhou.myqcloud.com/DUG-0406%E4%B8%AD%E6%96%87.mp4'
      : 'https://data-1256210609.cos.ap-guangzhou.myqcloud.com/DUG-0406%E8%8B%B1%E6%96%87.mp4';
  });
</script>

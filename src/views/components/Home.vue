<template>
  <div class="flex flex-col items-center w-full">
    <div class="text-gray-600 text-[5.625rem] font-bold text-center leading-snug mb-6">
      Help solve your
      <div><span class="text-blue-500">Settlement</span> worries</div>
    </div>
    <div class="w-full md:w-[580px] h-96 bg-black mt-11">
      <iframe
        src="https://data-1256210609.cos.ap-guangzhou.myqcloud.com/4363_1675309340.mp4"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        class="w-full h-full"
      >
      </iframe>
    </div>
    <div class="flex justify-center gap-4 md:gap-6 mt-8">
      <el-button class="w-56 md:w-60 !h-16 !rounded-[56px] !font-bold !text-primary !text-lg !border-primary cursor-pointer">
        <div class="py-4" @click="dialogVisible = true">Contact us</div>
      </el-button>
      <el-button class="w-48 md:w-60 !h-16 !rounded-[48px] !font-bold text-white !text-lg cursor-pointer" color="#2c73ff" @click="toLogin">
        <div class="py-4">Login or Register</div>
      </el-button>
    </div>
  </div>
  <ContactUs v-if="dialogVisible" v-model="dialogVisible" />
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import ContactUs from '/@/components/Dialog/ContactUs.vue';
  const dialogVisible = ref(false);
  const router = useRouter();
  const toLogin = () => {
    router.push('/login');
  };
</script>

<template>
  <div class="flex items-center flex-col !max-w-90rem md:flex-row justify-between gap-20 w-full relative">
    <div class="text-center md:text-left max-w-1/2">
      <div class="text-primary text-2xl font-bold">{{ $t('home.Contact') }}</div>
      <div class="text-gray-700 font-bold text-6xl mt-4 mb-10 leading-snug">
        {{ $t('home.ContactTitle') }}
      </div>
      <div class="text-[#1A1B1C] font-medium text-xl mb-10 leading-snug" v-html="$t('home.ContactSubTitle')"> </div>
      <div class="text-gray-700/50 text-xl font-bold flex flex-col gap-2">
        <p>Tel:{{ $t('home.ContactInfo.Tel') }}</p>
        <p>Email：{{ $t('home.ContactInfo.Email') }}</p>
        <p>WeChat：{{ $t('home.ContactInfo.WeChat') }}</p>
      </div>
    </div>
    <ContactForm />
    <el-image class="h-md !absolute right-[-140px] bottom-[-160px] !hidden md:block" :src="twoImage" />
  </div>
</template>
<script lang="ts" setup>
  import ContactForm from './ContactForm.vue';
  import twoImage from '/@/assets/images/02.png';
</script>

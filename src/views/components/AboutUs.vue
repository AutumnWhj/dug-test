<template>
  <div class="flex flex-col items-center w-full">
    <div class="text-primary text-2xl font-bold">About us</div>
    <div class="flex items-center mt-3">
      <el-image class="w-20 h-20" :src="aboutHeaderImage" />
      <div class="text-5xl font-bold text-4xl">Why Choose Us</div>
    </div>
    <div class="text-center text-xl text-gray-700/50 mt-6">
      <div>Why choose us Why choose us Why choose us </div>
      <div>Why choose us Why choose us</div>
      <div>Why choose us Why choose us Why choose us Why choose us Why choose us </div>
    </div>
    <div class="mt-20 md:mx-24 flex flex-col md:flex-row items-center gap-10">
      <div
        v-for="item in aboutTexts"
        :key="item.title"
        class="py-16 px-6 border border-gray-200 rounded text-gray-700 hover:!text-white hover:bg-primary cursor-pointer"
      >
        <div class="text-2xl font-bold" v-html="item.title"></div>
        <div class="opacity-50 text-sm mt-4">
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import aboutHeaderImage from '/@/assets/images/about-header.png';
  const aboutTexts = [
    {
      title: 'Automatic <br> statistics',
      description:
        'Automatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic ',
    },
    {
      title: 'Automatic <br>  statistics',
      description:
        'Automatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic ',
    },
    {
      title: 'Automatic <br>  statistics',
      description:
        'Automatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic ',
    },
  ];
</script>

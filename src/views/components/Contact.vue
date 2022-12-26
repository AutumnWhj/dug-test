<template>
  <div class="flex items-center flex-col md:flex-row justify-center gap-16 w-full">
    <div class="text-center md:text-left">
      <div class="text-primary text-2xl font-bold">Contact</div>
      <div class="text-gray-700 font-bold text-5xl mt-4 mb-10">
        Contact us and <br />
        <p class="mt-4">let us help you</p>
      </div>
      <div class="text-gray-700/50 text-lg font-bold flex flex-col gap-2">
        <p>Tel:000-000-000</p>
        <p>Email：dugsolutions.com</p>
        <p>WeChat：dugsolutions</p>
      </div>
    </div>
    <ContactForm class="max-w-[500px] border border-gray-200 rounded py-8 px-10 flex-1" />
  </div>
</template>
<script lang="ts" setup>
  import ContactForm from './ContactForm.vue';
</script>

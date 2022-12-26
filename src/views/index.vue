<template>
  <div class="px-6 md:px-28 flex flex-col items-center">
    <Home id="home" class="pt-24" />
    <!-- About us -->
    <AboutUs id="about" class="pt-48" />
    <!-- Contact -->
    <Contact id="contact" class="pt-48 mb-48" />
  </div>
</template>
<script lang="ts" setup>
  import Home from '/@/views/components/Home.vue';
  import AboutUs from '/@/views/components/AboutUs.vue';
  import Contact from '/@/views/components/Contact.vue';
</script>

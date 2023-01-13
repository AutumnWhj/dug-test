<template>
  <div class="main-bg px-6 md:px-28 pt-20 flex flex-col items-center">
    <Home />
    <!-- About us -->
    <AboutUs id="about" class="pt-48" />
    <!-- Contact -->
    <Contact id="contact" class="pt-48 pb-64" />
  </div>
</template>
<script lang="ts" setup>
  import Home from '/@/views/components/Home.vue';
  import AboutUs from '/@/views/components/AboutUs.vue';
  import Contact from '/@/views/components/Contact.vue';
</script>

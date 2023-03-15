<template>
  <div class="main-bg min-h-screen">
    <Header />
    <router-view />
  </div>
</template>
<script setup lang="ts">
  import Header from '/@/components/Header/index.vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  watch(
    () => t('message.lang'),
    () => {
      // window.reload();
    },
  );
</script>

<style>
  #app {
    /* font-family: 'Font Awesome 5 Brands'; */
    font-family: 'AliHYH', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

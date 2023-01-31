<template>
  <header id="header" class="bg-gray-100 z-10 w-full sticky top-0 flex items-center px-16 py-8">
    <div class="flex-1">
      <router-link v-if="!isLoginPath" to="/" class="flex items-center gap-4 text-lg text-2xl font-bold">
        <img class="h-10" :src="logo" alt="" />
        DUG Solutions
      </router-link>
    </div>
    <div class="hidden md:flex text-2xl font-bold">
      <a class="mr-20 text-gray-500 cursor-pointer" :class="{ active: route.hash === '#home' }" href="#home" @click="handleHome">Home</a>
      <a v-if="isHomePath" class="mr-20 text-gray-500" :class="{ active: route.hash === '#about' }" href="#about">About Us</a>
      <a v-if="isHomePath" class="mr-9 text-gray-500" :class="{ active: route.hash === '#contact' }" href="#contact">Contact</a>
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="bg-white rounded-2xl flex items-center justify-center card-shadow cursor-pointer">
          <span class="w-36 px-4 py-2 text-sm font-bold text-gray-500 flex justify-between items-center">
            {{ lang }}
            <SvgIcon name="svg-arrow" class="text-xs ml-1" />
          </span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh"><div class="px-4">中文</div></el-dropdown-item>
            <el-dropdown-item command="en"><div class="px-4">English</div></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>
<script lang="ts" setup>
  import logo from '/@/assets/images/logo.png';
  import SvgIcon from '/@/components/SvgIcon/index.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { isLogin } from '/@/utils/auth';
  import { useI18n } from 'vue-i18n';
  const { locale, t } = useI18n();
  const route = useRoute();
  const router = useRouter();
  console.log('route11111: ', route.path);

  const isHomePath = computed(() => {
    return route.path === '/';
  });
  const isLoginPath = computed(() => {
    return ['/login', '/register'].includes(route.path);
  });
  const handleHome = () => {
    if (isLogin() && !isLoginPath.value) {
      router.push('/restaurant');
    } else {
      window.scrollTo(0, 0);
      router.push('/');
    }
  };
  const lang = computed(() => {
    return t('message.lang');
  });
  const handleCommand = (value) => {
    locale.value = value;
    localStorage.setItem('lang', value);
  };
</script>
<style lang="less" scoped>
  .active {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 52px;
      height: 3px;
      opacity: 1;
      border-radius: 50px;
      background: rgba(44, 115, 255, 1);
    }
  }
  .custom-shadow {
    box-shadow: 0px 1px 14px 0px #040349;
  }
</style>

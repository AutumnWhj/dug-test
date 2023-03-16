<template>
  <div class="flex flex-col items-center w-full relative">
    <div class="text-primary text-2xl font-bold">{{ $t('home.AboutUs') }}</div>
    <div class="flex items-center mt-3">
      <el-image class="w-20 h-20" :src="aboutHeaderImage" />
      <div class="font-bold text-6xl">{{ $t('home.WhyChooseUs') }}</div>
    </div>
    <div class="text-center text-xl text-gray-700/50 mt-10" v-html="$t('home.AboutUsDesc')"> </div>
    <div
      :key="$t('message.lang')"
      class="mt-20 justify-between grid grid-cols-1 md:grid-cols-3 justify-items-stretch gap-10 2xl:gap-16 w-full"
    >
      <div
        v-for="index in 3"
        :key="index"
        :class="{ 'text-center': index !== 1 && hoverIndex === index }"
        class="py-16 px-16 relative h-[29.375rem] border border-gray-200 rounded text-gray-700 hover:!text-white hover:bg-primary hover:scale-y-105 hover:translate-y-3 cursor-pointer"
        @mouseenter="
          isHover = 'hover';
          hoverIndex = index;
        "
        @mouseleave="
          isHover = 'normal';
          hoverIndex = -1;
        "
      >
        <div
          class="text-5xl font-bold leading-snug text-primary"
          :class="[{ '!text-3xl !leading-normal': hoverIndex === index }, { 'text-white': hoverIndex === index }]"
          v-html="getTitle(index)"
        ></div>
        <div
          class="text-white text-sm mt-10"
          :class="{ '!font-bold !opacity-100': hoverIndex === index }"
          v-html="getDescription(index)"
        ></div>
        <!-- <div v-if="index === 2 && hoverIndex === index" class="opacity-50 text-sm w-full absolute font-bold left-0 bottom-7"
          >（如有不了解操作，立即联系我们客服，解决您一切问题）</div
        > -->
      </div>
    </div>
    <el-image class="h-md !absolute left-[-180px] top-[80px]" :src="oneImage" />
  </div>
</template>
<script lang="ts" setup>
  import aboutHeaderImage from '/@/assets/images/about-header.png';
  import oneImage from '/@/assets/images/01.png';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const isHover: any = ref('normal');
  const hoverIndex: any = ref(-1);
  // const aboutTexts = [
  //   {
  //     title: t('home.AboutTexts[0].title'),
  //     description: t('home.AboutTexts[0].description'),
  //   },
  //   {
  //     title: t('home.AboutTexts[1].title'),
  //     description: t('home.AboutTexts[1].description'),
  //   },
  //   {
  //     title: t('home.AboutTexts[2].title'),
  //     description: t('home.AboutTexts[2].description'),
  //   },
  // ];
  // const hoverTexts = [
  //   {
  //     title: t('home.hoverTexts[0].title'),
  //     description: t('home.hoverTexts[0].description'),
  //   },
  //   {
  //     title: t('home.hoverTexts[1].title'),
  //     description: t('home.hoverTexts[1].description'),
  //   },
  //   {
  //     title: t('home.hoverTexts[2].title'),
  //     description: t('home.hoverTexts[2].description'),
  //   },
  // ];
  const getTitle = (index) => {
    if (hoverIndex.value === index) {
      return t(`home.hoverTexts[${index - 1}].title`);
    } else {
      return t(`home.AboutTexts[${index - 1}].title`);
    }
  };
  const getDescription = (index) => {
    if (hoverIndex.value === index) {
      return t(`home.hoverTexts[${index - 1}].description`);
    } else {
      return t(`home.AboutTexts[${index - 1}].description`);
    }
  };
</script>

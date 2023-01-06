<template>
  <div class="flex flex-col items-center w-full">
    <div class="text-primary text-2xl font-bold">About us</div>
    <div class="flex items-center mt-3">
      <el-image class="w-20 h-20" :src="aboutHeaderImage" />
      <div class="font-bold text-6xl">Why Choose Us</div>
    </div>
    <div class="text-center text-xl text-gray-700/50 mt-10">
      <div>Why choose us Why choose us Why choose us </div>
      <div>Why choose us Why choose us</div>
      <div>Why choose us Why choose us Why choose us Why choose us Why choose us </div>
    </div>
    <div class="mt-20 justify-between grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
      <div
        v-for="(item, index) in aboutTexts"
        :key="item.title"
        :class="{ 'text-center': index > 3 }"
        class="py-16 px-16 md:w-96 relative h-[29.375rem] border border-gray-200 rounded text-gray-700 hover:!text-white hover:bg-primary hover:scale-y-105 hover:translate-y-3 cursor-pointer"
      >
        <div class="text-5xl font-bold leading-snug" :class="{ '!text-3xl !leading-normal': index > 3 }" v-html="item.title"></div>
        <div class="opacity-50 text-sm mt-10" :class="{ '!font-bold !opacity-100': index > 3 }" v-html="item.description"></div>
        <div v-if="index === 4" class="opacity-50 text-sm w-full absolute font-bold left-0 bottom-7"
          >（如有不了解操作，立即联系我们客服，解决您一切问题）</div
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import aboutHeaderImage from '/@/assets/images/about-header.png';
  const aboutTexts = [
    {
      title: '什么是<br>DUG？',
      description: 'Unchecked style Unchecked style Unchecked style Unchecked style Unchecked style Unchecked style Unchecked style ',
    },
    {
      title: '怎么加入<br>DUG',
      description: 'Unchecked style Unchecked style Unchecked style Unchecked style Unchecked style Unchecked style Unchecked style ',
    },
    {
      title: 'DUG能给<br>你的',
      description: 'Unchecked style Unchecked style Unchecked style Unchecked style Unchecked style Unchecked style Unchecked style ',
    },
    {
      title: 'Automatic<br>statistics',
      description:
        'Automatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic statistical dataAutomatic ',
    },
    {
      title: '只需5步<br>立即开始DUG',
      description:
        '1.点击上方“登录/注册”立即开始DUG<br>↓<br>2.输入基本信息注册你的DUG账号<br>↓<br>3.输入你的店铺基础信息绑定你的店铺<br>↓<br>4.绑定您的店铺使用的外卖软件<br>↓<br>5.验证通过后，开启您的DUG之旅',
    },
    {
      title: '加入DUG<br>解放你查单时间',
      description:
        '我们通过监测服务<br>每天会通过邮件形式发送报告<br>告诉你错误订单信息与金额<br><br>你还可以按结算日设置接收<br>3天、5天或7天的报表<br>帮助你结算日快速结算并帮你追回差价<br><br>加入DUG，错误订单不再遗漏',
    },
  ];
</script>

<template>
  <div class="flex flex-col items-center relative mt-16">
    <div class="w-3/5 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div v-if="!showDetail" class="w-full flex flex-col">
        <div class="text-center mb-8">
          <div class="text-gray-300 text-xl mb-3">请选择餐厅查看数据</div>
          <div class="text-gray-300/50 text-sm">你好，XXX(你的名字)</div>
        </div>
        <div class="mb-12 bg-gray-800 px-12 rounded-2xl">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <el-image class="h-20 mr-3" :src="seaFoodImage" />
              <div class="text-black font-medium text-sm">Seafood shake</div>
            </div>
            <div class="flex items-center gap-4">
              <el-button plain class="w-28 self-center !rounded-3xl mt-9 mb-8" size="large" color="#383838"> 修改餐厅资料 </el-button>
              <el-button class="w-28 self-center !rounded-3xl mt-9 mb-8" size="large" color="#2C72FE"> 查看报告 </el-button>
            </div>
          </div>
        </div>
        <el-button plain class="w-2/3 self-center !rounded-3xl mt-9 mb-8" size="large" color="#2C72FE"> 添加餐厅 </el-button>
      </div>
      <div v-else>
        <div class="flex items-center flex-col mb-3">
          <el-image class="h-20 mr-3" :src="seaFoodImage" />
          <div class="text-black font-medium text-sm">Seafood shake</div>
        </div>
        <div class="mb-12 bg-gray-800 p-5 rounded-2xl">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <el-image class="h-8 mr-3" :src="pdfIconImage" />
              <div class="text-black font-medium text-sm">2022-12-25</div>
            </div>
            <div class="flex items-center gap-5">
              <div class="button-shadow bg-white p-3 flex items-center justify-center rounded-full cursor-pointer">
                <SvgIcon name="svg-search" class="text-base text-gray-300 font-bold" />
              </div>
              <div class="button-shadow bg-white px-5 py-2 flex items-center justify-center rounded-2xl gap-3 cursor-pointer">
                <span class="text-gray-300 font-bold text-sm">下载文档</span>
                <SvgIcon name="svg-download" class="text-base text-gray-300 font-bold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LeaveMessage class="fixed left-14 bottom-14 w-auto" />
</template>

<script lang="ts" setup>
  import LeaveMessage from '../components/LeaveMessage.vue';
  import seaFoodImage from '/@/assets/images/seafood.png';
  import pdfIconImage from '/@/assets/images/pdf-icon.png';
  const showDetail = ref(false);
</script>
<style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border-radius: 16px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    background: #f9f9fa;
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 40px;
    color: #e6e6e6;
    width: 145px;
    height: 145px;
    text-align: center;
  }
</style>

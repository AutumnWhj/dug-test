<template>
  <div>
    <el-popover placement="top-start" popper-class="tip-popover" :width="242" trigger="hover" :visible="showTip">
      <div class="text-base font-medium text-primary" @click="handleContact">如需人工帮助，可点击下方留言联系我们。</div>
      <template #reference>
        <div
          v-if="!showComment"
          class="flex w-14 h-14 items-center justify-center bg-white rounded-full cursor-pointer card-shadow"
          @click="showComment = true"
        >
          <el-image class="h-5 w-5" :src="commentImage" />
        </div>
      </template>
    </el-popover>
    <el-popover placement="top-start" popper-class="comment-popover" :width="437" trigger="hover" :visible="showComment">
      <div v-if="showComment" class="relative flex flex-col">
        <div v-if="successComment" class="flex flex-col items-center pt-16 justify-center">
          <div class="mb-10 text-black">我们会在24小时内通过邮件或电话联系您解决您的问题</div>
          <el-button
            class="rounded-3xl mb-6 mr-4 w-20"
            color="#2C72FE"
            @click="
              showComment = false;
              successComment = false;
            "
          >
            确认
          </el-button>
        </div>

        <div v-else class="flex flex-col">
          <div class="flex items-center w-full bg-primary rounded-t-2xl py-3 px-4 mb-2">
            <div class="bg-white h-9 w-9 rounded-full flex items-center justify-center mr-2">
              <el-image class="h-5" :src="logoImage" />
            </div>
            <div class="text-white font-medium">DUG service</div>
          </div>
          <el-input resize="none" type="textarea" :rows="4" placeholder="Type your message" />
          <el-button class="rounded-3xl self-end mb-4 mr-4 w-20" color="#2C72FE" @click="sendMessage"> Send </el-button>
        </div>

        <div class="absolute -bottom-24 left-20 px-4 py-3 card-shadow bg-white text-sm font-medium text-primary rounded-2xl">
          <div>Tel：+001 000 000 000</div>
          <div>Email：dugsolutions.com</div>
          <div>WeChat：dugsolutions</div>
        </div>
      </div>
      <template #reference>
        <div
          v-if="showComment"
          class="flex w-14 h-14 items-center justify-center bg-white rounded-full cursor-pointer card-shadow"
          @click="showComment = false"
        >
          <el-image class="h-5 w-5" :src="closeIcon" />
        </div>
      </template>
    </el-popover>
  </div>
</template>
<script lang="ts" setup>
  import commentImage from '/@/assets/images/leave_message_comment.png';
  import closeIcon from '/@/assets/images/close.png';
  import logoImage from '/@/assets/images/logo.png';
  const showTip = ref(localStorage.getItem('showTip') !== '1');
  const showComment = ref(false);
  const successComment = ref(false);
  const handleContact = () => {
    localStorage.setItem('showTip', '1');
  };
  const sendMessage = () => {
    console.log('sendMessage: 1212');
  };
</script>
<style lang="less">
  .tip-popover {
    padding: 28px 22px !important;
    border-radius: 16px;
  }
  .el-popover,
  .comment-popover {
    padding: 0 !important;
    border-radius: 16px !important;
    box-shadow: 0px 4px 24px 0px rgba(4, 3, 73, 0.31) !important;
    .el-textarea__inner {
      box-shadow: unset;
      border: none;
    }
  }
</style>

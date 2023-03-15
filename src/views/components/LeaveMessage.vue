<template>
  <div class="hidden md:block">
    <el-popover placement="top-start" popper-class="tip-popover" :width="256" trigger="hover" :visible="showTip">
      <div v-if="!showComment" class="text-base font-medium text-primary">{{ $t('leaveMessage.tip') }}</div>
      <template #reference>
        <div
          v-show="!showComment"
          class="flex w-14 h-14 items-center justify-center bg-white rounded-full cursor-pointer card-shadow"
          @click="handleContact"
        >
          <el-image class="h-5 w-5" :src="commentImage" />
        </div>
      </template>
    </el-popover>
    <el-popover placement="top-start" popper-class="comment-popover" :width="437" trigger="hover" :visible="showComment">
      <div v-if="showComment" class="relative flex flex-col">
        <div v-if="successComment" class="flex flex-col items-center pt-16 justify-center">
          <div class="mb-10 text-black px-6">{{ $t('leaveMessage.notice') }}</div>
          <el-button
            class="rounded-3xl mb-6 mr-4 w-20"
            color="#2C72FE"
            @click="
              showComment = false;
              successComment = false;
            "
          >
            {{ $t('leaveMessage.commentBtn') }}
          </el-button>
        </div>

        <div v-else class="flex flex-col">
          <div class="flex items-center w-full bg-primary rounded-t-2xl py-3 px-4 mb-2">
            <div class="bg-white h-9 w-9 rounded-full flex items-center justify-center mr-2">
              <el-image class="h-5" :src="logoImage" />
            </div>
            <div class="text-white font-medium">DUG service</div>
          </div>
          <el-input v-model="leaveMessage" resize="none" type="textarea" :rows="4" :placeholder="$t('leaveMessage.typeMessage')" />
          <el-button class="!rounded-3xl self-end mb-4 mr-4 w-20" color="#2C72FE" @click="sendMessage">
            {{ $t('leaveMessage.sendText') }}
          </el-button>
        </div>

        <div class="absolute -bottom-24 left-20 px-4 py-3 card-shadow bg-white text-sm font-medium text-primary rounded-2xl">
          <div>Tel:{{ $t('home.ContactInfo.Tel') }}</div>
          <div>Email：{{ $t('home.ContactInfo.Email') }}</div>
          <div>WeChat：{{ $t('home.ContactInfo.WeChat') }}</div>
        </div>
      </div>
      <template #reference>
        <div
          v-show="showComment"
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
  import { leaveMessage as leaveMessageApi } from '/@/api/user/index';

  const showTip = ref(localStorage.getItem('showTip') !== '1');
  const showComment = ref(false);
  const successComment = ref(false);
  const leaveMessage = ref('');
  const handleContact = () => {
    showComment.value = true;
    showTip.value = false;
    localStorage.setItem('showTip', '1');
  };
  const sendMessage = async () => {
    await leaveMessageApi({
      message: leaveMessage.value,
    });
    successComment.value = true;
    leaveMessage.value = '';
  };
</script>
<style lang="less">
  .tip-popover {
    padding: 28px 22px !important;
    border-radius: 16px !important;
    display: none;
  }
  @media (min-width: 768px) {
    .tip-popover {
      display: block;
    }
  }
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

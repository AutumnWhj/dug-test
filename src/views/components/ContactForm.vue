<template>
  <div class="contact-form w-full flex flex-col items-center w-2/5 max-w-[500px] border border-gray-200 rounded py-10 px-10 flex-1">
    <div class="mb-6 text-center">
      <p class="text-gray-700 mb-3 text-lg">请留系您的联系方式</p>
      <p class="text-gray-700/50 text-sm">我们会有专人联系您来解决您的问题</p>
    </div>
    <el-form class="w-full" ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large" status-icon>
      <el-form-item prop="name">
        <el-input v-model="ruleForm.name" placeholder="姓名" />
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" placeholder="电子邮箱" />
      </el-form-item>
      <el-form-item prop="phone_number">
        <el-input v-model="ruleForm.phone_number" placeholder="联系电话" />
      </el-form-item>
      <el-form-item prop="message">
        <el-input v-model="ruleForm.message" type="textarea" resize="none" :rows="5" placeholder="请描述一下你想咨询的内容" />
      </el-form-item>
      <div class="w-full flex justify-center mt-10">
        <el-button
          class="w-3/5 !h-16 !rounded-[36px] !font-bold text-white !text-lg"
          size="large"
          round
          color="#070707"
          @click="submitForm(ruleFormRef)"
        >
          <div class="py-4">Leave us a message</div>
        </el-button>
      </div>
    </el-form>
  </div>
  <Feedback v-if="dialogVisible" v-model="dialogVisible" />
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import Feedback from '/@/components/Dialog/Feedback.vue';
  import { leaveMessage } from '/@/api/user/index';
  const dialogVisible = ref(false);
  const ruleFormRef = ref<FormInstance>();
  const initForm = {
    name: '',
    email: '',
    phone_number: '',
    message: '',
  };
  const ruleForm = reactive({
    ...initForm,
  });
  const rules = reactive<FormRules>({});
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        const { name, email, phone_number, message } = ruleForm;
        if (!name || !email || !phone_number || !message) {
          ElMessage.warning('请输入您的联系方式及问题，我们会有专人联系您解决问题');
          return;
        }
        await leaveMessage(ruleForm);
        dialogVisible.value = true;
        Object.assign(ruleForm, initForm);
        console.log('submit!');
      } else {
        console.log('error submit!', fields);
      }
    });
  };
</script>
<style lang="less">
  .contact-form {
    .el-input__wrapper {
      background: transparent !important;
    }
    .el-textarea__inner {
      background: transparent;
    }
  }
</style>

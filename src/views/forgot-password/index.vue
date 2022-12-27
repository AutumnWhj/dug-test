<template>
  <div class="pt-4 flex flex-col items-center">
    <el-image class="h-28 mb-10" :src="logoTextImage" />
    <div class="min-w-96 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="text-center mb-8">
        <div class="text-gray-300 text-xl mb-3">找回密码</div>
        <div class="text-gray-300/50 text-sm">请输入您的注册邮箱</div>
      </div>
      <el-form class="w-full mb-16" ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="邮箱" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="验证码" />
        </el-form-item>
      </el-form>
      <el-button class="w-full rounded-3xl mb-12" size="large" color="#2C72FE" @click="submitForm(ruleFormRef)"> Login </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import type { FormInstance, FormRules } from 'element-plus';
  import logoTextImage from '/@/assets/images/logo_text.png';
  const router = useRouter();
  const toLogin = () => {
    router.push('/login');
  };
  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive({
    name: '',
  });
  const rules = reactive<FormRules>({
    name: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
  });
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!');
        toLogin();
      } else {
        console.log('error submit!', fields);
      }
    });
  };
</script>

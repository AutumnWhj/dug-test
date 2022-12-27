<template>
  <div class="pt-4 flex flex-col items-center">
    <el-image class="h-28 mb-10" :src="logoTextImage" />
    <div class="min-w-96 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="text-center mb-8">
        <div class="text-gray-300 text-xl mb-3">登录</div>
        <div class="text-gray-300/50 text-sm">欢迎回来</div>
      </div>
      <el-form class="w-full" ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="邮箱/电话号码" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="密码" />
        </el-form-item>
      </el-form>
      <div class="w-full flex justify-between items-center mb-16">
        <el-checkbox v-model="isRemember" label="记住密码" size="small" />
        <div class="text-primary text-xs cursor-pointer hover:text-blue-500/70" @click="toForgotPassword">忘记密码</div>
      </div>
      <el-button class="w-full rounded-3xl mb-12" size="large" color="#2C72FE" @click="submitForm(ruleFormRef)"> Login </el-button>
      <div class="text-center">
        <span class="text-gray-300/50 text-xs"> 没有账户？</span>
        <span class="text-primary text-xs cursor-pointer hover:text-blue-500/70" @click="toRegister">注册</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import type { FormInstance, FormRules } from 'element-plus';
  import logoTextImage from '/@/assets/images/logo_text.png';
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

  const isRemember = ref(false);
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!');
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  const router = useRouter();
  const toRegister = () => {
    router.push('/register');
  };
  const toForgotPassword = () => {
    router.push('/forgot-password');
  };
</script>

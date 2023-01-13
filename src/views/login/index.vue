<template>
  <div class="pt-4 flex flex-col items-center">
    <el-image class="h-28 mb-10" :src="logoTextImage" />
    <div class="min-w-96 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="text-center mb-8">
        <div class="text-gray-300 text-xl mb-3">登录</div>
        <div class="text-gray-300/50 text-sm">欢迎回来</div>
      </div>
      <el-form class="w-full" ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名" size="large" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="密码" />
        </el-form-item>
      </el-form>
      <div class="w-full flex justify-between items-center mb-16">
        <el-checkbox v-model="isRemember" label="记住密码" size="small" @change="handleCheckChange" />
        <div class="text-primary text-xs cursor-pointer hover:text-blue-500/70" @click="toForgotPassword">忘记密码</div>
      </div>
      <el-button class="w-full !rounded-3xl mb-12" size="large" color="#2C72FE" @click="submitForm(ruleFormRef)"> Login </el-button>
      <div class="text-center">
        <span class="text-gray-300/50 text-xs"> 没有账户？</span>
        <span class="text-primary text-xs cursor-pointer hover:text-blue-500/70" @click="toRegister">注册</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import logoTextImage from '/@/assets/images/logo_text.png';
  import { useUserStore } from '/@/store';
  import { isLogin } from '/@/utils/auth';
  const userStore = useUserStore();
  const ruleFormRef = ref<FormInstance>();
  let ruleForm = reactive({
    username: '',
    password: '',
  });

  const rules = reactive<FormRules>({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  });

  const isRemember = ref(false);
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        userStore.resetInfo();
        console.log('submit!11111', ruleForm);
        await userStore.login(ruleForm);
        if (isLogin()) {
          ElMessage.success('登录成功');
        } else {
          ElMessage.error(' 用户名或密码不正确');
          return;
        }
        router.push('/restaurant');
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

  const handleCheckChange = () => {
    if (isRemember.value) {
      sessionStorage.setItem('is_remember', JSON.stringify(ruleForm));
    } else {
      sessionStorage.removeItem('is_remember');
    }
  };
  onMounted(() => {
    const localString = sessionStorage.getItem('is_remember');
    if (localString) {
      ruleForm = JSON.parse(localString);
      isRemember.value = true;
    }
  });
</script>
<style lang="less" scoped>
  :deep(.el-input__wrapper) {
    box-shadow: none !important;
  }
</style>

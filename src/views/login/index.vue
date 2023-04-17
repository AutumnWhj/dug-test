<template>
  <div class="pt-4 flex flex-col items-center">
    <el-image class="h-17 w-17 mb-10" :src="logoTextImage" />
    <div class="min-w-96 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="text-center mb-8">
        <div class="text-gray-300/50 text-sm"> {{ $t('login.title') }} </div>
      </div>
      <el-form class="w-full" ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" :placeholder="$t('login.form.username')" size="large" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" :placeholder="$t('login.form.password')" />
        </el-form-item>
      </el-form>
      <div class="w-full flex justify-between items-center mb-16">
        <el-checkbox v-model="isRemember" :label="$t('login.form.remember')" size="small" @change="handleCheckChange" />
        <div class="text-primary text-xs cursor-pointer hover:text-blue-500/70" @click="toForgotPassword">{{
          $t('login.form.forgotPassword')
        }}</div>
      </div>
      <el-button class="w-full !rounded-3xl mb-12" size="large" color="#2C72FE" @click="submitForm(ruleFormRef)">
        {{ $t('login.btn') }}</el-button
      >
      <div class="text-center">
        <span class="text-gray-300/50 text-xs"> {{ $t('login.noAccount') }}</span>
        <span class="text-primary text-xs cursor-pointer hover:text-blue-500/70" @click="toRegister"> {{ $t('login.register') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import type { FormInstance } from 'element-plus';
  import logoTextImage from '/@/assets/images/logo_text.png';
  import { useUserStore } from '/@/store';
  import { isLogin } from '/@/utils/auth';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const userStore = useUserStore();
  const ruleFormRef = ref<FormInstance>();
  let ruleForm = reactive({
    username: '',
    password: '',
  });

  const rules = computed(() => {
    return {
      username: [{ required: true, message: t('login.rules.username'), trigger: 'blur' }],
      password: [{ required: true, message: t('login.rules.password'), trigger: 'blur' }],
    };
  });

  const isRemember = ref(false);
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        userStore.resetInfo();
        await userStore.login(ruleForm);
        if (isLogin()) {
          ElMessage.success(t('login.message.success'));
        } else {
          ElMessage.error(t('login.message.error'));
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
      const { username, password } = JSON.parse(localString) || {};
      ruleForm.username = username;
      ruleForm.password = password;
      isRemember.value = true;
    }
  });
</script>
<style lang="less" scoped>
  :deep(.el-input__wrapper) {
    box-shadow: none !important;
  }
</style>

<template>
  <div class="pt-4 flex flex-col items-center">
    <el-image class="h-28 w-28 mb-10" :src="logoTextImage" />
    <div class="min-w-96 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="text-center mb-8">
        <div class="text-gray-300 text-xl mb-3">{{ $t('forgot.find') }}</div>
        <div class="text-gray-300/50 text-sm">{{ $t('forgot.email') }}</div>
      </div>
      <el-form class="w-full mb-16" ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <el-form-item v-if="!hadVerify" prop="email">
          <el-input v-model="ruleForm.email" :placeholder="$t('forgot.form.email')" />
        </el-form-item>
        <el-form-item v-if="hadCode && !hadVerify" prop="code">
          <el-input v-model="ruleForm.code" :placeholder="$t('forgot.form.code')" />
        </el-form-item>
        <el-form-item v-if="hadVerify" prop="password">
          <el-input v-model="ruleForm.password" :placeholder="$t('forgot.form.password')" type="password" />
        </el-form-item>
        <el-form-item v-if="hadVerify" prop="repeatPassword">
          <el-input v-model="ruleForm.repeatPassword" :placeholder="$t('forgot.form.repeatPassword')" type="password" />
        </el-form-item>
        <el-form-item v-if="hadVerify">
          <password-strength :password="ruleForm.password" style="padding-top: 10px" />
        </el-form-item>
      </el-form>
      <el-button class="w-full !rounded-3xl mb-12" size="large" color="#2C72FE" @click="submitForm(ruleFormRef)">
        {{ buttonText }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { ElMessage, FormInstance } from 'element-plus';
  import logoTextImage from '/@/assets/images/logo_text.png';
  import { verifyEmail, resetPassword } from '/@/api/user/index';
  import { useUserStore } from '/@/store/index';
  import { setToken } from '/@/utils/auth';
  import passwordStrength from '/@/components/PasswordStrength/index.vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const userStore = useUserStore();

  const router = useRouter();
  const toLogin = () => {
    router.push('/login');
  };
  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive({
    email: '',
    code: '',
    password: '',
    repeatPassword: '',
  });
  const rules = computed(() => {
    return {
      email: [
        { required: true, message: t('forgot.rules.email'), trigger: 'blur' },
        {
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: t('forgot.rules.pattern'),
          trigger: 'blur',
        },
      ],
      code: [{ required: true, message: t('forgot.rules.code'), trigger: 'blur' }],
      password: [{ required: true, message: t('forgot.rules.password'), trigger: 'blur' }],
      repeatPassword: [{ required: true, message: t('forgot.rules.repeatPassword'), trigger: 'blur' }],
    };
  });
  const hadCode = ref(false);
  const hadVerify = ref(false);
  const verifyUserId = ref('');
  const buttonText = computed(() => {
    if (hadVerify.value) return t('forgot.code.hadVerify');
    return hadCode.value ? t('forgot.code.next') : t('forgot.code.hadCode');
  });
  // submitForm(ruleFormRef)
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        if (hadVerify.value) {
          if (ruleForm.repeatPassword !== ruleForm.password) {
            ElMessage.warning(t('forgot.message.warning'));
            return;
          }
          hadCode.value = false;
          await resetPassword({
            password: ruleForm.password,
            user_id: verifyUserId.value,
          });
          userStore.resetInfo();
          toLogin();
        }
        if (hadCode.value) {
          const { token, user_id } = await verifyEmail({ email: ruleForm.email, code: '8888' });
          setToken(token);
          verifyUserId.value = user_id;
          hadVerify.value = true;
        }
        hadCode.value = true;
      } else {
        console.log('error submit!', fields);
      }
    });
  };
</script>
<style lang="less" scoped>
  :deep(.el-input__wrapper) {
    box-shadow: none !important;
  }
</style>

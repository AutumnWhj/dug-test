<template>
  <div class="pt-4 flex flex-col items-center mb-24">
    <el-image class="h-28 w-28 mb-10" :src="logoTextImage" />
    <div class="min-w-96 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="text-center mb-8">
        <div class="text-gray-300 text-xl mb-3">{{ $t('register.register') }}</div>
        <div class="text-gray-300/50 text-sm">{{ $t('register.continue') }}</div>
      </div>
      <el-form class="w-full" ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <el-form-item prop="email">
          <el-input v-model="ruleForm.email" :placeholder="$t('register.form.email')" />
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" :placeholder="$t('register.form.username')" />
        </el-form-item>
        <el-form-item prop="phone_number">
          <el-input v-model="ruleForm.phone_number" :placeholder="$t('register.form.phone_number')" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" :placeholder="$t('register.form.password')" type="password" />
        </el-form-item>
        <el-form-item prop="repeatPassword">
          <el-input v-model="ruleForm.repeatPassword" :placeholder="$t('register.form.repeatPassword')" type="password" />
        </el-form-item>
        <el-form-item>
          <password-strength :password="ruleForm.password" style="padding-top: 10px" />
        </el-form-item>
      </el-form>
      <div class="w-full flex justify-between items-center mb-8">
        <el-checkbox v-model="isAgreement" label="记住密码" size="small">
          {{ $t('register.checkbox[0]') }}
          <span class="text-primary text-xs cursor-pointer hover:text-blue-500/70"> {{ $t('register.checkbox[1]') }}</span>
        </el-checkbox>
      </div>
      <el-button class="w-full !rounded-3xl mb-8" :disabled="!isAgreement" size="large" color="#2C72FE" @click="submitForm(ruleFormRef)">
        {{ $t('register.btn') }}
      </el-button>
      <div class="text-center">
        <span class="text-gray-300/50 text-xs"> {{ $t('register.hadAccount') }}</span>
        <span class="text-primary text-xs cursor-pointer hover:text-blue-500/70" @click="toLogin">{{ $t('register.login') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import type { FormInstance } from 'element-plus';
  import passwordStrength from '/@/components/PasswordStrength/index.vue';
  import logoTextImage from '/@/assets/images/logo_text.png';
  import { register } from '/@/api/user';
  import { useUserStore } from '/@/store';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const userStore = useUserStore();

  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive({
    email: '',
    username: '',
    password: '',
    phone_number: '',
    repeatPassword: '',
  });
  const validatorPassword = (_rule, value, callback) => {
    if (value && (value.length < 8 || value.length > 16)) {
      callback(t('register.rules.validatorPassword'));
    } else {
      callback();
    }
  };
  const rules = computed(() => {
    return {
      email: [
        { required: true, message: t('register.rules.email'), trigger: 'blur' },
        {
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: t('register.rules.pattern'),
          trigger: 'blur',
        },
      ],
      username: [
        { required: true, message: t('register.rules.username'), trigger: 'blur' },
        {
          pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
          message: t('register.rules.usernamePattern'),
          trigger: 'blur',
        },
      ],
      phone_number: [{ required: true, message: t('register.rules.phone_number'), trigger: 'blur' }],
      password: [
        { required: true, message: t('register.rules.password'), trigger: 'blur' },
        { validator: validatorPassword, trigger: 'blur' },
      ],
      repeatPassword: [
        { required: true, message: t('register.rules.repeatPassword'), trigger: 'blur' },
        { validator: validatorPassword, trigger: 'blur' },
      ],
    };
  });

  const isAgreement = ref(false);
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log('submit!', ruleForm);
        if (ruleForm.repeatPassword !== ruleForm.password) {
          ElMessage.warning(t('register.message.warning'));
          return;
        }
        await register(ruleForm);
        ElMessage.success(t('register.message.success'));
        await userStore.login({
          username: ruleForm.username,
          password: ruleForm.password,
        });
        router.push('/start');
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  const router = useRouter();
  const toLogin = () => {
    router.push('/login');
  };
</script>

<style lang="less" scoped>
  :deep(.el-input__wrapper) {
    box-shadow: none !important;
  }
</style>

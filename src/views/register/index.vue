<template>
  <div class="pt-4 flex flex-col items-center">
    <el-image class="h-28 mb-10" :src="logoTextImage" />
    <div class="min-w-96 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="text-center mb-8">
        <div class="text-gray-300 text-xl mb-3">注册</div>
        <div class="text-gray-300/50 text-sm">创建帐户以继续！</div>
      </div>
      <el-form class="w-full" ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <el-form-item prop="email">
          <el-input v-model="ruleForm.email" placeholder="你的邮箱" />
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="你的名字" />
        </el-form-item>
        <el-form-item prop="phone_number">
          <el-input v-model="ruleForm.phone_number" placeholder="你的电话" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" placeholder="密码" type="password" />
        </el-form-item>
        <el-form-item prop="repeatPassword">
          <el-input v-model="ruleForm.repeatPassword" placeholder="再次输入密码" type="password" />
        </el-form-item>
        <el-form-item>
          <password-strength :password="ruleForm.password" style="padding-top: 10px" />
        </el-form-item>
      </el-form>
      <div class="w-full flex justify-between items-center mb-8">
        <el-checkbox v-model="isAgreement" label="记住密码" size="small">
          通过创建帐户，您同意我们的
          <span class="text-primary text-xs cursor-pointer hover:text-blue-500/70">条款和条件</span>
        </el-checkbox>
      </div>
      <el-button class="w-full rounded-3xl mb-8" :disabled="!isAgreement" size="large" color="#2C72FE" @click="submitForm(ruleFormRef)">
        Register
      </el-button>
      <div class="text-center">
        <span class="text-gray-300/50 text-xs"> 已经有账户了？</span>
        <span class="text-primary text-xs cursor-pointer hover:text-blue-500/70" @click="toLogin">登录</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import passwordStrength from '/@/components/PasswordStrength/index.vue';
  import logoTextImage from '/@/assets/images/logo_text.png';
  import { register } from '/@/api/user';

  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive({
    email: '',
    username: '',
    password: '',
    phone_number: '',
    repeatPassword: '',
  });
  const validatorPassword = (_rule, value, callback) => {
    if (value !== ruleForm.password) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };
  const rules = reactive<FormRules>({
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      {
        pattern:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: '请输入正确的邮箱',
        trigger: 'blur',
      },
    ],
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    phone_number: [{ required: true, message: '请输入电话', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    repeatPassword: [
      { required: true, message: '请再次输入密码', trigger: 'blur' },
      { validator: validatorPassword, trigger: 'blur' },
    ],
  });

  const isAgreement = ref(false);
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log('submit!', ruleForm);
        await register(ruleForm);
        ElMessage.success('注册成功');
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

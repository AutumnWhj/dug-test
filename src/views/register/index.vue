<template>
  <div class="pt-4 flex flex-col items-center">
    <el-image class="h-28 mb-10" :src="logoTextImage" />
    <div class="min-w-96 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="text-center mb-8">
        <div class="text-gray-300 text-xl mb-3">注册</div>
        <div class="text-gray-300/50 text-sm">创建帐户以继续！</div>
      </div>
      <el-form class="w-full" ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="你的邮箱" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="你的名字" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="你的电话" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="密码" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="再次输入密码" />
        </el-form-item>
      </el-form>
      <div class="w-full flex justify-between items-center mb-8">
        <el-checkbox v-model="isRemember" label="记住密码" size="small">
          通过创建帐户，您同意我们的
          <span class="text-primary text-xs cursor-pointer hover:text-blue-500/70">条款和条件</span>
        </el-checkbox>
      </div>
      <el-button class="w-full rounded-2xl mb-8" size="large" color="#2C72FE" @click="submitForm(ruleFormRef)"> Register </el-button>
      <div class="text-center">
        <span class="text-gray-300/50 text-xs"> 已经有账户了？</span>
        <span class="text-primary text-xs cursor-pointer hover:text-blue-500/70" @click="toLogin">登录</span>
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
  const toLogin = () => {
    router.push('/login');
  };
</script>

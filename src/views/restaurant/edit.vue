<template>
  <div class="flex flex-col items-center relative mt-16">
    <div class="w-2/5 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="text-center mb-8">
        <div class="text-gray-300 text-xl mb-3">填写您的餐厅资料</div>
        <div class="text-gray-300/50 text-sm">你好，XXX(你的名字)</div>
      </div>
      <el-form class="w-full" ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <el-form-item prop="name" label="餐厅名称">
          <el-input v-model="ruleForm.name" placeholder="请输入餐厅名称" />
        </el-form-item>
        <el-form-item prop="address" label="餐厅地址">
          <el-input v-model="ruleForm.address" placeholder="请输入餐厅地址" />
        </el-form-item>
        <el-form-item prop="phone_number" label="联系电话">
          <el-input v-model="ruleForm.phone_number" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item prop="time" label="获取Summary order时间">
          <el-select v-model="ruleForm.time" size="large" placeholder="请选择获取时间" class="w-full">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="imageUrl">
          <div class="w-full flex items-center">
            <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              accept="image/png, image/jpeg"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-image v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <div class="ml-6 text-gray-300/50 text-sm">请添加餐厅LOGO（PNG格式）</div>
          </div>
        </el-form-item>
      </el-form>
      <el-button class="w-2/3 self-center !rounded-3xl mt-9 mb-8" size="large" color="#2C72FE" @click="submitForm(ruleFormRef)">
        添加餐厅
      </el-button>
    </div>
  </div>
  <LeaveMessage class="fixed left-14 bottom-14 w-auto" />
</template>

<script lang="ts" setup>
  import LeaveMessage from '../components/LeaveMessage.vue';
  import { ElMessage } from 'element-plus';
  import { Plus } from '@element-plus/icons-vue';
  import type { FormInstance, FormRules, UploadProps } from 'element-plus';

  const ruleFormRef = ref<FormInstance>();
  let ruleForm = reactive({
    name: '',
    address: '',
    phone_number: '',
    time: '',
  });

  const rules = reactive<FormRules>({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  });
  const options = [
    {
      value: '每三天一次',
      label: '每三天一次',
    },
    {
      value: '每五天一次',
      label: '每五天一次',
    },
    {
      value: '每七天一次',
      label: '每七天一次',
    },
  ];
  const imageUrl = ref('');

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    console.log('uploadFile111: ', uploadFile, response);
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // if (rawFile.type !== 'image/jpeg') {
    //   ElMessage.error('Avatar picture must be JPG format!');
    //   return false;
    // } else
    if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('Avatar picture size can not exceed 2MB!');
      return false;
    }
    return true;
  };

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log('submit!11111', ruleForm);
      } else {
        console.log('error submit!', fields);
      }
    });
  };
</script>
<style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border-radius: 16px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    background: #f9f9fa;
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 40px;
    color: #e6e6e6;
    width: 145px;
    height: 145px;
    text-align: center;
  }
</style>

<template>
  <div class="flex flex-col items-center relative my-12 mx-5 md:mx-0">
    <div class="w-full md:w-2/5 md:min-w-xl card-shadow flex flex-col bg-white py-10 px-4 md:px-12 rounded-3xl">
      <div class="text-center mb-8">
        <!-- <div class="text-gray-300 text-xl mb-3">填写您的餐厅资料</div>
        <div class="text-gray-300/50 text-sm">你好，XXX(你的名字)</div> -->
        <div class="text-primary font-bold text-xl">你好，{{ username }}</div>
      </div>
      <el-form class="w-full" ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name">
            <template #prefix> <div class="!mr-5">餐厅名称</div> </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="address">
          <el-input v-model="ruleForm.address">
            <template #prefix> <div class="!mr-5">餐厅地址</div> </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone_number">
          <el-input v-model="ruleForm.phone_number">
            <template #prefix> <div class="!mr-5">联系电话</div> </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="kind">
          <el-select v-model="ruleForm.kind" size="large" placeholder="请选择获取时间" class="w-full">
            <template #prefix> <div class="!mr-5">获取Summary order时间</div> </template>

            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="image">
          <div class="w-full flex items-center">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              accept="image/png, image/jpeg"
              :before-upload="beforeAvatarUpload"
              :http-request="httpRequest"
            >
              <el-image v-if="ruleForm.image" :src="ruleForm.image" class="w-24 md:w-42" />
              <!-- <el-icon v-else ><Plus /></el-icon> -->
              <div v-else class="avatar-uploader-icon flex items-center justify-center">
                <el-image class="w-6 md:w-10" :src="plusImage" />
              </div>
            </el-upload>
            <div class="ml-6 text-gray-300/50 text-sm">请添加餐厅LOGO（PNG格式）</div>
          </div>
        </el-form-item>
      </el-form>
      <el-button class="w-2/3 self-center !rounded-3xl mt-6" size="large" color="#2C72FE" @click="submitForm(ruleFormRef)">
        绑定平台
      </el-button>
    </div>
    <el-image class="w-12 h-12 mt-5 cursor-pointer" :src="closeIcon" @click="handleClose" />
  </div>
  <LeaveMessage class="fixed left-14 bottom-14 w-auto" />
</template>

<script lang="ts" setup>
  import LeaveMessage from '../components/LeaveMessage.vue';
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules, UploadProps } from 'element-plus';
  import plusImage from '/@/assets/images/plus.png';
  import closeIcon from '/@/assets/images/close-icon.png';

  import { createRestaurant, updateRestaurant, getRestaurantDetail } from '/@/api/user/index';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '/@/store/index';
  import { uploadFile } from '/@/utils/upload';
  const route = useRoute();
  const router = useRouter();
  const { restaurantId } = route.query;
  console.log('restaurantId-----: ', restaurantId);
  const restaurantInfo: any = ref({});
  const userStore = useUserStore();
  const { user_id, username } = userStore;

  const handleClose = () => {
    router.push('/restaurant');
  };
  const ruleFormRef = ref<FormInstance>();
  let ruleForm = reactive({
    name: '',
    address: '',
    phone_number: '',
    kind: '',
    image: '',
  });

  onBeforeMount(async () => {
    if (restaurantId) {
      const data = await getRestaurantDetail({ restaurant_id: Number(restaurantId) });
      console.log('getRestaurantDetail---data: ', data);
      restaurantInfo.value = data;
      const { image, kind, name, address, phone_number } = data;
      ruleForm.name = name;
      ruleForm.image = image;
      ruleForm.kind = kind;
      ruleForm.address = address;
      ruleForm.phone_number = phone_number;
    }
  });

  const rules = reactive<FormRules>({
    name: [{ required: true, message: '请输入餐厅名称', trigger: 'blur' }],
    address: [{ required: true, message: '请输入餐厅地址', trigger: 'blur' }],
    phone_number: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
    kind: [{ required: true, message: '请选择获取Summary order时间', trigger: 'blur' }],
    // image: [{ required: true, message: '请添加餐厅LOGO', trigger: 'blur' }],
  });
  const options = [
    {
      value: 0,
      label: '每三天一次',
    },
    {
      value: 1,
      label: '每五天一次',
    },
    {
      value: 2,
      label: '每七天一次',
    },
  ];
  const httpRequest = async (params) => {
    const { file } = params;
    const url = await uploadFile(file);
    ruleForm.image = `https://${url}`;
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // if (rawFile.type !== 'image/jpeg') {
    //   ElMessage.error('Avatar picture must be JPG format!');
    //   return false;
    // } else
    if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('LOGO大小不能超过 2MB!');
      return false;
    }
    return true;
  };

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        if (restaurantId) {
          await updateRestaurant({ ...ruleForm, restaurant_id: Number(restaurantId) });
          router.push(`/bind?id=${restaurantId}`);
        } else {
          const params = {
            ...ruleForm,
            user_id,
          };
          console.log('params: ', params);
          const id = await createRestaurant(params);
          ElMessage.success('新建成功');
          router.push(`/agreement?id=${id}`);
        }
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

  .avatar-uploader-icon {
    font-size: 40px;
    color: #e6e6e6;
    width: 145px;
    height: 145px;
    text-align: center;
  }
</style>

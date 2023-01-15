<template>
  <div class="flex flex-col items-center relative mt-12">
    <div class="w-2/5 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="w-full flex flex-col">
        <div class="text-center mb-8">
          <div class="text-gray-300 text-xl mb-3">绑定外卖平台</div>
          <div class="text-gray-300/50 text-sm">选择"{{ restaurant.name }}"使用的外卖平台</div>
        </div>
        <div class="mb-4 bg-gray-800 px-12 py-6 rounded-2xl">
          <div class="flex flex-col justify-between">
            <div class="flex justify-between items-center">
              <el-image class="h-12 mr-3" :src="DoorDashImage">
                <template #error>
                  <div class="w-full h-full flex items-center justify-center">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <el-button
                class="!w-28 self-center !rounded-3xl"
                :color="doordashButtonStyle?.color"
                size="large"
                :plain="doordashButtonStyle?.type === 'plain'"
                @click="handlePlatform('doordash')"
              >
                {{ doordashButtonStyle?.text }}
              </el-button>
            </div>
            <el-form class="w-full mt-7" ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
              <el-form-item prop="doordash_username">
                <el-input v-model="ruleForm.doordash_username" placeholder="DooDash账号" size="large" />
              </el-form-item>
              <el-form-item prop="doordash_password">
                <el-input type="doordash_password" v-model="ruleForm.doordash_password" placeholder="DooDash密码" />
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="mb-4 bg-gray-800 px-12 py-6 rounded-2xl">
          <div class="flex flex-col justify-between">
            <div class="flex justify-between items-center">
              <el-image class="h-12 mr-3" :src="UberEatsImage">
                <template #error>
                  <div class="w-full h-full flex items-center justify-center">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <el-button
                class="!w-28 self-center !rounded-3xl"
                :color="ubereatsButtonStyle?.color"
                size="large"
                :plain="ubereatsButtonStyle?.type === 'plain'"
                @click="handlePlatform('ubereats')"
              >
                {{ ubereatsButtonStyle?.text }}
              </el-button>
            </div>
            <div class="mt-4">
              <div class="text-#8F92A1 text-sm">请把我们官方邮箱绑定到您的UberEats账号下</div>
              <a class="text-primary" href="dugsolutions.com" target="_blank">dugsolutions.com</a>
            </div>
          </div>
        </div>
        <div class="mb-4 bg-gray-800 px-12 py-6 rounded-2xl">
          <div class="flex flex-col justify-between">
            <div class="flex justify-between items-center">
              <el-image class="h-12 mr-3" :src="GrubHubImage">
                <template #error>
                  <div class="w-full h-full flex items-center justify-center">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <el-button
                class="!w-28 self-center !rounded-3xl"
                :color="grubhubButtonStyle?.color"
                size="large"
                :plain="grubhubButtonStyle?.type === 'plain'"
                @click="handlePlatform('grubhub')"
              >
                {{ grubhubButtonStyle?.text }}
              </el-button>
            </div>
            <div class="mt-4">
              <div class="text-#8F92A1 text-sm">请把我们官方邮箱绑定到您的UberEats账号下</div>
              <a class="text-primary" href="dugsolutions.com" target="_blank">dugsolutions.com</a>
            </div>
          </div>
        </div>
        <el-button class="w-2/3 self-center !rounded-3xl" size="large" color="#2C72FE" @click="toAddRestaurant"> 添加完成 </el-button>
        <div class="text-#8F92A1 text-sm mt-5 text-center">如需验证，我们有专人联系您来通过验证</div>
      </div>
    </div>
  </div>
  <LeaveMessage class="fixed left-14 bottom-14 w-auto" />
</template>

<script lang="ts" setup>
  import LeaveMessage from '../components/LeaveMessage.vue';
  import { Picture as IconPicture } from '@element-plus/icons-vue';
  import { FormInstance, FormRules } from 'element-plus';
  import { updateRestaurant, getRestaurantDetail } from '/@/api/user/index';
  import { useRouter, useRoute } from 'vue-router';
  import DoorDashImage from '/@/assets/images/DoorDash1.png';
  import UberEatsImage from '/@/assets/images/UberEats.png';
  import GrubHubImage from '/@/assets/images/GrubHub.png';
  const router = useRouter();
  const route = useRoute();
  const { id: restaurantId } = route.query;

  const ruleFormRef = ref<FormInstance>();
  let ruleForm = reactive({
    doordash_username: '',
    doordash_password: '',
  });

  const rules = reactive<FormRules>({
    doordash_username: [{ required: true, message: '请输入DooDash账号', trigger: 'blur' }],
    doordash_password: [{ required: true, message: '请输入DooDash密码', trigger: 'blur' }],
  });

  const restaurant: any = ref([]);
  onBeforeMount(async () => {
    const data = await getRestaurantDetail({ restaurant_id: Number(restaurantId) });
    console.log('data----: ', data);
    restaurant.value = data;
  });
  const checkButtonStatus = (status) => {
    if (status === 0) return { text: '添加', color: '#2C72FE' };
    if (status === 1) return { text: '绑定成功', color: '#2C72FE', type: 'plain' };
    if (status === 2) return { text: '审核中', color: '#A6A6A6' };
  };
  // Status为0  未绑定  1 已绑定  2审核中
  const doordashButtonStyle = computed(() => {
    const { doordash_status } = restaurant.value;
    if (doordash_status === 0) return { text: '提交', color: '#2C72FE', type: '' };
    return checkButtonStatus(doordash_status);
  });
  const ubereatsButtonStyle = computed(() => {
    const { ubereats_status } = restaurant.value;
    return checkButtonStatus(ubereats_status);
  });
  const grubhubButtonStyle = computed(() => {
    const { grubhub_status } = restaurant.value;
    return checkButtonStatus(grubhub_status);
  });

  const toAddRestaurant = () => {
    router.push('/restaurant');
  };
  const handlePlatform = async (platform) => {
    console.log('platform:az ', platform);
    const { doordash_status, ubereats_status, grubhub_status } = restaurant.value;
    if (platform === 'doordash' && doordash_status === 0) {
      await submitForm(ruleFormRef.value, {
        ...ruleForm,
      });
    } else if (platform === 'ubereats' && ubereats_status === 0) {
      if (restaurantId) {
        await updateRestaurant({ ubereats_binding: 1, restaurant_id: Number(restaurantId) });
      }
    } else if (platform === 'grubhub' && grubhub_status === 0) {
      if (restaurantId) {
        await updateRestaurant({ grubhub_binding: 1, restaurant_id: Number(restaurantId) });
      }
    }
    restaurant.value = await getRestaurantDetail({ restaurant_id: Number(restaurantId) });
  };
  const submitForm = async (formEl: FormInstance | undefined, data) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        if (restaurantId) {
          await updateRestaurant({ ...data, restaurant_id: Number(restaurantId) });
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
    background: #fff !important;
  }
</style>

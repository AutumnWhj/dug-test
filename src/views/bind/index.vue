<template>
  <div class="flex flex-col items-center relative my-12 mx-5 md:mx-0">
    <div class="w-full md:w-2/5 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="w-full flex flex-col">
        <div class="text-center mb-8">
          <div class="text-gray-300 text-xl mb-3">{{ !restaurantId ? '绑定外卖平台' : '完善绑定外卖平台' }} </div>
          <div class="text-gray-300/50 text-sm"
            >{{ !restaurantId ? '选择一个您餐厅常使用的外卖平台做首次绑定' : '将您使用的其他外卖平台进行绑定' }}
          </div>
        </div>
        <el-radio-group v-model="radioPlatform">
          <div :key="'doordash'" class="mb-4 bg-gray-800 px-12 py-6 rounded-2xl w-full" @click="radioPlatform = 'doordash'">
            <div class="flex flex-col justify-between">
              <div class="flex justify-between items-center">
                <el-image class="h-12 w-32 mr-3" :src="DoorDashImage">
                  <template #error>
                    <div class="w-full h-full flex items-center justify-center">
                      <el-icon><icon-picture /></el-icon>
                    </div>
                  </template>
                </el-image>
                <el-button
                  v-if="restaurantId"
                  class="!min-w-28 self-center !rounded-3xl"
                  color="#2C72FE"
                  size="large"
                  :type="getButtonStyle('doordash')?.type"
                  @click="handlePlatform('doordash')"
                >
                  {{ getButtonStyle('doordash')?.text }}
                </el-button>
                <el-radio v-else label="doordash" />
              </div>
              <el-form
                v-show="checkShowForm('doordash')"
                class="w-full mt-7"
                ref="doordashRef"
                :model="ruleForm"
                :rules="platformsRules[0]"
                size="large"
              >
                <el-form-item prop="doordash_username">
                  <el-input v-model="ruleForm[`${'doordash'}_username`]" :placeholder="`DoorDash账号`" size="large" />
                </el-form-item>
                <el-form-item prop="doordash_password">
                  <el-input type="doordash_password" v-model="ruleForm[`${'doordash'}_password`]" :placeholder="`DoorDash密码`" />
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div :key="'ubereats'" class="mb-4 bg-gray-800 px-12 py-6 rounded-2xl w-full" @click="radioPlatform = 'ubereats'">
            <div class="flex flex-col justify-between">
              <div class="flex justify-between items-center">
                <el-image class="h-12 w-32 mr-3" :src="UberEatsImage">
                  <template #error>
                    <div class="w-full h-full flex items-center justify-center">
                      <el-icon><icon-picture /></el-icon>
                    </div>
                  </template>
                </el-image>
                <el-button
                  v-if="restaurantId"
                  class="!min-w-28 self-center !rounded-3xl"
                  color="#2C72FE"
                  size="large"
                  :type="getButtonStyle('ubereats')?.type"
                  @click="handlePlatform('ubereats')"
                >
                  {{ getButtonStyle('ubereats')?.text }}
                </el-button>
                <el-radio v-else label="ubereats" />
              </div>
              <el-form
                v-show="checkShowForm('ubereats')"
                class="w-full mt-7"
                ref="ubereatsRef"
                :model="ruleForm"
                :rules="platformsRules[1]"
                size="large"
              >
                <el-form-item prop="ubereats_username">
                  <el-input v-model="ruleForm[`${'ubereats'}_username`]" :placeholder="`UberEats账号`" size="large" />
                </el-form-item>
                <el-form-item prop="ubereats_password">
                  <el-input type="ubereats_password" v-model="ruleForm[`${'ubereats'}_password`]" :placeholder="`UberEats密码`" />
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div :key="'grubhub'" class="mb-4 bg-gray-800 px-12 py-6 rounded-2xl w-full" @click="radioPlatform = 'grubhub'">
            <div class="flex flex-col justify-between">
              <div class="flex justify-between items-center">
                <el-image class="h-12 w-32 mr-3" :src="GrubHubImage">
                  <template #error>
                    <div class="w-full h-full flex items-center justify-center">
                      <el-icon><icon-picture /></el-icon>
                    </div>
                  </template>
                </el-image>
                <el-button
                  v-if="restaurantId"
                  class="!min-w-28 self-center !rounded-3xl"
                  color="#2C72FE"
                  size="large"
                  :type="getButtonStyle('grubhub')?.type"
                  @click="handlePlatform('grubhub')"
                >
                  {{ getButtonStyle('grubhub')?.text }}
                </el-button>
                <el-radio v-else label="grubhub" />
              </div>
              <el-form
                v-show="checkShowForm('grubhub')"
                class="w-full mt-7"
                ref="grubhubRef"
                :model="ruleForm"
                :rules="platformsRules[2]"
                size="large"
              >
                <el-form-item prop="grubhub_username">
                  <el-input v-model="ruleForm[`${'grubhub'}_username`]" :placeholder="`GrubHub账号`" size="large" />
                </el-form-item>
                <el-form-item prop="grubhub_password">
                  <el-input type="grubhub_password" v-model="ruleForm[`${'grubhub'}_password`]" :placeholder="`GrubHub密码`" />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-radio-group>

        <el-button class="w-2/3 self-center !rounded-3xl" size="large" color="#2C72FE" @click="toAddRestaurant"> 添加完成 </el-button>
        <div class="text-#8F92A1 text-sm mt-5 text-center">如需验证，我们有专人联系您来通过验证</div>
      </div>
    </div>
    <el-image class="w-12 h-12 mt-5 cursor-pointer" :src="closeIcon" @click="handleClose" />
  </div>
  <LeaveMessage class="fixed left-14 bottom-14 w-auto" />
</template>

<script lang="ts" setup>
  import LeaveMessage from '../components/LeaveMessage.vue';
  import { Picture as IconPicture } from '@element-plus/icons-vue';
  import { ElMessage, FormInstance } from 'element-plus';
  import { createRestaurant, updateRestaurant, getRestaurantDetail } from '/@/api/user/index';
  import { useRouter, useRoute } from 'vue-router';
  import { useUserStore } from '/@/store';
  import DoorDashImage from '/@/assets/images/DoorDash1.png';
  import UberEatsImage from '/@/assets/images/UberEats.png';
  import GrubHubImage from '/@/assets/images/GrubHub.png';
  import closeIcon from '/@/assets/images/close-icon.png';
  const router = useRouter();
  const route = useRoute();
  const userStore = useUserStore();
  const { id: restaurantId } = route.query || {};
  const radioPlatform = ref('doordash');
  let ruleForm = reactive({
    doordash_username: '',
    doordash_password: '',
    ubereats_username: '',
    ubereats_password: '',
    grubhub_username: '',
    grubhub_password: '',
  });
  const doordashRef = ref<FormInstance>();
  const ubereatsRef = ref<FormInstance>();
  const grubhubRef = ref<FormInstance>();
  const platformsRules = [
    {
      doordash_username: [{ required: true, message: '请输入DooDash账号', trigger: 'blur' }],
      doordash_password: [{ required: true, message: '请输入DooDash密码', trigger: 'blur' }],
    },
    {
      ubereats_username: [{ required: true, message: '请输入UberEats账号', trigger: 'blur' }],
      ubereats_password: [{ required: true, message: '请输入UberEats密码', trigger: 'blur' }],
    },
    {
      grubhub_username: [{ required: true, message: '请输入GrubHub账号', trigger: 'blur' }],
      grubhub_password: [{ required: true, message: '请输入GrubHub密码', trigger: 'blur' }],
    },
  ];
  const handleClose = () => {
    router.push('/restaurant');
  };

  const restaurant: any = ref({});
  onBeforeMount(async () => {
    const data = await getRestaurantDetail({ restaurant_id: Number(restaurantId) });
    restaurant.value = data;
  });
  const checkButtonStatus = (status) => {
    if (status === 0) return { text: '提交', type: 'primary' };
    if (status === 1) return { text: '绑定成功', type: 'text' };
    if (status === 2) return { text: '审核中...', type: 'text' };
    if (status === 3) return { text: '审核未通过，请核实账号密码重新输入', type: 'text' };
  };
  const checkShowForm = (platform) => {
    if (restaurantId) {
      return restaurant.value[`${platform}_status`] === 0 || restaurant.value[`${platform}_status`] === 3;
    } else {
      return radioPlatform.value === platform;
    }
  };
  // Status为0  未绑定  1 已绑定  2审核中 3 审核不通过
  const getButtonStyle = (key): any => {
    const status = restaurant.value[`${key}_status`];
    return checkButtonStatus(status);
  };

  const handlePlatform = async (platform) => {
    const { doordash_status, ubereats_status, grubhub_status } = restaurant.value;
    const {
      doordash_username = '',
      doordash_password = '',
      ubereats_username = '',
      ubereats_password = '',
      grubhub_username = '',
      grubhub_password = '',
    } = ruleForm;
    if (platform === 'doordash' && doordash_status === 0) {
      await submitForm(doordashRef.value, {
        username: doordash_username,
        password: doordash_password,
        platform: 1,
      });
    } else if (platform === 'ubereats' && ubereats_status === 0) {
      await submitForm(ubereatsRef.value, {
        username: ubereats_username,
        password: ubereats_password,
        platform: 2,
      });
    } else if (platform === 'grubhub' && grubhub_status === 0) {
      await submitForm(grubhubRef.value, {
        username: grubhub_username,
        password: grubhub_password,
        platform: 3,
      });
    }
  };
  const submitForm = async (formEl: FormInstance | undefined, data) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
      if (valid) {
        if (restaurantId) {
          await updateRestaurant({ ...data, restaurant_id: Number(restaurantId) });
          restaurant.value = await getRestaurantDetail({ restaurant_id: Number(restaurantId) });
        } else {
          const { user_id } = userStore;
          const message = await createRestaurant({
            ...data,
            user_id,
          });
          if (typeof message === 'string') {
            ElMessage.warning(message);
          }
          router.push('/restaurant');
        }
      } else {
      }
    });
  };

  const toAddRestaurant = () => {
    if (restaurantId) {
      router.push('/restaurant');
    } else {
      console.log('radioPlatform.value: ', radioPlatform.value);
      handlePlatform(radioPlatform.value);
    }
  };
</script>
<style lang="less" scoped>
  :deep(.el-input__wrapper) {
    box-shadow: none !important;
    background: #fff !important;
  }
  :deep(.el-radio) {
    transform: scale(1.5);
  }
  :deep(.el-radio__label) {
    display: none;
  }
</style>

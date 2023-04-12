<template>
  <div class="flex flex-col items-center relative mt-12 mx-5 md:mx-0">
    <div class="w-full md:w-3/5 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="w-full flex flex-col">
        <div class="text-center mb-8">
          <div class="text-gray-300 text-xl mb-3">{{ $t('restaurant.title') }}</div>
          <div class="text-gray-300/50 text-sm">{{ $t('restaurant.subTitle') }}{{ username }}</div>
        </div>
        <el-empty v-if="restaurants.length === 0" :description="$t('restaurant.noData')" />
        <div v-for="(item, index) in restaurants" :key="item.id" class="mb-4 bg-gray-800 px-4 md:px-12 rounded-2xl">
          <div class="flex justify-between items-center h-28">
            <el-image class="h-12 w-32 mr-3" :src="platformMap[item.kind].image">
              <template #error>
                <div class="w-full h-full flex items-center justify-center">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
            <div v-if="item.status === 1" class="hidden md:flex items-center gap-4">
              <el-button plain class="!w-36 self-center !rounded-3xl relative mt-9 mb-8" size="large" color="#383838"
                >{{ $t('restaurant.choose') }}
                <el-select
                  v-model="time"
                  size="large"
                  :placeholder="$t('restaurantEdit.timePlaceholder')"
                  class="!w-full !absolute opacity-0"
                >
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-button>

              <el-button class="!w-36 self-center !rounded-3xl mt-9 mb-8" size="large" color="#2C72FE" @click="handleReport(item)">
                {{ $t('restaurant.check') }}
              </el-button>
            </div>
            <el-button v-if="item.status === 2" class="!w-36 self-center !rounded-3xl mt-9 mb-8" size="large" color="#2C72FE" type="text">
              {{ $t('restaurant.applying') }}...
            </el-button>
            <el-button
              v-if="item.status === 0"
              class="!w-36 self-center !rounded-3xl mt-9 mb-8"
              size="large"
              color="#2C72FE"
              type="primary"
              @click="submitForm(formRef, item.kind, index)"
            >
              {{ $t('restaurant.submit') }}
            </el-button>
          </div>
          <el-form
            v-show="item.status === 0"
            class="w-full mt-7"
            ref="formRef"
            :model="ruleForm"
            :rules="platformsRules[item.kind]"
            size="large"
          >
            <el-form-item prop="username">
              <el-input v-model="ruleForm[`username`]" :placeholder="$t(`bind.${platformMap[item.kind].name}.username`)" size="large" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm['password']" :placeholder="$t(`bind.${platformMap[item.kind].name}.password`)" />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
  <LeaveMessage class="fixed left-14 bottom-14 w-auto" />
</template>

<script lang="ts" setup>
  import type { FormInstance } from 'element-plus';
  import LeaveMessage from '../components/LeaveMessage.vue';
  import { Picture as IconPicture } from '@element-plus/icons-vue';
  import { getRestaurants, createRestaurant } from '/@/api/user/index';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '/@/store';
  import DoorDashImage from '/@/assets/images/DoorDash1.png';
  import UberEatsImage from '/@/assets/images/UberEats.png';
  import GrubHubImage from '/@/assets/images/GrubHub.png';
  import { useI18n } from 'vue-i18n';
  const time = ref('');
  const formRef = ref<FormInstance>();
  const platformMap = {
    1: {
      image: DoorDashImage,
      name: 'doordash',
    },
    2: {
      image: UberEatsImage,
      name: 'ubereats',
    },
    3: {
      image: GrubHubImage,
      name: 'grubhub',
    },
  };
  const { t } = useI18n();
  let ruleForm = reactive({
    username: '',
    password: '',
  });
  const platformsRules = computed(() => {
    return {
      1: {
        username: [{ required: true, message: t('bind.doordash.usernameRule'), trigger: 'blur' }],
        password: [{ required: true, message: t('bind.doordash.passwordRule'), trigger: 'blur' }],
      },
      2: {
        username: [{ required: true, message: t('bind.ubereats.usernameRule'), trigger: 'blur' }],
        password: [{ required: true, message: t('bind.ubereats.passwordRule'), trigger: 'blur' }],
      },
      3: {
        username: [{ required: true, message: t('bind.grubhub.usernameRule'), trigger: 'blur' }],
        password: [{ required: true, message: t('bind.grubhub.passwordRule'), trigger: 'blur' }],
      },
    };
  });
  const options = computed(() => {
    return [
      {
        value: 0,
        label: t('restaurantEdit.timeOptions[0]'),
      },
      {
        value: 1,
        label: t('restaurantEdit.timeOptions[1]'),
      },
      {
        value: 2,
        label: t('restaurantEdit.timeOptions[2]'),
      },
    ];
  });

  const router = useRouter();
  const restaurants: any = ref([]);
  const userStore = useUserStore();
  const { user_id, username } = userStore;
  const getList = async () => {
    const data = await getRestaurants({ user_id });
    console.log('data----: ', data);
    restaurants.value = data;
  };
  onBeforeMount(async () => {
    await getList();
  });

  const handleReport = (data) => {
    router.push(`/restaurant/detail?restaurantId=${data.kind}`);
  };

  const submitForm = async (formEl: FormInstance | undefined, kind, index) => {
    console.log('formEl111111: ', formEl, index);
    if (!formEl) return;
    await formEl[index].validate(async (valid, fields) => {
      if (valid) {
        await createRestaurant({
          user_id,
          platforms: [
            {
              ...ruleForm,
              kind,
            },
          ],
        });
        await getList();
      } else {
        console.log('error submit!', fields);
      }
    });
  };
</script>

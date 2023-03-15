<template>
  <div class="flex flex-col items-center relative mt-12 mx-5 md:mx-0">
    <div class="w-full md:w-3/5 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="w-full flex flex-col">
        <div class="text-center mb-8">
          <div class="text-gray-300 text-xl mb-3">{{ $t('restaurant.title') }}</div>
          <div class="text-gray-300/50 text-sm">{{ $t('restaurant.subTitle') }}{{ username }}</div>
        </div>
        <el-empty v-if="restaurants.length === 0" :description="$t('restaurant.noData')" />
        <div v-for="item in restaurants" :key="item.id" class="mb-4 bg-gray-800 px-4 md:px-12 rounded-2xl">
          <div v-if="item.status === 1" class="flex justify-between items-center h-28">
            <div class="flex items-center">
              <el-image class="h-16 w-16 md:h-20 md:w-20 mr-3 rounded-md" :src="item.image">
                <template #error>
                  <div class="w-full h-full flex items-center justify-center">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <div class="text-black font-medium text-sm">{{ item.name }}</div>
            </div>
            <div class="hidden md:flex items-center gap-4">
              <el-button
                plain
                class="!w-36 self-center !rounded-3xl mt-9 mb-8"
                size="large"
                color="#383838"
                @click="toEditRestaurant(item.id)"
                >{{ $t('restaurant.edit') }}</el-button
              >
              <el-button class="!w-36 self-center !rounded-3xl mt-9 mb-8" size="large" color="#2C72FE" @click="handleReport(item)">
                {{ $t('restaurant.check') }}
              </el-button>
            </div>
            <div class="flex md:hidden flex-1 items-center justify-end gap-2 md:gap-5">
              <div
                class="button-shadow bg-white p-3 md:px-5 md:py-2 flex items-center justify-center rounded-full md:rounded-2xl gap-3 cursor-pointer"
                @click="toEditRestaurant(item.id)"
              >
                <span class="text-gray-300 font-bold text-sm hidden md:block">{{ $t('restaurant.download') }}</span>
                <SvgIcon name="svg-edit" class="text-base text-gray-300 font-bold" />
              </div>
              <div
                class="button-shadow bg-primary p-3 flex text-white items-center justify-center rounded-full cursor-pointer"
                @click="handleReport(item)"
              >
                <SvgIcon name="svg-bluesearch" class="text-base text-white font-bold" />
              </div>
            </div>
          </div>
          <div v-if="item.status === 0" class="flex flex-col justify-center items-center h-28 font-medium">
            <div class="text-primary mb-1">{{ item.name }}...</div>
            <div>{{ item.address }}</div>
          </div>
        </div>
        <el-button
          :disabled="canNotAdd"
          plain
          class="w-2/3 self-center !rounded-3xl mt-48 md:mt-9 mb-8"
          size="large"
          color="#2C72FE"
          @click="toAddRestaurant"
        >
          {{ $t('restaurant.btn') }}
        </el-button>
      </div>
    </div>
  </div>
  <LeaveMessage class="fixed left-14 bottom-14 w-auto" />
</template>

<script lang="ts" setup>
  import LeaveMessage from '../components/LeaveMessage.vue';
  import { Picture as IconPicture } from '@element-plus/icons-vue';
  import { getRestaurants } from '/@/api/user/index';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '/@/store';
  const router = useRouter();
  const restaurants: any = ref([]);
  const userStore = useUserStore();
  const { user_id, username } = userStore;
  onBeforeMount(async () => {
    const data = await getRestaurants({ user_id });
    console.log('data----: ', data);
    restaurants.value = data;
  });
  const canNotAdd = computed(() => {
    return restaurants.value.some(({ status }) => status === 0);
  });

  const handleReport = (data) => {
    router.push(`/restaurant/detail?restaurantId=${data.id}`);
  };
  const toAddRestaurant = () => {
    router.push('/bind');
  };
  const toEditRestaurant = (restaurantId) => {
    router.push(`/restaurant/edit?restaurantId=${restaurantId}`);
  };
</script>

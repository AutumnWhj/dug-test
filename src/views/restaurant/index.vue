<template>
  <div class="flex flex-col items-center relative mt-12">
    <div class="w-3/5 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="w-full flex flex-col">
        <div class="text-center mb-8">
          <div class="text-gray-300 text-xl mb-3">请选择餐厅查看数据</div>
          <div class="text-gray-300/50 text-sm">你好，XXX(你的名字)</div>
        </div>
        <el-empty v-if="restaurants.length === 0" description="暂无数据" />
        <div v-for="item in restaurants" :key="item.id" class="mb-4 bg-gray-800 px-12 rounded-2xl">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <el-image class="h-20 w-20 mr-3 rounded-md" :src="item.image">
                <template #error>
                  <div class="w-full h-full flex items-center justify-center">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <div class="text-black font-medium text-sm">{{ item.name }}</div>
            </div>
            <div class="flex items-center gap-4">
              <el-button
                plain
                class="!w-36 self-center !rounded-3xl mt-9 mb-8"
                size="large"
                color="#383838"
                @click="toEditRestaurant(item.id)"
                >修改餐厅资料</el-button
              >
              <el-button class="!w-36 self-center !rounded-3xl mt-9 mb-8" size="large" color="#2C72FE" @click="handleReport(item)">
                查看报告
              </el-button>
            </div>
          </div>
        </div>
        <el-button plain class="w-2/3 self-center !rounded-3xl mt-9 mb-8" size="large" color="#2C72FE" @click="toAddRestaurant">
          添加餐厅
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
  onBeforeMount(async () => {
    const { user_id } = userStore;
    const data = await getRestaurants({ user_id });
    console.log('data----: ', data);
    restaurants.value = data;
  });

  const handleReport = (data) => {
    router.push(`/restaurant/detail?restaurantId=${data.id}`);
  };
  const toAddRestaurant = () => {
    router.push('/restaurant/edit');
  };
  const toEditRestaurant = (restaurantId) => {
    router.push(`/restaurant/edit?restaurantId=${restaurantId}`);
  };
</script>

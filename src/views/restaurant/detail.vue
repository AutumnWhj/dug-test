<template>
  <div class="flex flex-col items-center relative mt-12 mb-20">
    <div class="w-3/5 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="flex flex-col items-center">
        <div class="flex items-center self-center">
          <el-image v-if="hasPre" class="h-7 mr-5 cursor-pointer rotate-180" :src="arrowRightImage" @click="handleSwitchPage('pre')" />
          <el-image class="h-24 rounded-md" :src="currentRestaurant?.image" />
          <el-image v-if="hasNext" class="h-7 ml-5 cursor-pointer" :src="arrowRightImage" @click="handleSwitchPage('next')" />
        </div>
        <div class="text-black font-medium text-sm mt-2 mb-6">{{ currentRestaurant?.name }}</div>
      </div>
      <el-empty v-if="report.length === 0" description="暂未生成报告" />
      <el-checkbox-group v-model="checkList" @change="handleCheckChange">
        <div v-for="item in report" :key="item.id" class="report-list mb-4 bg-gray-800 p-5 rounded-2xl">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <el-checkbox :label="item.id" class="pr-6" />
              <el-image class="h-8 mr-3" :src="pdfIconImage" />
              <div class="text-black font-medium text-sm">{{ item.filename }}</div>
            </div>
            <div class="flex items-center gap-5">
              <div
                class="button-shadow bg-white p-3 flex items-center justify-center rounded-full cursor-pointer"
                @click="openPdf(item.filepath)"
              >
                <SvgIcon name="svg-search" class="text-base text-gray-300 font-bold" />
              </div>
              <div
                class="button-shadow bg-white px-5 py-2 flex items-center justify-center rounded-2xl gap-3 cursor-pointer"
                @click="handleDownload({ type: 'single', filename: item.filename, filepath: item.filepath })"
              >
                <span class="text-gray-300 font-bold text-sm">下载文档</span>
                <SvgIcon name="svg-download" class="text-base text-gray-300 font-bold" />
              </div>
            </div>
          </div>
        </div>
      </el-checkbox-group>
      <div v-if="report.length" class="flex justify-end items-center">
        <el-checkbox v-model="allCheck" label="全选" @change="handleCheckAll" />
        <div
          class="ml-4 button-shadow bg-white px-5 py-2 flex items-center justify-center rounded-2xl gap-3 cursor-pointer"
          @click="handleDownload({ type: 'all' })"
        >
          <span class="text-gray-300 font-bold text-sm">批量下载</span>
          <SvgIcon name="svg-download" class="text-base text-gray-300 font-bold" />
        </div>
      </div>
      <el-pagination
        v-if="report.length"
        class="flex justify-center mt-5"
        layout="prev, pager, next"
        :page-count="pageCount"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <LeaveMessage class="fixed left-14 bottom-14 w-auto" />
</template>

<script lang="ts" setup>
  import LeaveMessage from '../components/LeaveMessage.vue';
  import arrowRightImage from '/@/assets/images/arrow-right.png';
  import pdfIconImage from '/@/assets/images/pdf-icon.png';
  import { getRestaurantReport, getRestaurants } from '/@/api/user/index';
  import { useRoute } from 'vue-router';
  import { compressAndDownload, downloadFile } from '/@/utils/download';
  import { ElMessage } from 'element-plus';
  import router from '/@/router';
  import { useUserStore } from '/@/store';
  const report: any = ref([]);
  const restaurants: any = ref([]);
  const checkList: any = ref([]);
  const allCheck = ref(false);
  const route = useRoute();
  const pageCount = ref(0);
  const { restaurantId } = route.query;
  console.log('restaurantId: ', restaurantId);
  const userStore = useUserStore();
  const { user_id } = userStore;
  const defaultParams = reactive({
    user_id,
    restaurant_id: Number(restaurantId),
    page_num: 1,
  });

  const getReports = async (params) => {
    allCheck.value = false;
    checkList.value = [];
    const { list, page } = await getRestaurantReport(params);
    console.log('report---data----: ', list);
    report.value = list;
    if (!pageCount.value) {
      pageCount.value = page;
    }
  };
  onBeforeMount(async () => {
    await getReports(defaultParams);
    restaurants.value = await getRestaurants({ user_id });
  });
  const currentRestaurant = computed(() => {
    return restaurants.value.find((item) => item.id === Number(restaurantId));
  });
  const hasNext = computed(() => {
    const index = (restaurants.value || []).findIndex((item) => item.id === Number(restaurantId));
    return !!restaurants.value[index + 1];
  });
  const hasPre = computed(() => {
    const index = (restaurants.value || []).findIndex((item) => item.id === Number(restaurantId));
    return !!restaurants.value[index - 1];
  });

  watch(
    () => restaurantId,
    (value) => {
      console.log('value: ', value);
      getReports(defaultParams);
    },
  );

  const handleCheckChange = (value) => {
    console.log('handleCheckChange---value: ', value);
    // console.log('checkList: ', checkList);
  };
  const handleCheckAll = (value) => {
    console.log('handleCheckAll: ', value);
    if (value) {
      checkList.value = report.value.map(({ id }) => id);
    }
  };
  const handleCurrentChange = (value) => {
    getReports({
      ...defaultParams,
      page_num: value,
    });
  };

  const openPdf = (path) => {
    window.open(path);
  };

  const handleDownload = (params: any) => {
    const { type, filename, filepath } = params;
    if (type == 'all') {
      if (checkList.value.length === 0) {
        return ElMessage.warning('请选择要下载的文件');
      }
      const list = report.value
        .map(({ id, filename, filepath }) => {
          if (checkList.value.includes(id)) {
            return {
              fileUrl: filepath,
              fileName: filename,
            };
          }
        })
        .filter(Boolean);
      compressAndDownload(list, '报告');
    } else {
      downloadFile(filepath, filename);
    }
  };
  const handleSwitchPage = (type) => {
    const index = restaurants.value.findIndex((item) => item.id === Number(restaurantId));
    const { id } = type === 'next' ? restaurants.value[index + 1] : restaurants.value[index - 1];
    if (id) {
      router.replace(`/restaurant/detail?restaurantId=${id}`);
      setTimeout(() => location.reload(), 100);
    }
  };
</script>
<style lang="less" scoped>
  .report-list {
    :deep(.el-checkbox__label) {
      display: none;
    }
  }
</style>

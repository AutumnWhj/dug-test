<template>
  <div class="flex flex-col items-center relative mt-12 mb-20 mx-5 md:mx-0">
    <div class="w-full md:w-3/5 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="flex flex-col items-center">
        <div class="flex items-center self-center mb-6">
          <el-image v-if="hasPre" class="h-7 w-4 mr-5 cursor-pointer rotate-180" :src="arrowRightImage" @click="handleSwitchPage('pre')" />
          <div class="flex flex-col items-center">
            <el-image class="h-18 w-42 rounded-md" :src="platformMap[currentRestaurant?.kind].image" />
            <div class="text-black font-medium text-sm mt-2">{{ currentRestaurant?.name }}</div>
          </div>
          <el-image v-if="hasNext" class="h-7 w-4 ml-5 cursor-pointer" :src="arrowRightImage" @click="handleSwitchPage('next')" />
        </div>
      </div>
      <div class="filter-box mb-4 flex justify-between items-center">
        <el-select v-model="selectTime" class="w-32 !h-10" placeholder="Select" @change="handleSelectChange">
          <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <div v-if="report.length" class="flex justify-end items-center">
          <el-checkbox v-model="allCheck" :label="$t('restaurantDetail.checkAll')" @change="handleCheckAll" />
          <div
            class="ml-4 button-shadow h-10 bg-white px-5 py-2 flex items-center justify-center rounded-2xl gap-3 cursor-pointer"
            @click="handleDownload({ type: 'all' })"
          >
            <span class="text-gray-300 font-bold text-sm"> {{ $t('restaurantDetail.batch') }}</span>
            <SvgIcon name="svg-download" class="text-base text-gray-300 font-bold" />
          </div>
        </div>
      </div>
      <el-empty v-if="report.length === 0" :description="$t('restaurantDetail.noData')" />
      <el-checkbox-group v-model="checkList" v-loading="loading">
        <div v-for="item in report" :key="item.id" class="report-list mb-4 bg-gray-800 p-5 rounded-2xl">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <el-checkbox :label="item.id" class="pr-4 md:pr-6" />
              <el-image class="h-7 w-6 md:w-7 md:h-8 mr-3" :src="pdfIconImage" />
              <div class="text-black w-48 md:w-full font-medium text-base md:text-sm cursor-pointer" @click="openPdf(item.filepath)">{{
                item.filename
              }}</div>
            </div>
            <div class="flex flex-1 items-center justify-end gap-2 md:gap-5">
              <div
                class="button-shadow bg-white p-3 flex items-center justify-center rounded-full cursor-pointer"
                @click="openPdf(item.filepath)"
              >
                <SvgIcon name="svg-search" class="text-base text-gray-300 font-bold" />
              </div>
              <div
                class="button-shadow bg-white p-3 md:px-5 md:py-2 flex items-center justify-center rounded-full md:rounded-2xl gap-3 cursor-pointer"
                @click="handleDownload({ type: 'single', filename: item.filename, filepath: item.filepath })"
              >
                <span class="text-gray-300 font-bold text-sm hidden md:block">{{ $t('restaurantDetail.download') }}</span>
                <SvgIcon name="svg-download" class="text-base text-gray-300 font-bold" />
              </div>
            </div>
          </div>
        </div>
      </el-checkbox-group>

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
  import { useI18n } from 'vue-i18n';
  import DoorDashImage from '/@/assets/images/DoorDash1.png';
  import UberEatsImage from '/@/assets/images/UberEats.png';
  import GrubHubImage from '/@/assets/images/GrubHub.png';
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
  const report: any = ref([]);
  const restaurants: any = ref([]);
  const checkList: any = ref([]);
  const allCheck = ref(false);
  const route = useRoute();
  const pageCount = ref(0);
  const { restaurantId } = route.query;
  const userStore = useUserStore();
  const { user_id } = userStore;
  const selectTime = ref(7);
  const loading = ref(false);
  const defaultParams = reactive({
    user_id,
    kind: Number(restaurantId),
    page_num: 1,
    page_size: selectTime.value,
  });

  const timeOptions = computed(() => {
    return [
      {
        label: t('restaurantDetail.timeOptions[0]'),
        value: 7,
      },
      {
        label: t('restaurantDetail.timeOptions[1]'),
        value: 14,
      },
      {
        label: t('restaurantDetail.timeOptions[2]'),
        value: 30,
      },
    ];
  });

  const getReports = async (params) => {
    loading.value = true;
    allCheck.value = false;
    checkList.value = [];
    const { list, page } = await getRestaurantReport({
      ...params,
      page_size: selectTime.value,
    });
    report.value = list;
    loading.value = false;

    if (!pageCount.value) {
      pageCount.value = page;
    }
    return {
      list,
      page,
    };
  };
  onBeforeMount(async () => {
    await getReports(defaultParams);
    restaurants.value = await getRestaurants({ user_id });
  });
  const currentRestaurant = computed(() => {
    return restaurants.value.find((item) => item.kind === Number(restaurantId));
  });
  const hasNext = computed(() => {
    const index = (restaurants.value || []).findIndex((item) => item.kind === Number(restaurantId));
    return !!restaurants.value[index + 1];
  });
  const hasPre = computed(() => {
    const index = (restaurants.value || []).findIndex((item) => item.kind === Number(restaurantId));
    return !!restaurants.value[index - 1];
  });

  watch(
    () => restaurantId,
    () => {
      getReports(defaultParams);
    },
  );

  const handleSelectChange = async (value) => {
    const { page } = await getReports({
      ...defaultParams,
      page_size: value,
    });
    pageCount.value = page || 1;
  };
  const handleCheckAll = (value) => {
    if (value) {
      checkList.value = report.value.map(({ id }) => id);
    } else {
      checkList.value = [];
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
        return ElMessage.warning(t('restaurantDetail.downloadTip'));
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
      compressAndDownload(list, 'report');
    } else {
      downloadFile(filepath, filename);
    }
  };
  const handleSwitchPage = (type) => {
    const index = restaurants.value.findIndex((item) => item.kind === Number(restaurantId));
    const { kind } = type === 'next' ? restaurants.value[index + 1] : restaurants.value[index - 1];
    if (kind) {
      router.replace(`/restaurant/detail?restaurantId=${kind}`);
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
  :deep(.el-checkbox__label) {
    font-size: 0.875rem;
  }
  .filter-box {
    :deep(.el-input__wrapper) {
      border-radius: 16px;
      box-shadow: 0px 1px 14px 0px rgba(191, 191, 217, 0.3);
      background: #fff !important;
    }
    .button-shadow {
      box-shadow: 0px 1px 14px 0px rgba(191, 191, 217, 0.3);
    }
    :deep(.el-select) {
      .el-input {
        height: 2.5rem;
      }
      .el-input__inner {
        font-size: 0.875rem;
        font-weight: bold !important;
      }
    }
  }
</style>

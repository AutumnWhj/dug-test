<template>
  <div class="pt-4 flex flex-col items-center relative mb-20 mx-5 md:mx-0">
    <div class="w-full md:w-2/5 card-shadow flex flex-col bg-white py-10 px-8 rounded-3xl">
      <div class="flex flex-col items-center mb-16">
        <el-image class="h-16 mb-4" :src="logoTextImage" />
        <div class="text-sm text-black font-bold mb-6"> SERVICES AGREEMENT</div>
        <el-scrollbar ref="scrollbar" height="28rem" :always="true" @scroll="handleScroll">
          <div class="text-xs text-black leading-normal px-6">
            THIS MAIN SERVICES AGREEMENT GOVERNS CUSTOMER’S ACQUISITION AND USE OF SFDC SERVICES.CAPITALIZED TERMS HAVE THE DEFINITIONS SET
            FORTH HEREIN.IF CUSTOMER REGISTERS FOR A FREE TRIAL OF SFDC SERVICES OR FOR FREE SERVICES, THE APPLICABLEPROVISIONS OF THIS
            AGREEMENT WILL ALSO GOVERN THAT FREE TRIAL OR THOSE FREE SERVICES.BY ACCEPTING THIS AGREEMENT, BY (1) CLICKING A BOX INDICATING
            ACCEPTANCE, (2) EXECUTING AN ORDERFORM THAT REFERENCES THIS AGREEMENT, OR (3) USING FREE SERVICES, CUSTOMER AGREES TO THE
            TERMSOF THIS AGREEMENT. IF THE INDIVIDUAL ACCEPTING THIS AGREEMENT IS ACCEPTING ON BEHALF OF ACOMPANY OR OTHER LEGAL ENTITY,
            SUCH INDIVIDUAL REPRESENTS THAT THEY HAVE THE AUTHORITY TOBIND SUCH ENTITY AND ITS AFFILIATES TO THESE TERMS AND CONDITIONS, IN
            WHICH CASE THE TERM“CUSTOMER” SHALL REFER TO SUCH ENTITY AND ITS AFFILIATES. IF THE INDIVIDUAL ACCEPTING THISAGREEMENT DOES NOT
            HAVE SUCH AUTHORITY, OR DOES NOT AGREE WITH THESE TERMS AND CONDITIONS,SUCH INDIVIDUAL MUST NOT ACCEPT THIS AGREEMENT AND MAY
            NOT USE THE SERVICES.The Services may not be accessed for purposes of monitoring their availability, performance or
            functionality, or for any otherbenchmarking or competitive purposes.SFDC’s direct competitors are prohibited from accessing the
            Services, except with SFDC’s prior written consent.This Agreement was last updated on, September 15, 2022. It is effective
            between Customer and SFDC as of the date of Customer’saccepting this Agreement (the “Effective Date”).1. DEFINITIONS“Affiliate”
            means any entity that directly or indirectly controls, is controlled by, or is under common control with the subjectentity.
            “Control,” for purposes of this definition, means direct or indirect ownership or accepting this Agreement (the “Effective
            Date”).
          </div>
        </el-scrollbar>
      </div>
      <el-button class="w-2/3 self-center !rounded-3xl mb-8" size="large" :color="buttonStyle.color" @click="toRestaurant">
        {{ buttonStyle.message }}
      </el-button>
    </div>
  </div>
  <LeaveMessage class="fixed left-14 bottom-14 w-auto" />
</template>

<script lang="ts" setup>
  import { useRouter, useRoute } from 'vue-router';
  import LeaveMessage from '../components/LeaveMessage.vue';
  import logoTextImage from '/@/assets/images/logo_text.png';

  const router = useRouter();
  const route = useRoute();
  const { id = '' } = route.query || '';
  const toRestaurant = () => {
    if (isScrollBottom.value && time.value === 0) {
      router.push(`/bind?id=${id}`);
    }
  };
  const scrollbar = ref();
  const isScrollBottom = ref(false);
  const handleScroll = () => {
    const { wrapRef } = scrollbar.value;
    isScrollBottom.value = wrapRef.scrollHeight - (wrapRef.scrollTop + wrapRef.clientHeight + 1) <= 1;
  };
  const time = ref(14);
  let timer: any = ref(null);
  onMounted(() => {
    scrollbar.value.handleScroll();
    timer.value = setInterval(() => {
      time.value = time.value - 1;
      if (time.value === 0) {
        clearInterval(timer.value);
      }
    }, 1000);
  });
  const buttonStyle = computed(() => {
    if (time.value > 0) {
      return {
        color: '#A6A6A6',
        message: `请滚动阅读条款 （ ${time.value} s）`,
      };
    } else {
      if (!isScrollBottom.value) {
        return {
          color: '#A6A6A6',
          message: `请滑动到底`,
        };
      } else {
        return {
          color: '#2C72FE',
          message: `已阅读`,
        };
      }
    }
  });
</script>

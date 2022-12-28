<template>
  <div class="w-full flex gap-3">
    <el-progress class="w-1/4" :percentage="state.onePercentage" :color="state.oneCustomColors" :stroke-width="3" />
    <el-progress class="w-1/4" :percentage="state.twoPercentage" :color="state.twoCustomColors" :stroke-width="3" />
    <el-progress class="w-1/4" :percentage="state.threePercentage" :color="state.threeCustomColors" :stroke-width="3" />
    <el-progress class="w-1/4" :percentage="state.fourPercentage" :color="state.fourCustomColors" :stroke-width="3" />
  </div>
</template>
<script lang="ts" setup>
  import { reactive, watch } from 'vue';
  const props = defineProps({
    password: {
      type: String,
      default: '',
    },
  });
  const state = reactive({
    onePercentage: 0,
    twoPercentage: 0,
    threePercentage: 0,
    fourPercentage: 0,
    oneCustomColors: [{ color: '#F75C5C', percentage: 100 }],
    twoCustomColors: [{ color: '#FF937A', percentage: 100 }],
    threeCustomColors: [{ color: '#FFEB3B', percentage: 100 }],
    fourCustomColors: [{ color: '#7BFF29', percentage: 100 }],
  });
  const checkPasswordStrength = (value) => {
    let mode = 0;
    //正则表达式验证符合要求的
    if (value.length < 1) return mode;
    if (/\d/.test(value)) {
      //如果用户输入的密码 包含了数字
      mode++;
    }
    if (/[a-z]/.test(value)) {
      //如果用户输入的密码 包含了小写的a到z
      mode++;
    }
    if (/[A-Z]/.test(value)) {
      //如果用户输入的密码 包含了大写的A到Z
      mode++;
    }
    if (/\W/.test(value)) {
      //如果是非数字 字母 下划线
      mode++;
    }
    return mode;
  };
  watch(
    () => props.password,
    (newValue) => {
      const mode = checkPasswordStrength(newValue);
      //逻辑处理
      switch (mode) {
        //初始化状态
        case 0:
          state.onePercentage = 0;
          state.twoPercentage = 0;
          state.threePercentage = 0;
          state.fourPercentage = 0;
          break;
        case 1:
          state.onePercentage = 100;
          state.twoPercentage = 0;
          state.threePercentage = 0;
          state.fourPercentage = 0;
          break;
        case 2:
          state.onePercentage = 100;
          state.twoPercentage = 100;
          state.threePercentage = 0;
          state.fourPercentage = 0;
          break;
        case 3:
          state.onePercentage = 100;
          state.twoPercentage = 100;
          state.threePercentage = 100;
          state.fourPercentage = 0;
          break;
        case 4:
          state.onePercentage = 100;
          state.twoPercentage = 100;
          state.threePercentage = 100;
          state.fourPercentage = 100;
          break;
        default:
          state.onePercentage = 100;
          state.twoPercentage = 100;
          state.threePercentage = 100;
          state.fourPercentage = 100;
          break;
      }
    },
  );
</script>
<style>
  .el-progress__text {
    display: none;
  }
  .el-progress-bar {
    padding-right: 0px;
    margin: 0px;
  }
</style>

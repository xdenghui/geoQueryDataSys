<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="温度" :name="'0'"><temp /></el-tab-pane>
    <el-tab-pane label="湿度" :name="'1'"><humidity /></el-tab-pane>
    <el-tab-pane label="加速度" :name="'2'"><ACC /></el-tab-pane>
  </el-tabs>
</template>

<script>
  import {temp, humidity, ACC} from './index'
  export default {
    components: {temp, humidity, ACC},
    data() {
      return {
        activeName: 0,
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
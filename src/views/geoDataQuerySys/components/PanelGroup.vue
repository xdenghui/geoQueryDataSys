<template>
  <el-row :gutter="40" class="panel-group">
    <col-item v-for="(item, index) in cols" :key="index" :item="item" @nowData="nowData" />
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import ColItem from './ColItem'

export default {
  components: {CountTo,ColItem},
  data() {
    return {
      cols: [
				{title: '温度数据监测', nowReq: 'get_T1', svg: 'message', description: '采用VI子程序技术作为温度值的输入，设置了温度值的输出模式（摄氏或华氏），输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '湿度数据监测', nowReq: 'get_Humidity1_mean', svg: 'peoples', description: '采用VI子程序技术作为湿度值的输入，设置了湿度的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '孔隙压数据监测', nowReq: 'get_Pressure1_mean', svg: 'message', description: '采用VI子程序技术作为孔隙压的输入，设置了空隙压的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '加速度数据监测', nowReq: 'get_A1_variance', svg: 'message', description: '采用VI子程序技术作为加速度的输入，设置了空隙压的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '降雨量数据监测', nowReq: 'get_rainfall_mean', svg: 'message', description: '采用VI子程序技术作为降雨量的输入，设置了温度值的输出模式（摄氏或华氏），输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '光照度数据监测', nowReq: 'get_illuminance_mean', svg: 'message', description: '采用VI子程序技术作为光照度的输入，设置了湿度的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '电极电势数据监测', nowReq: 'get_V1_mean', svg: 'peoples', description: '采用VI子程序技术作为电极电势的输入，设置了空隙压的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
        {title: '地表位移数据监测', nowReq: 'get_displacement1_mean', svg: 'peoples', description: '采用VI子程序技术作为地表位移的输入，设置了空隙压的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
      ],
    }
  },
  methods: {
    nowData(data, type) {
      this.$emit('nowData', data, type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
}
</style>

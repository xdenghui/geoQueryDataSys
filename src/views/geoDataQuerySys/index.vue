<template>
  <div class="dashboard-editor-container">
    <panel-group @nowData="nowData" :dialogStatus.sync="dialog" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;" class="chart_box">
      <div style="padding-top:35px;" class="progress_item">
        <span>当前滑坡概率</span>
        <el-progress class="progress" :stroke-width="16" :color="customColorMethod" :percentage="nowPercentage" />
      </div>
      <line-chart :chart-data="currData" :toFixed="fixed" class="chart_style" />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
  },
  data() {
    return {
      currData: {},
      fixed: 0,
      dialog: false,
    }
  },
  computed: {
    nowPercentage(){
      return this.randomNum(5, 15)
    },
		customColorMethod(){
			if (this.nowPercentage < 20) {
				return '#f56c6c';
			} else if (this.nowPercentage < 40) {
				return '#e6a23c';
			} else if(this.nowPercentage < 70) {
				return '#5cb87a';
			} else {
				return '#67c23a';
			}
		}
  },
  methods: {
    randomNum(minNum,maxNum){ 
      switch(arguments.length){ 
        case 1: 
          return parseInt(Math.random()*minNum+1,10); 
          break; 
        case 2: 
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
          break; 
        default: 
          return 0; 
          break; 
      } 
    },
    nowData(data, fixed) {
      console.log(data, fixed);
      this.currData = data
      this.fixed = fixed
    }
  },
  beforeRouteLeave (to, from, next) { // 全屏弹窗打开时候，返回上一步则关闭
    if(this.dialog){
      this.dialog = false
      next(false)
    }else{
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .chart_box{
    display: flex;
    align-items: center;
    .chart_style{
      flex: 2;
    }
    .progress_item{
      flex: 1;
      color: #f56c6c;
      .progress{
        padding-top: 6px;
      }
    }
  }

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

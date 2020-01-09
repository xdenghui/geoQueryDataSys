<template>
  <el-dialog
    :title="nowReqObj.title"
    width="90%"
    class="detail"
    :visible.sync="dialogVisible"
  >
    <div class="dataRes">
      <div class="resItem max">
        <i class="el-icon-top-left"></i>
        <span class="right">
          <span class="txt">最大</span>
          <span class="num">{{nowReqObj.data && nowReqObj.data.baseNumData.max}}</span>
        </span>
      </div>
      <div class="resItem max">
        <i class="el-icon-top-left"></i>
        <span class="right">
          <span class="txt">最小</span>
          <span class="num">{{nowReqObj.data && nowReqObj.data.baseNumData.min}}</span>
        </span>
      </div>
      <div class="resItem max">
        <i class="el-icon-top-left"></i>
        <span class="right">
          <span class="txt">平均值</span>
          <span class="num">{{nowReqObj.data && nowReqObj.data.baseNumData.avg}}</span>
        </span>
      </div>
      <div class="resItem max">
        <i class="el-icon-top-left"></i>
        <span class="right">
          <span class="txt">当前</span>
          <span class="num">{{nowReqObj.data && nowReqObj.data.baseDataList[nowReqObj.data.baseDataList.length-1].num}}</span>
        </span>
      </div>
    </div>
    <div class="detailBox">
      <img :src="nowReqObj.svg && require(`@/assets/img/${nowReqObj.svg}.png`)" alt="">
      <div class="content">
        <div class="key">功能</div>
        <div class="des">使用高精度、高灵敏度和高可靠性MEMS孔隙水压力传感器，监控孔隙压力压力的变化；支持各种接口的数据采集仪；先进的技 术，更高的精度，实现了空隙压监测自动化、简单化。</div>
        <div class="key">指标</div>
        <div class="tableBox">
          <div class="type">
            <div class="row title grayBg">物理特性</div>
            <div class="row">
              <div class="key">尺寸</div>
              <div class="val">自定义</div>
            </div>
            <div class="row grayBg">
              <div class="key">工作温度</div>
              <div class="val">-20℃ ~ +70℃</div>
            </div>
            <div class="row">
              <div class="key">防护等级</div>
              <div class="val">IP67</div>
            </div>
          </div>
          <div class="type">
            <div class="row title grayBg">量程</div>
            <div class="row">
              <div class="key">精度</div>
              <div class="val">0.25%</div>
            </div>
            <div class="row grayBg">
              <div class="key">量程</div>
              <div class="val">0~15kPa~200kPa</div>
            </div>
            <div class="row">
              <div class="key">接口</div>
              <div class="val">模拟、RS485/232</div>
            </div>
          </div>
        </div>
        <div class="tableBox">
          <div class="type">
            <div class="row title grayBg">电气指示</div>
            <div class="row">
              <div class="key">电压</div>
              <div class="val">8-24V</div>
            </div>
            <div class="row grayBg">
              <div class="key">功耗</div>
              <div class="val">0.75W</div>
            </div>
          </div>
          <div class="type">
            <div class="row title grayBg"></div>
            <div class="row">
              <div class="key"></div>
              <div class="val"></div>
            </div>
            <div class="row grayBg">
              <div class="key"></div>
              <div class="val"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <line-chart :chart-data="nowReqObj.data" :toFixed="nowReqObj.fixed" class="chart_style" />
  </el-dialog>
</template>

<script>
  import api from '@/api/geoDataQuerySys'
  import LineChart from "./LineChart";
  export default {
    components: {
      LineChart
    },
    data() {
      return {
        tableData: []
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      nowReqObj: {
        type: Object,
        default: () => {}
      },
    },
    watch: {
      /* nowReqObj(val){
        api[val.req]({hour: 1}).then(({baseDataList}) => {
          this.tableData = baseDataList
        })
      } */
    },
    computed: {
      dialogVisible: {
        get(){
          return this.show
        },
        set(val){
          this.$emit('update:show', val)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
.detail/deep/.el-dialog{
  margin-top: 2vh !important;
}
.dataRes{
  display: flex;
  align-items: center;
  justify-content: space-between;
  .resItem{
    height: 56px;
    padding: 10px 16px;
    background: #c4c4c4;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    &+.resItem{
      margin-left: 16px;
    }
    .right{
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      .txt{
        margin-bottom: 4px;
      }
      .num{
        color: #000;
        font-weight: bold;
      }
    }
  }
}
.detailBox{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  img{
    margin-right: 16px;
  }
  .content{
    font-size: 12px;
    .key{
      color: #000;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .tableBox{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .type{
        flex: 1;
        &+.type{
          margin-left: 16px;
        }
      }
      .title{
        color: #000;
        font-weight: bold;
      }
      .row{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 12px;
        min-height: 21px;
        .key{
          color: #606266;
          font-size: 12px;
          margin-bottom: 0;
        }
        .val{
          color: #000;
        }
      }
      .grayBg{
        background: #bfbfbf;
      }
    }
  }
}
</style>
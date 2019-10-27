<template>
  <el-row :gutter="20" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="(item, index) in cols" :key="index">
    <!-- <el-popover
      placement="top-start"
      width="280"
      trigger="hover"
      :content="item.description"> -->
       <!-- slot="reference" -->
      <div class="card-panel" @click="queryData(item.nowReq, item.fixed)">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon :icon-class="item.svg" class-name="card-panel-icon" />
        </div>
        <div class="now_data">
          <span class="key">平均{{item.title}}</span>
          <span class="num">{{item.avg}}</span>
          <el-button type="text" @click.stop="showDlg(item.nowReq, item.fixed, item.title)">详情</el-button>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{item.title}}
          </div>
          <count-to :start-val="0" :end-val="nowBaseData.length" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    <!-- </el-popover> -->
    </el-col>
    <detail-dlg :show.sync="showDetailDlg" :nowReqObj="nowReqObj" />
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import DetailDlg from './DetailDlg'
import api from '@/api/geoDataQuerySys'
export default {
  components: {CountTo, DetailDlg},
  data() {
    return {
      cols: [
				{title: '温度', fixed: 2, nowReq: 'get_T1', svg: 'temp', description: '采用VI子程序技术作为温度值的输入，设置了温度值的输出模式（摄氏或华氏），输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '湿度', fixed: 4, nowReq: 'get_Humidity1_mean', svg: 'humidity', description: '采用VI子程序技术作为湿度值的输入，设置了湿度的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '孔隙压', fixed: 3, nowReq: 'get_Pressure1_mean', svg: 'kong', description: '采用VI子程序技术作为孔隙压的输入，设置了空隙压的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '加速度', fixed: 4, nowReq: 'get_A1_variance', svg: 'Acc', description: '采用VI子程序技术作为加速度的输入，设置了空隙压的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '降雨量', fixed: 4, nowReq: 'get_rainfall_mean', svg: 'rain', description: '采用VI子程序技术作为降雨量的输入，设置了温度值的输出模式（摄氏或华氏），输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '光照度', fixed: 0, nowReq: 'get_illuminance_mean', svg: 'illuminance', description: '采用VI子程序技术作为光照度的输入，设置了湿度的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
				{title: '电极电势', fixed: 0, nowReq: 'get_V1_mean', svg: 'dian', description: '采用VI子程序技术作为电极电势的输入，设置了空隙压的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
        {title: '地表位移', fixed: 1, nowReq: 'get_displacement1_mean', svg: 'displacement', description: '采用VI子程序技术作为地表位移的输入，设置了空隙压的输出模式，输出数据统计信息包括最大值、最小值、平均值，运行后的动态显示到界面文本.'},
      ],
      nowReqObj: {},
      newData: {},
      nowBaseData: [],
    }
  },
  props: {
    dialogStatus: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    showDetailDlg: {
      get(){
        return this.dialogStatus
      },
      set(val){
        this.$emit('update:dialogStatus', val)
      }
    }
  },
  created() {
    let reqList = ['get_T1', 'get_Humidity1_mean', 'get_Pressure1_mean', 'get_A1_variance', 'get_rainfall_mean', 'get_illuminance_mean', 'get_V1_mean',  'get_displacement1_mean', ];
    reqList.map(v => {
      api[v]({hour: 1}).then(({baseNumData}) => {
        this.cols.map(c => {
          if(c.nowReq === v){
            c.avg = parseFloat(baseNumData.avg).toFixed(c.fixed)
          }
        })
      })
    })
  },
  mounted() {
    this.queryData('get_T1', 2)
  },
  methods: {
    showDlg(req, fixed, title){
      this.showDetailDlg = true
      this.nowReqObj = {req, fixed, title}
    },
    queryData(req, fixed){
      api[req]({hour: 1}).then((data) => {
        let length = data.baseDataList.length
        this.newData = data.baseDataList[length-1]
        this.nowBaseData = data.baseDataList
        this.$emit('nowData', data, fixed)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 22px;
  }

  .card-panel {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 108px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
        // display: none;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }
    .now_data{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #666;
      font-weight: bold;
      .key{
        color: rgba(0,0,0,0.45);
        font-size: 14px;
        margin-bottom: 12px;
      }
    }
    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin-left: 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      padding: 26px;
      padding-left: 0px;
      text-align: center;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
  @media (max-width:550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
}
</style>

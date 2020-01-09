<template>
  <el-row :gutter="20" class="panel-group">
    <el-col :xs="12" :sm="6" :lg="4" class="card-panel-col" v-for="(item, index) in cols" :key="index">
      <div class="card-panel" @click="showDlg(item)">
        <div class="now_data">
          <span class="key">{{item.title}}</span>
          <img :src="require(`@/assets/img/${item.svg}.png`)" alt="">
          <!-- <el-button type="text" @click.stop="showDlg(item.nowReq, item.fixed, item.title)">详情</el-button> -->
        </div>
      </div>
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
				{title: '空气温度传感器', fixed: 2, nowReq: 'get_T1', svg: 'temp'},
				{title: '土壤温湿度传感器', fixed: 4, nowReq: 'get_Humidity1_mean', svg: 'humidity'},
				{title: '孔隙压传感器', fixed: 3, nowReq: 'get_Pressure1_mean', svg: 'kong'},
				// {title: '加速度', fixed: 4, nowReq: 'get_A1_variance', svg: 'Acc'},
				{title: '雨量计', fixed: 4, nowReq: 'get_rainfall_mean', svg: 'rain'},
				// {title: '光照度', fixed: 0, nowReq: 'get_illuminance_mean', svg: 'illuminance'},
				{title: '微震监测计', fixed: 0, nowReq: 'get_illuminance_mean', svg: 'zhen'},
				{title: '不极化电极', fixed: 0, nowReq: 'get_V1_mean', svg: 'dian'},
        {title: 'GNSS位移检测仪', fixed: 1, nowReq: 'get_displacement1_mean', svg: 'GNSS'},
        {title: '拉线式位移计', fixed: 1, nowReq: 'get_displacement1_mean', svg: 'line'},
        {title: '大气压传感器', fixed: 1, nowReq: 'get_displacement1_mean', svg: 'air'},
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
    showDlg({nowReq, fixed, title, svg}){
      api[nowReq]({hour: 1}).then((data) => {
        this.showDetailDlg = true
        this.$nextTick(() => {
          this.nowReqObj = {data, fixed, title, svg}
        })
      })
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
    height: 200px;
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
      width: 100%;
      height: 100%;
      .key{
        color: rgba(0,0,0,0.45);
        font-size: 14px;
        padding: 8px 0;
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

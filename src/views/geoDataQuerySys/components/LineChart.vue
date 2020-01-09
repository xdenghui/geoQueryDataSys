<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// require("./lib/chart/line");
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true,
      default: () => {}
    },
    toFixed: {  // 保留几位小数
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: null,
      timeList: [],
      numList: [],
      val: [],
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.timeList = val.baseDataList.map(v => `${new Date(v.time).getHours()}:${new Date(v.time).getMinutes()}`)
        this.numList = val.baseDataList.map(v => parseFloat(v.num).toFixed(this.toFixed))
        // this.numList = val.baseDataList.map(v => parseFloat(v.num).toFixed(this.toFixed))
        this.val = val.baseDataList
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          /* text: '近一小时数据变化曲线图',
          subtext: '点击上面按钮文字可切换相应曲线图', */
          textStyle: {
            color: '#f56c6c',
            formatter: [
                '{a|一小时数据变化曲线图}'
            ].join('\n'),
            rich: {
              a: {
                align: 'right',
                color: '#f0f'
              }
            },
          }
            
        },
        xAxis: {
          data: this.timeList,
          /* boundaryGap: false,
          axisTick: {
            show: false
          } */
        },
        /* grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        }, */
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
            startValue: this.timeList[0]
        }, {
            type: 'inside'
        }],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [{
              gt: 0,
              lte: 50,
              color: '#096'
          }, {
              gt: 50,
              lte: 100,
              color: '#ffde33'
          }, {
              gt: 100,
              lte: 150,
              color: '#ff9933'
          }, {
              gt: 150,
              lte: 200,
              color: '#cc0033'
          }, {
              gt: 200,
              lte: 300,
              color: '#660099'
          }, {
              gt: 300,
              color: '#7e0023'
          }],
          /* outOfRange: {
              color: '#999'
          } */
        },
        yAxis: {
          data: [...new Set(this.numList)].sort((a,b) => a-b),
          splitLine: {
            show: false
          }
        },
        /* legend: {
          data: ['expected', 'actual']
        }, */
        series: {
          name: 'num',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: this.numList,
          markLine: {
            silent: true,
            data: [{
                yAxis: 50
            }, {
                yAxis: 100
            }, {
                yAxis: 150
            }, {
                yAxis: 200
            }, {
                yAxis: 300
            }]
          },
          /* animationDuration: 2800,
          animationEasing: 'cubicInOut' */
        },
        /* {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: this.chartData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }] */
      })
    }
  }
}
</script>

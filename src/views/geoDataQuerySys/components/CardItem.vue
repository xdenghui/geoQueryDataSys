<template>
  <div class="box_card">
    <el-card class="" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{dataObj.title}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="showDetail">详情</el-button>
      </div>
      <div class="card_des">
        {{dataObj.description}}
      </div>
    </el-card>
    <!-- 加个弹窗显示详情 -->
    <el-dialog fullscreen :title="dataObj.title" :visible.sync="showDialog">

    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/geoDataQuerySys'
  export default {
    data() {
      return {
        showDialog: false,
      }
    },
    props: {
      dataObj: {
        type: Object,
        default(){
          return {}
        }
      },
    },
    created() {
    },
    methods: {
      showDetail(){
        api[this.dataObj.nowReq]({hour: 1}).then((data) => {
          console.log(data);
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
.box_card{
  margin-top: 16px;
  .card_des{
    height: 100px;
  }
}
</style>
<template>
  <el-dialog
    title="详情"
    fullscreen
    :visible.sync="dialogVisible"
  >
    <el-table 
    :data="tableData"
    border
    style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="num" :label="nowReqObj.title"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  import api from '@/api/geoDataQuerySys'
  export default {
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
      nowReqObj(val){
        api[val.req]({hour: 1}).then(({baseDataList}) => {
          this.tableData = baseDataList
        })
      }
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

</style>
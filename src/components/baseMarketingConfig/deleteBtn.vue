<template>
  <el-button size="large" type="primary" class="btn-del" @click="del()">
  {{ name }}
  </el-button>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import API_MARKET from '../../service/marketing.service'
  import utils from '../../misc/utils'
  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'baseMCommonData'
      ])
    },
    methods: {
      ...mapActions([
        'getMarketingJob',
        'getMarketingSysId'
      ]),
      // 删除营销任务
      del() {
        var that = this
        this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            var id = that.baseMCommonData.id
            // 删除跳转到父模板后 taskType 也要同步修改 反正再次点击后重新请求
            var taskType = that.baseMCommonData.type.replace('_P4P_CUSTOM', '_P4P_SYS')
            that.getMarketingSysId(taskType).then(sysId => {
              API_MARKET.deleteMarketConfig(id).then(o => {
                  that.getMarketingJob()
                  that.$router.push({
                      path: that.$route.path,
                      query: {
                        id: sysId,
                        taskType: taskType
                      }
                  })
                  utils.showSuccessMsg(that, '删除成功')
              })
            })
        }).catch(() => {
            that.$message({
                type: 'info',
                message: '已取消删除',
                customClass: 'message_position',
            })
        })
      }
    },
    props: [
      'name'
      ]
}
</script>
<style lang="scss">

</style>

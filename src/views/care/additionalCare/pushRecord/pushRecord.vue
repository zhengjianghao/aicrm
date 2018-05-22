<template>
  <push-record :sortBy="'marketing_time'" :taskId="taskId" :partItem='partLabel'>
  </push-record>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from '../../../../misc/utils'
import pushRecord from '../../../../components/pushRecord/pushRecord'
export default {
  data() {
    return {
      utils: utils,
      taskId: '',
      partLabel: {
        created: { name: '本次nn下单时间', type: 'date', width: '75' },
        buyer_nick: {name: '买家ID', width: '90'},
        payment: { name: '本次nn订单金额', type: 'money', width: '75', type: 'money', width: '75' },
        pay_time: { name: '本次nn付款时间', type: 'date', width: '75' },
        tid: { name: '本次nn订单编号' },
        end_time: { name: '本次交易nn成功时间', type: 'date', width: '80' },
        first_comment_state: { name: '初评状态' },
        first_comment_date: { name: '初评时间', type: 'date', width: '75' },
        add_comment_state: { name: '追评状态' },
        add_comment_date: { name: '追评时间', type: 'date', width: '75' },
        marketing_time: { name: '买家关怀推送时间', type: 'date', width: '88' },
        marketing_job: { name: '推送手段' },
        marketing_status: { name: '营销状态' },
      },
    }
  },
  mounted() {
    this.taskId = this.$route.query.id
  },
  components: {
    pushRecord
  }
}
</script>
<style lang="scss" scoped>

</style>

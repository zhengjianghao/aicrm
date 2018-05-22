<template>
    <push-record :sortBy="'marketing_time'" :taskId="taskId" :partItem='partLabel'>
    </push-record>
</template>
<script type="text/ecmascript-6" scoped>
import utils from '../../../../misc/utils'
import pushRecord from '../../../../components/pushRecord/pushRecord'
export default {
    data() {
        return {
            utils: utils,
            taskId: '',
            partLabel: {
                created: { name: '上次nn下单时间', type: 'date', width: '75' },
                buyer_nick: { name: '买家ID', width: '90' },
                payment: { name: '上次nn订单金额', type: 'money', width: '75' },
                order_interval: { width: '90', name: '本次营销nn间隔时间' },
                status: { name: '复购nn订单状态' },
                marketing_time: { name: '本次nn营销时间', type: 'date', width: '88' },
                pay_time: { name: '复购nn付款时间', type: 'date', width: '75' },
                marketing_interval: { width: '108', name: '复购成功时间差' },
                purchase_times: { width: '70', name: '购物次数标签' },
                marketing_job: { name: '本次nn营销手段' },
                marketing_status: { name: '本次nn营销状态' },
                message_send_content: { name: '本次营销内容' }
            }
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

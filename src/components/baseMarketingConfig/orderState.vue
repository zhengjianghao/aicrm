<template>
<div>
  <el-row :gutter="20">
      <el-col :span="3"><p>订单状态：</p></el-col>
      <el-col :span="2"><el-radio v-model="order_state_label" label="">不限制</el-radio></el-col>
      <el-col :span="2"><el-radio v-model="order_state_label" label="refundMoney">仅退款订单</el-radio></el-col>
      <el-col :span="2"><el-radio v-model="order_state_label" label="refundAll">退货退款订单</el-radio></el-col>
      <el-col :span="2"><el-radio v-model="order_state_label" label="failure">订单关闭</el-radio></el-col>
      <el-col :span="13"><el-radio v-model="order_state_label" label="success">交易成功</el-radio></el-col>
  </el-row>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        order_state_label: ''
      }
    },
    watch: {
      order_state_label() {
        this.updataValue()
      },
      orderState() {
        this.order_state_label = this.orderState
      }
    },
    mounted() {
      this.order_state_label = this.orderState ? this.orderState : ''
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig'
      ]),
      updataValue() {
        // 更新营销配置基本量
        this.updataBaseMConfig({
          status: this.order_state_label
        })
        if(this.dataBind) {
          var sycnObj = {
            status: this.order_state_label
          }
          this.$emit('sycnMethod', sycnObj)
          //this.dataBind.status = this.order_state_label
        }
      }
    },
    props: [
      'orderState',
      'dataBind'
    ]
}
</script>
<style lang="scss">

</style>

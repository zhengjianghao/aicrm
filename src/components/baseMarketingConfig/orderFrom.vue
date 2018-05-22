<template>
<div>
  <el-row :gutter="20">
      <el-col :span="3"><p>订单来源：</p></el-col>
      <el-col :span="2"><el-radio v-model="trade_from" label="">全部</el-radio></el-col>
      <el-col :span="2"><el-radio v-model="trade_from" label="PC">PC订单</el-radio></el-col>
      <el-col :span="14"><el-radio v-model="trade_from" label="WAP">手机订单</el-radio></el-col>
  </el-row>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        trade_from: ''
      }
    },
    watch: {
      trade_from() {
        this.updataValue()
      },
      tradeFrom() {
        this.trade_from = this.tradeFrom
      }
    },
    mounted() {
      this.trade_from = this.tradeFrom ? this.tradeFrom : ''
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig'
      ]),
      updataValue() {
        // 更新营销配置基本量
        this.updataBaseMConfig({
          trade_from: this.trade_from
        })
        if(this.dataBind) {
          // this.dataBind.trade_from = this.trade_from
          var sycnObj = {
            trade_from: this.trade_from
          }
          this.$emit('sycnMethod', sycnObj)
        }
      }
    },
    props: [
      'tradeFrom',
      'dataBind'
      ]
}
</script>
<style lang="scss">

</style>

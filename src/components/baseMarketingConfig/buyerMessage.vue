<template>
<div>
  <el-row :gutter="20">
      <el-col :span="3"><p>买家留言：</p></el-col>
      <el-col :span="2"><el-radio v-model="buyer_message" label="">不限制</el-radio></el-col>
      <el-col :span="3"><el-radio v-model="buyer_message" label="messaged">有留言发送</el-radio></el-col>
      <el-col :span="16"><el-radio v-model="buyer_message" label="nomessaged">无留言发送</el-radio></el-col>
  </el-row>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        buyer_message: ''
      }
    },
    watch: {
      buyer_message() {
        this.updataValue()
      },
      buyerMessage() {
        this.buyer_message = this.buyerMessage
      }
    },
    mounted() {
      this.buyer_message = this.buyerMessage ? this.buyerMessage : ''
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig'
      ]),
      updataValue() {
        // 更新营销配置基本量
        this.updataBaseMConfig({
          buyer_message: this.buyer_message
        })
        if(this.dataBind) {
          var sycnObj = {
            buyer_message: this.buyer_message
          }
          this.$emit('sycnMethod', sycnObj)
          //this.dataBind.buyer_message = this.buyer_message
        }
      }
    },
    props: [
      'buyerMessage',
      'dataBind'
      ]
}
</script>
<style lang="scss">

</style>

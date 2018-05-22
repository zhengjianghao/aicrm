<template>
<div>
  <el-row :gutter="20">
    <el-col :span="3"><p>提醒形式：</p></el-col>
      <el-col :span="2"><el-radio v-model="send_type_user" label="">不提醒</el-radio></el-col>
      <el-col :span="2"><el-radio v-model="send_type_user" label="sms">仅短信</el-radio></el-col>
      <el-col :span="2" v-show="jurisdictionData.allShow"><el-radio v-model="send_type_user" label="qianniu">仅千牛</el-radio></el-col>
      <el-col :span="15" v-show="jurisdictionData.allShow"><el-radio v-model="send_type_user" label="all">短信+千牛同时</el-radio></el-col>
  </el-row>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import utils from '../../misc/utils'
  export default {
    data() {
      return {
        send_type_user: '',
        utils: utils
      }
    },
    computed: {
      ...mapGetters([
        'jurisdictionData'
        ])
    },
    watch: {
      send_type_user() {
        this.updataValue()
      },
      sendTypeUser() {
        this.send_type_user = this.sendTypeUser
      }
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig'
      ]),
      updataValue() {
        // 更新营销配置基本量
        this.updataBaseMConfig({
          send_type_user: this.send_type_user
        })
      }
    },
    props: [
      'sendTypeUser',
      ]
}
</script>
<style lang="scss">

</style>

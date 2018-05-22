<template>
  <div>
    <switch-big :initValue="initValue" :onText="onText" :offText="offText" @change="switchState"></switch-big>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import utils from '../../misc/utils'
  export default {
    props: [
      'initValue',
      'onText',
      'offText'
    ],
    methods: {
      ...mapActions([
        'doMarketTask',
        'getMarketingJob',
        'updataBaseMCommonSwitch'
      ]),
      switchState(obj) {
        this.doMarketTask([obj.id, obj.state ? 'open' : 'close']).then(o => {
          this.updataBaseMCommonSwitch(obj.state)
          var msg = obj.state ? '任务开启成功' : '任务关闭成功'
          utils.showSuccessMsg(this, msg, o => {
            this.getMarketingJob()
          })
        })
      }
    }
}
</script>
<style lang="scss">
</style>

<template>
<div class="user_tabs">
    <el-tabs @tab-click="activeSubCode" v-model="vm.activeName">
      <el-tab-pane  label="充值" name="charge">
          <charge></charge>
      </el-tab-pane>
      <el-tab-pane label="充值记录" name="chargeRecord">
          <charge-record></charge-record>
      </el-tab-pane>
      <el-tab-pane label="消费记录" name="consumptionRecord">
          <consumption-record ref="consumption"></consumption-record>
      </el-tab-pane>
    </el-tabs>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import g_const from '../../misc/global.constant'
  import charge from './charge'
  import chargeRecord from './chargeRecord'
  import consumptionRecord from './consumptionRecord'

  export default {
    data() {
      return {
        vm: {
          activeName: 'charge',
          initValue: true
        },
      }
    },
    computed:  {
      ...mapGetters(['openModalState'])
    },
    watch: {
      openModalState() {
        if(this.openModalState.name === g_const.openModalCodes.msgConfig) {
          this.vm.activeName = 'charge'
          this.getSubCode('charge')
        }
      }
    },
    mounted() {
      this.getSubCode('charge')
    },
    methods: {
      ...mapActions(['getSubCode', 'getChargeData', 'getCostOrderData','getUser']),
      activeSubCode(tab) {
        this.getSubCode(tab.name)
        if(tab.name == 'charge') {
          this.getUser()
        }
      }
    },
    components: {
        chargeRecord,
        charge,
        consumptionRecord
    }
}
</script>
<style lang="scss" scoped>

</style>

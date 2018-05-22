<template>
<div class="user_tabs">
    <el-tabs @tab-click="activeSubCode" v-model="vm.activeName">
      <el-tab-pane  label="选择场景" name="chooseMarket">
          <buy-market-list :activeChild="activeChild" v-if="vm.activeName === 'chooseMarket'"></buy-market-list>
      </el-tab-pane>
      <el-tab-pane label="订购记录" name="buyRecord">
          <buy-market-record ref='buyRecord'></buy-market-record>
      </el-tab-pane>
    </el-tabs>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import g_const from '../../misc/global.constant'
  import buyMarketList from './buyMarketList'
  import buyMarketRecord from './buyMarketRecord'

  export default {
    data() {
      return {
        vm: {
          activeName: 'chooseMarket',
          initValue: true
        },
      }
    },
    computed:  {
      ...mapGetters(['openModalState'])
    },
    watch: {
      openModalState() {
        if(this.openModalState.name === g_const.openModalCodes.buyMarketingJob) {
          this.vm.activeName = 'chooseMarket'
          this.getSubCode('chooseMarket')
        }
      }
    },
    mounted() {
      this.getSubCode('chooseMarket')
    },
    methods: {
      ...mapActions(['getSubCode', 'getBuyMarketList','getBuyMarketRecordData']),
      activeSubCode(tab) {
        this.getSubCode(tab.name)
        // 点击充值记录获取数据
        if (tab.name == 'chooseMarket') {
          this.getBuyMarketList()
        } else if (tab.name == 'buyRecord') {
          this.$refs['buyRecord'].init()
        }
      }
    },
    props: [
      'activeChild'
    ],
    components: {
        buyMarketRecord,
        buyMarketList,
    }
}
</script>
<style lang="scss" scoped>

</style>

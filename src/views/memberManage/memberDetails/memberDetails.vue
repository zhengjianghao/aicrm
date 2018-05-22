<template>
  <!--<div class="user_tabs" v-loading='memberDetailData.id.indexOf(id) < 0' element-loading-text="数据加载中请耐心等待">
    <el-tabs @tab-click="activeSubCode" v-model="vm.activeName">
      <el-tab-pane label="基本信息" name="basicInformation">
        <basic-information :baseInfo="memberDetailData.id.indexOf(id) >= 0 ? memberDetailData.data[memberDetailData.id.indexOf(id)] : {}">
        </basic-information>
      </el-tab-pane>
      <el-tab-pane label="交易记录" name="transactionRecord">
        <transaction-record :orders="memberDetailData.id.indexOf(id) >= 0 ? memberDetailData.data[memberDetailData.id.indexOf(id)].orders : []">
        </transaction-record>
      </el-tab-pane>
      <el-tab-pane label="营销记录" name="marketingRecord">
        <marketing-record :marketings="memberDetailData.id.indexOf(id) >= 0 ? memberDetailData.data[memberDetailData.id.indexOf(id)].marketings : []">
        </marketing-record>
      </el-tab-pane>
    </el-tabs>
  </div>-->
  <div class="user_tabs" v-loading='memberDetailData.loading === true' element-loading-text="数据加载中请耐心等待">
    <el-tabs @tab-click="activeSubCode" v-model="vm.activeName">
      <el-tab-pane label="基本信息" name="basicInformation">
        <basic-information :baseInfo="memberDetailData">
        </basic-information>
      </el-tab-pane>
      <el-tab-pane label="交易记录" name="transactionRecord">
        <transaction-record :orders="memberDetailData.orders">
        </transaction-record>
      </el-tab-pane>
      <el-tab-pane label="营销记录" name="marketingRecord">
        <marketing-record :marketings="memberDetailData.marketings">
        </marketing-record>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import basicInformation from './basicInformation/basicInformation.vue'
import transactionRecord from './transactionRecord/transactionRecord.vue'
import marketingRecord from './marketingRecord/marketingRecord.vue'
export default {
  data() {
    return {
      vm: {
        activeName: 'basicInformation',
      },
    }
  },
  mounted() {
    this.getCustomerDetail(this.id)
  },
  computed: {
    ...mapGetters([
      'memberDetailData'
    ])
  },
  created() {
    this.init()
  },
  watch: {
    id() {
      //清空上次的数据
      this.clearCustomerDetail()
      // if(this.memberDetailData.id.indexOf(this.id) < 0) {
        this.getCustomerDetail(this.id)
      // }
      // this.init()
    }
  },
  methods: {
    ...mapActions([
      'getCustomerDetail',
      'getSubCode',
      'clearCustomerDetail'
    ]),
    activeSubCode(tab) {
      this.getSubCode(tab.name);
    },
    init() {
      this.vm.activeName = 'basicInformation'
      this.activeSubCode(this.vm.activeName)
    }
  },
  components: {
    basicInformation,
    marketingRecord,
    transactionRecord
  },
  props: [
    'id'
  ]
}
</script>
<style lang="scss" scoped>

</style>

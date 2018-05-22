<template>
<div class="user_tabs">
    <el-tabs @tab-click="activeSubCode" v-model="curTabl">
      <el-tab-pane label="淘宝历史订单" name="taobaoHistoryOrder">
        <taobao-history-order v-if="subState == 'taobaoHistoryOrder'"></taobao-history-order>
      </el-tab-pane>
      <el-tab-pane  label="导入列表" name="imporList">
          <import-record></import-record>
      </el-tab-pane>
    </el-tabs>
    <el-button size="small" type="primary" @click="doSwitch('taobaoHistoryOrder')" v-if="subState == 'imporList'" class="c_import">继续导入</el-button>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../misc/global.constant'
  import taobaoHistoryOrder from './taobaoHistoryOrder'
  import importRecord from './importRecord'
  export default {
    data() {
      return {
        curTabl: ''
      }
    },
    watch: {
      subState() {
        this.curTabl = this.subState
        if(this.subState === 'importModal') {
          this.getSubCode('taobaoHistoryOrder')
        }
      }
    },
    computed: {
      ...mapGetters(['subState', 'importOrderData']),
      noImportRecord() {
        return this.importOrderData.length === 0
      }
    },
    mounted() {
      this.getSubCode('taobaoHistoryOrder')
      this.curTabl = 'taobaoHistoryOrder'
    },
    methods: {
      ...mapActions(['getSubCode']),
      activeSubCode(tab) {
        this.getSubCode(tab.name)
      },
      // 主动跳转到相应页卡
      doSwitch(name) {
        this.curTabl = name
        this.getSubCode(name)
      }
    },
    components: {
        taobaoHistoryOrder,
        importRecord
    }
}
</script>
<style lang="scss" scoped>
.user_tabs {
  position: relative;
}
.c_import {
  position: absolute;
  top: 7px;
  right: 19px;
}

</style>

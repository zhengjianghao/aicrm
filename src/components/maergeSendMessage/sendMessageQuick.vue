<template scope="props">
  <div class="user_tabs">
    <el-tabs v-model="curTabl" @tab-click="activeSubCode">
      <el-tab-pane label="发送配置" name="sendQuickConf">
        <send-message-quick-conf ref='sendConf' :noQuick="noQuick"></send-message-quick-conf>
      </el-tab-pane>
      <el-tab-pane  label="发送记录" name="sendQuickDetail">
        <send-message-quick-detail v-if="curTabl == 'sendQuickDetail'"></send-message-quick-detail>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import utils from '../../misc/utils'
import sendMessageQuickConf from './sendMessageQuickConf'
import sendMessageQuickDetail from './sendMessageQuickDetail'
export default {
    data() {
      return {
        curTabl: 'sendQuickConf',
        globalConstant: globalConstant
      }
    },
    watch: {
      openModalState() {
        if(this.openModalState.name === globalConstant.openModalCodes.quickSendMessage) {
          this.curTabl = 'sendQuickConf'
        }
      }
    },
    computed: {
      ...mapGetters([
        // 'subState',
        'openModalState'
      ]),
    },
    mounted() {
      this.getSubCode('sendQuickConf')
      this.curTabl = 'sendQuickConf'
    },
    methods: {
      ...mapActions(['getSubCode']),
      activeSubCode(tab) {
        this.getSubCode(tab.name)
      },
      init() {
        this.$refs['sendConf'].init()
      }
    },
    props: ['noQuick'],
    components: {
        sendMessageQuickConf,
        sendMessageQuickDetail
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

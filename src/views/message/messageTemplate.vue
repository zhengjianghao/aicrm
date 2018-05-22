<template>
<div class="messageTemplate_content">
    <div class="user_toolbox">
        <div class="toolbox_control">
            <el-button-group >
                <el-button size="small" :class="vm.activeTabName === 'referenceTemplate' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('referenceTemplate')">参考短信模板</el-button>
                <el-button size="small" class="margin_left_tiny" :class="vm.activeTabName === 'historyTemplate' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('historyTemplate')">模板使用历史</el-button>
            </el-button-group>
        </div>

        <div class="pull-right">
            <el-checkbox v-model="isShared" @change="shared">
                开启短信模板分享
            </el-checkbox>
        </div>
    </div>
    <div class="user_tablelist">
      <component v-bind:is="currentView">
      </component>
    </div>

</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import msgTemplate from '../../components/messageTemplate/msgTemplate'
  import historyTemplate from '../../components/messageTemplate/historyTemplate'
  import globalConstant from '../../misc/global.constant'
  export default {
    data() {
        return {
            isShared: false,
            commonMarket: {},
            currentView: msgTemplate,
            vm: {
                activeTabName: 'referenceTemplate'
            }
        }
    },
    watch: {
        // 第一次加载后每次打开都重新调用接口
        openModalState() {
            this.init()
        }
    },
    computed: {
      ...mapGetters([
          'messageIsShare',
          'baseMCommonData',
          'openModalState'
        ])
    },
    mounted() {
        // 第一次加载时调用
        this.init()
    },
    methods: {
      ...mapActions([
          'updateMsgContent',
          'updateIsShare',
          'updateShare',
          'updataBaseMCommon'
        ]),
        init() {
            this.vm.activeTabName = 'referenceTemplate'
            this.currentView = msgTemplate
            this.commonMarket = this.copyCommonMarket(this.baseMCommonData)
            this.isShared = this.commonMarket.is_shared ? true : false
        },
        switchTab(name) {
            this.vm.activeTabName = name;
            if(name === 'referenceTemplate') {
                this.currentView = msgTemplate
            } else if(name === 'historyTemplate') {
                this.currentView = historyTemplate
            }
        },
        updateMSG(msg){
            this.updateMsgContent(msg);
        },
        shared() {
            var state = !this.isShared ? 'unshare' : 'share'
            this.updateShare([state, this.commonMarket.type])
            this.commonMarket.is_shared = this.isShared  ? 1 : 0
            this.updataBaseMCommon(this.commonMarket)
        },
        copyCommonMarket(data) {
            if(!data) return ''
            //存储营销任务除conf之外的数据，比如id
            return {
                id: data.id,
                title: data.title,
                status: data.status,
                start_time: data.start_time,
                end_time: data.end_time,
                activity_time: data.activity_time,
                is_system: data.is_system,
                is_shared: data.is_shared,
                type: data.type
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.pull-right {
    text-align: center;
    line-height: 48px;
    margin-right: 10px;
}
.el-table {
    a{
        text-decoration: underline;
        color: #0BB8F8;
    }
}
.messageTemplate_content {
    overflow: auto;
    min-height: 500px;
    max-height: 785px;
}
</style>

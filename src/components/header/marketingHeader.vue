<template>
  <div>
    <content-header :name="vm.taskName" :base="base" :tip="tip" :remind='remind'>
      <template slot="modifyName" scope="scope">
        <a class="link" @click="openModal(scope.title)">
          <span class="iconfont icon-pen" v-show="!isSysMarketingjob"></span>
        </a>
      </template>
      <template slot="toolBox" scope="scope">
        <div v-if="noSwitch" :class="isRunning ? 'ai_switch_box' : 'ai_switch_box_close'">
          <div class="no_switch">
            <i class="el-icon-setting" :class=" deductionRule.name ? isRunning ? 'autobiography_animation' : '' : ''"></i>
            {{deductionRule.name ? isRunning ? '魔方墙AI引擎自动运行中' : '魔方墙AI引擎停止运行' : '魔方墙AI引擎待运行中'}}
          </div>
        </div>
        <div v-else>
          <task-switch :initValue="vm.initValue"></task-switch>
        </div>
      </template>
    </content-header>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import API_MARKET from '../../service/marketing.service'
import g_const from '../../misc/global.constant'
import utils from '../../misc/utils'
export default {
  data() {
    return {
      vm: {
        taskName: '',
        initValue: {}
      }
    }
  },
  computed: {
    ...mapGetters([
      'baseMCommonData',
      'isSysMarketingjob',
      'deductionRule'
    ]),
    isRunning() {
      return this.baseMCommonData.status == 'OPEN'
    }
  },
  methods: {
    ...mapActions([
      'updateIsSysMarketingjob',
      'updateSiderbarActiveNode',
      'updateOpenModal'
    ]),
    openModal(name) {
      this.updateOpenModal({
        name: g_const.openModalCodes.editMarketingName,
        param: {
          taskName: name,
          from: 'pon'
        }
      })
    }
  },
  watch: {
    baseMCommonData() {
      var data = this.baseMCommonData
      // 要打开的父级菜单名
      var group = g_const.marketTypeParent[data.type]
      this.updateIsSysMarketingjob(group !== '自定义')
      // 任务名称
      this.vm.taskName = '' + data.title
      // 任务是否开启
      this.vm.initValue = {
        type: 'market',
        state: data.status === g_const.marketingState.OPEN ? true : false,
        id: data.id
      }
      this.updateSiderbarActiveNode({
        id: this.baseMCommonData.id,
        openName: group
      })
    }
  },
  props: [
    'base',
    'tip',
    'remind',
    'noSwitch',
    'name'
  ]
}
</script>
<style lang="scss">
.no_switch {
  width: 200px;
  font-weight: bold;
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 14px;
}

.ACTIVITY {
  color: #009933;
}

.SLEEP {
  color: #ff9900;
}

.CLOSED {
  color: #cccccc;
}
.ai_switch_box {
  background: linear-gradient(to right, #00E4FF 0%, #00BBFF 100%);
  border-radius: 30px;
  padding: 0px 8px;
  color: #fff;
}
.ai_switch_box_close {
  background: gray;
  border-radius: 30px;
  padding: 0px 8px;
  color: #4f4f51;
}
</style>

<template>
  <div>
    <content-header class="data_header" :name="vm.taskName">
    </content-header>
    <div class="base_chart_wraper">
      <el-tabs @tab-click="switchTab" v-model="curChartName">
        <el-tab-pane label="客单价分布" name="客单价分布">
          <per-paymentChart :curChartName="curChartName"></per-paymentChart>
        </el-tab-pane>
        <el-tab-pane class="disabled_hover" name="复购时间" v-if="jurisdictionData.secondShow">
          <span slot="label">
            复购时间
            <span class="undev">({{g_const.finishState[0]}})</span>
          </span>
          <rebuy-time :curChartName="curChartName"></rebuy-time>
        </el-tab-pane>
        <el-tab-pane class="disabled_hover" name="回款周期" v-if="jurisdictionData.secondShow">
          <span slot="label">
            回款周期
            <span class="undev">({{g_const.finishState[0]}})</span>
          </span>
          <reveived-payments-cycle :curChartName="curChartName"></reveived-payments-cycle>
        </el-tab-pane>
        <el-tab-pane label="复购周期" name="复购周期">
          <chart-fgzq :curChartName="curChartName"></chart-fgzq>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import chartFgzq from '../../homepage/chart-fgzq/chart-fgzq'
import perPaymentChart from '../../../components/chart/perPaymentChart'
import rebuyTime from './rebuyTime'
import reveivedPaymentsCycle from './reveivedPaymentsCycle'
import globalConstant from '../../../misc/global.constant'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      vm: {
        taskName: '密度图'
      },
      curChartName: '',
      g_const: globalConstant,
    }
  },
  mounted() {
    var _name = this.$route.query.name
    // 默认左侧菜单选中
    this.updateCurSidebar(_name)
    // 加载相应图表
    this.routeTo(_name)
  },
  computed: {
    ...mapGetters([
      'jurisdictionData'
    ])
  },
  watch: {
    // 当前路由监听
    $route() {
      // 只监听全局数据的路由
      if (this.$route.path === '/densityChart/densityChart') {
        this.routeTo(this.$route.query.name)
      }
    }
  },
  methods: {
    ...mapActions([
      'getActiveMenuCode',
      'updateSiderbarActiveNode'
    ]),
    // 默认左侧菜单选中
    updateCurSidebar(name) {
      this.updateSiderbarActiveNode({
        id: '',
        openName: this.vm.taskName,
        name: name
      })
    },
    // 左侧菜单切换，加载相应的图表
    routeTo(title) {
      // 当前页卡名称
      this.curChartName = title
      // 跟新左侧选中菜单
      this.updateCurSidebar(title)
    },
    switchTab(tab) {
      // 替换路径
      var name = this.$route.query.name
      var fullPath = decodeURI(this.$route.fullPath).replace('name=' + name, 'name=' + tab.name)
      this.$router.push(
        fullPath
      )
    }

  },
  components: {
    perPaymentChart,
    chartFgzq,
    rebuyTime,
    reveivedPaymentsCycle
  }
}
</script>
<style lang="scss" scoped>
.data_header {
  margin-bottom: 2px;
}

.disabled_hover {
  &:hover {
    color: #858585;
  }
}
</style>

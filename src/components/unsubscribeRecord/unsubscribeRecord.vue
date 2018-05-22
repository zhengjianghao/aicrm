<template>
  <div>
    <table-list getData='getUnsubscribeRecord' tableName='退订记录' :sortBy="sortBy" :showExport='true' :headerData='partItem' :showQuickSearchByDays="true" :showDateRangeSearch="true" :showSearchKey="false" dateRangeSearchPlaceholder="请选择营销时间段" @getBaseList="searchRemote" @getFilterList="searchLocal" ref="tableList" :filterListData="unsubscribeRecordData">
      <template slot="tableData" scope="scope">
        <el-table :data="scope.remotePageData" max-height="560" stripe border>
          <el-table-column v-for="(data, key, index) in partLabel" :key='index' header-align="center" :align="data.type == 'money' ? 'right' : 'center'" :min-width="data.width ? data.width : '80'" :render-header="utils.appendTip(g_const.table_tooltip[data.name])" :label="data.name">
            <template scope="scope">
              <p v-if="data.type === 'money'">{{utils.format_money(scope.row[key])}}</p>
              <p v-else-if="data.type === 'date'">{{utils.format_date(scope.row[key])}}<br/>{{utils.format_time_all(scope.row[key])}}</p>
              <template v-else>
                <el-tooltip :disabled="scope.row[key] !== '推送无效'" :content='scope.row.sms_status' placement="top" popper-class='tool_notes' effect="dark">
                  <p>{{utils.is_null(scope.row[key])}}</p>
                </el-tooltip>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </table-list>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import utils from 'src/misc/utils'
export default {
  data() {
    return {
      g_const: globalConstant,
      utils: utils,
      isActived: false, // 组件是否被激活
      partLabel: {}
    }
  },
  computed: {
    ...mapGetters([
      'subState',
      'unsubscribeRecordData'
    ]),
    taskId() {
      return this.$route.query.id
    },
  },
  mounted() {
    this.isActived = true
    this.partLabel = this.partItem
  },
  // 组件被激活
  activated() {
    this.isActived = true
    this.partLabel = this.partItem
  },
  // 组件转为非激活状态
  deactivated() {
    this.isActived = false
  },
  watch: {
    subState() {
      // 只有在被激活，才主动获取数据
      if (this.subState === this.g_const.activeCode.unsubscribeRecord && this.isActived) {
        this.init()
      }
    }
  },
  methods: {
    ...mapActions([
      'getUnsubscribeRecord'
    ]),
    init() {
      this.$refs['tableList'].init()
      this.partLabel = this.partItem
    },
    // 获取远程数据
    searchRemote([pagination, days, startDate, endDate, search_word, sortBy]) {
      if (startDate && endDate) {
        days = ''
      }
      // 主动获取数据
      this.getUnsubscribeRecord([pagination, this.taskId, days, startDate, endDate, search_word])
    },
    // 处理本地数据
    searchLocal([pagination, search_word, days, startDate, endDate, sortBy]) {
      // 主动获取数据
      this.getUnsubscribeRecord([pagination, this.taskId, days, startDate, endDate, search_word])
    }
  },
  props: [
    'sortBy',
    'partItem'
  ]
}
</script>
<style lang="scss">

</style>

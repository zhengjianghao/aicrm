<template>
  <div>
    <table-list :showQuickSearchByDays="false" :showDateRangeSearch="false" :showSearchKey="false" ref="tableList" :filterListData="summaryData">
      <template slot="tableDataNoPage" scope="props">
        <span>{{ tableTitle }}</span>
        <el-table :data="processData(props.data)" max-height="560" stripe border>
          <el-table-column prop="level_value" align="center" min-width="75" label="会员等级">
          </el-table-column>
          <el-table-column prop="level_name" align="center" min-width="90" label="等级名称">
          </el-table-column>
          <el-table-column align="right" header-align="center" min-width="75" label="人数">
            <template scope="scope">
              <progress-bar :num="scope.row.peopel_num" :maxNum="scope.row.peopel_num_max"></progress-bar>
            </template>
          </el-table-column>
          <el-table-column align="right" header-align="center" min-width="95" label="累计成交金额">
            <template scope="scope">
              {{ utils.toFixed2(scope.row.summary_money) }}
            </template>
          </el-table-column>
          <el-table-column prop="summary_deal_num" header-align="center" align="right" label="累计成交次数" min-width="65">
          </el-table-column>
          <el-table-column align="right" header-align="center" min-width="90" label="客单价">
            <template scope="scope">
              <p>{{ utils.toFixed2(scope.row.per_money) }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="per_buy_num" header-align="center" align="right" min-width="75" label="客件数">
          </el-table-column>
          <el-table-column prop="per_category_num" align="right" header-align="center" min-width="95" label="每人次客类数">
          </el-table-column>
        </el-table>
      </template>
      <template slot="pagination"></template>
    </table-list>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import progressBar from '../../../components/progressBar/progressBar'
import utils from '../../../misc/utils'
export default {
  data() {
    return {
      summaryData: [],
      utils: utils
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  watch: {
    data() {
      this.summaryData = JSON.parse(JSON.stringify(this.data))
      this.init()
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions([
    ]),
    init() {
      this.$refs['tableList'].init()
    },
     // 处理汇总数据
    processData(data) {
      var _data = JSON.parse(JSON.stringify(data))
      var max = _data.sort((a, b) => {
        return b.peopel_num - a.peopel_num
      })
      if (max && max.length > 0) {
        _data = _data.map(o => {
          o.peopel_num_max = max[0].peopel_num
          return o
        })
      }
      return _data
    }
  },
  props: [
    'data',
    'tableTitle'
  ],
  components: {
    progressBar
  }
}
</script>
<style lang="scss" scoped>

</style>

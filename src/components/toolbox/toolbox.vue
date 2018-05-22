<template>
  <div class="user_toolbox">
    <!-- 按天数快捷搜索插槽 -->
    <slot name="quickSearchByDays">
      <div class="toolbox_control" v-if="showQuickSearchByDays">
        <el-button-group>
          <el-button size="small" :class="days === days_value[0] ? 'toolbox_active' : 'toolbox_default'" @click="switchQuickSearchByDays(days_value[0])">近{{days_value[0]}}天</el-button>
          <el-button size="small" class="margin_left_tiny" :class="days === days_value[1] ? 'toolbox_active' : 'toolbox_default'" @click="switchQuickSearchByDays(days_value[1])">近{{days_value[1]}}天</el-button>
          <el-button size="small" style="margin-left: 2px;" :class="days === days_value[2] ? 'toolbox_active' : 'toolbox_default'" @click="switchQuickSearchByDays(days_value[2])">近{{days_value[2]}}天</el-button>
        </el-button-group>
      </div>
    </slot>
    <!-- 按日期范围搜索插槽 -->
    <slot name="dateRangeSearch">
      <div class="toolbox_control" v-if="showDateRangeSearch">
        {{ dateRangeSearchLabel }}
        <el-date-picker v-model="buyDateRang" @change="searchByDaysRange" type="daterange" format="yyyy-MM-dd" :editable="false" :placeholder="dateRangeSearchPlaceholder" size="small">
        </el-date-picker>
      </div>
    </slot>
    <!-- 关键字搜索插槽 -->
    <slot name="searchKey">
      <search-by-input v-show="showSearchKey" :myPlaceholder="searchKeyPlaceholder" :showClearLink="showClearLink" @doSearch="searchBykeyword" ref="searchByInput">
      </search-by-input>
    </slot>
    <!-- 其它功能插槽 -->
    <slot name="otherTools">

    </slot>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from '../../misc/utils'
export default {
  data() {
    return {
      days: '3',
      buyDateRang: [],
      days_value: ['3', '7', '15']
    }
  },
  // 暂时没有地方使用
  mounted() {
    this.days_value = this.daysValue ? this.daysValue : ['3', '7', '15']
  },
  watch: {
    daysValue() {
      this.days_value = this.daysValue ? this.daysValue : ['3', '7', '15']
    }
  },
  methods: {
    // 按天数快捷搜索
    switchQuickSearchByDays(days) {
      this.days = days
      if (this.buyDateRang.length > 0 && this.buyDateRang[0]) {
        this.buyDateRang = []
      } else {
        this.$emit('quickSearchByDays', days)
      }
    },
    // 按日期范围搜索
    searchByDaysRange(rangeDay) {
      var dayObj = utils.dateRangeFormat(rangeDay)
      this.$emit('quickSearchByDaysRange', dayObj)
    },
    // 关键字搜索
    searchBykeyword(keyword) {
      this.$emit('quickSearchBykeyword', keyword)
    },
    clearSearchBykeyword() {
      this.days = '3'
      this.buyDateRang = []
      this.$refs['searchByInput'].clearAllParam()
    }
  },
  props: [
    'showQuickSearchByDays',
    'showDateRangeSearch',
    'dateRangeSearchLabel',
    'showSearchKey',
    'searchKeyPlaceholder',
    'showClearLink',
    'dateRangeSearchPlaceholder',
    'daysValue'
  ]
}
</script>
<style lang="scss">

</style>

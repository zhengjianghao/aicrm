<template>
  <div>
    <base-tool-box @searchHook="searchHook">
      <template slot="baseSearch" scope="props">
        <!-- 按天数快捷搜索插槽 -->
        <div class="toolbox_control" v-if="showQuickSearchByDays">
          <!-- 插槽中的doSearch()是触发查询的事件,需要传入查询参数；getSearchParams()可以获取查询的参数；重写slot时可以merge查询参数 -->
          <slot name="quickSearchByDays" :doSearch="props.doSearch" :getSearchParams="getSearchParams">
            <el-button-group>
              <el-button size="small" :class="days === days_value[0] ? 'toolbox_active' : 'toolbox_default'" @click="switchQuickSearchByDays(props.doSearch, days_value[0])">&nbsp;近{{days_value[0]}}天</el-button>
              <el-button size="small" class="margin_left_tiny" :class="days === days_value[1] ? 'toolbox_active' : 'toolbox_default'" @click="switchQuickSearchByDays(props.doSearch, days_value[1])">&nbsp;近{{days_value[1]}}天</el-button>
              <el-button size="small" style="margin-left: 2px;" :class="days === days_value[2] ? 'toolbox_active' : 'toolbox_default'" @click="switchQuickSearchByDays(props.doSearch, days_value[2])">近{{days_value[2]}}天</el-button>
            </el-button-group>
          </slot>
        </div>
        <!-- 按日期范围搜索插槽 -->
        <div class="toolbox_control" v-if="showDateRangeSearch">
          <slot name="dateRangeSearch" :doSearch="props.doSearch" :getSearchParams="getSearchParams">
            {{ dateRangeSearchLabel }}
            <el-date-picker v-model="buyDateRang" @change="searchByDaysRange(props.doSearch, $event)" type="daterange" format="yyyy-MM-dd" :editable="false" :placeholder="dateRangeSearchPlaceholder" size="small">
            </el-date-picker>
          </slot>
        </div>
        <!-- 关键字搜索插槽 -->
        <slot name="searchKey" :doSearch="props.doSearch" :getSearchParams="getSearchParams">
          <search-by-input :searchStyle="searchKeyStyle" v-show="showSearchKey" :myPlaceholder="searchKeyPlaceholder" :showClearLink="showClearLink" @doSearch="searchBykeyword(props.doSearch, $event)" ref="searchByInput">
          </search-by-input>
        </slot>
        <div class='pull-right' style='margin: 10px 20px 7px 0px' v-if='showExport'>
          <slot name='otherTools'>
            <el-button type="primary" size="small" @click="exportExcel()">导出</el-button>
            <a href="" :download="excelName" id="hf"></a>
          </slot>
        </div>
      </template>
    </base-tool-box>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from '../../misc/utils'
import baseToolBox from './baseToolBox'
import moment from 'moment'
export default {
  data() {
    return {
      days: '3',
      buyDateRang: [],
      buyDateRangFormat: {
        startDate: '',
        endDate: ''
      },
      keyWord: '',
      excelName: '文本的名字.xlsx',
      days_value: ['3', '7', '15'],
      is_search: ''
    }
  },
  computed: {
    ...mapGetters([
      'jurisdictionData',
      'baseMCommonData'
    ]),
  },
  mounted() {
    this.days_value = this.daysValue ? this.daysValue : ['3', '7', '15']
  },
  watch: {
    daysValue() {
      this.days_value = this.daysValue ? this.daysValue : ['3', '7', '15']
    }
  },
  methods: {
    /**
     * 触发父组件事件
     * @param searchObj {Object}
     **/
    searchHook(searchObj) {
      this.$emit('searchHook', searchObj)
    },
    /**
     * 获取搜索的参数对象
     * @return {Object}
     **/
    getSearchParams() {
      return {
        days: this.days,
        buyDateRangFormat: this.buyDateRangFormat,
        keyWord: this.keyWord,
        isSearch: this.is_search
      }
    },
    /**
     * 按天数快捷搜索
     * @param doSsearch {Function} 搜索的钩子函数
     * @param day {String} 搜索的天数
     **/
    switchQuickSearchByDays(doSearch, days) {
      this.days = days
      if (this.buyDateRang.length > 0 && this.buyDateRang[0]) {
        // 会自动触发change()
        this.buyDateRang = []
      } else {
        this.is_search = ''
        // 搜索
        doSearch(this.getSearchParams())
      }
    },
    /**
     * 按日期范围搜索
     * @param doSsearch {Function} 搜索的钩子函数
     **/
    searchByDaysRange(doSearch, rangeDay) {
      this.buyDateRangFormat = utils.dateRangeFormat(rangeDay)
      this.is_search = ''
      // 搜索
      doSearch(this.getSearchParams())
    },
    /**
     * 关键字搜索
     * @param doSsearch {Function} 搜索的钩子函数
     **/
    searchBykeyword(doSearch, keyWord) {
      this.keyWord = keyWord.search_word
      this.is_search = keyWord.is_search
      // 搜索
      doSearch(this.getSearchParams())
    },
    /**
     * 初始化搜索条件
     **/
    clearSearchBykeyword() {
      this.days = '3'
      this.buyDateRang = []
      this.$refs['searchByInput'].clearAllParam()
    },
    //导出
    exportExcel() {
      //修改导出的文件名
      var _a = document.getElementById("hf")
      this.excelName = this.baseMCommonData.title + '-' + this.tableName + '-' + moment().format('YYYYMMDDHHmm') + ".xlsx"
      _a.download = this.excelName
      this.$emit('exportExcel')
    }
  },
  props: [
    'showQuickSearchByDays',
    'showDateRangeSearch',
    'dateRangeSearchLabel',
    'showSearchKey',
    'searchKeyPlaceholder',
    'searchKeyStyle',
    'showClearLink',
    'dateRangeSearchPlaceholder',
    'showExport',
    'tableName'
  ],
  components: {
    baseToolBox
  }
}
</script>
<style lang="scss">

</style>

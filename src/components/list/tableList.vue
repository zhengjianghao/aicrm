<template>
  <div :class="configClass ? [!hidPage ? 'hasPadding' : 'noPadding', 'form-control form_control form-control-custom'] : 'sub_main_content'">
    <!--营销配置页左右工具栏，添加宝贝等-->
    <div v-if="showConfBox" class="user_toolbox chooseGoods_table_title" style="margin:0; padding-bottom: 5px;border-left: 3px solid #0BB8F8;border-bottom: 1px solid #d1dee5;">
      <div class="pull-left maintenance_title">
        <slot name="toolboxLeft" :data="filterListData">
        </slot>
      </div>
      <div class="pull-right" style="padding-right:10px">
        <slot name="toolboxRight" :data="filterListData">
        </slot>
      </div>
    </div>
    <!-- 工具栏 -->
    <slot name="toolbox" :pageObj="pagination">
      <div>
        <table-tool-box v-if='!hiddenToolBox' :tableName='tableName' :showExport='showExport' :showQuickSearchByDays='showQuickSearchByDays' @exportExcel='exportExcel' :showDateRangeSearch="showDateRangeSearch" :showSearchKey="showSearchKey" @searchHook="searchHook" :dateRangeSearchLabel="dateRangeSearchLabel" :dateRangeSearchPlaceholder="dateRangeSearchPlaceholder" :searchKeyPlaceholder="searchKeyPlaceholder" :searchKeyStyle="searchKeyStyle" :showClearLink="showClearLink" ref="toolbox">
        </table-tool-box>
      </div>
    </slot>
    <div id='sheetjs' :class="listTableClass ? listTableClass : 'user_tablelist'" v-loading="loading" element-loading-text="数据较多,请耐心等待">
      <!-- 分页 -->
      <slot name="tableData" :data="filterListData.curPageData" :remotePageData="filterListData" :startIndexOnCurPage="pagination.pageSize * (pagination.pageIndex - 1)" :totalNum="filterListData.totalNum"></slot>
      <!-- 不分页 -->
      <slot name="tableDataNoPage" :data="filterListData"></slot>
      <!-- 页码 -->
      <slot name="pagination">
        <div class="pull-right" v-if="!hidPage">
          <el-pagination ref="elPage" :page-sizes="pagination.pageSizes" v-click-trigger:pageClick="doPageClick" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="filterListData.totalNum === undefined ? pagination.totalNum : filterListData.totalNum" :current-page="pagination.pageIndex">
          </el-pagination>
        </div>
      </slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import utils from '../../misc/utils'
import pagination from '../../misc/pagination'
import tableToolBox from '../../components/toolbox/tableToolBox'
import API_MARKET from '../../service/marketing.service'
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      pagination: {},
      loading: false,
      buyDateRang: [],
      startDate: undefined,
      endDate: '',
      search_word: '',
      days: '3',
      utils: utils,
      isClearParam: false // 清空查询参数查询
    }
  },
  created() {
    this.pagination = Object.assign(this.pagination, pagination)
  },
  mounted() {
    this.isClearParam = true
    this.clearSearchParam()
    this.pagination.init()
  },
  watch: {
    filterListData() {
      this.loading = false
    },
  },
  methods: {
    /**
     * 如果是重复的请求 返回false
     * @param searchObj 查询参数
     * @return {Boolean} 重复查询返回 false 非重复返回 true
     **/
    noRepeatSearch(searchObj) {
      if (this.search_word === searchObj.keyWord &&
        this.startDate === searchObj.buyDateRangFormat.startDate &&
        this.endDate === searchObj.buyDateRangFormat.endDate &&
        this.days === searchObj.days) {
        return false
      } else {
        return true
      }
    },
    /**
     * 触发父组件事件
     * @param searchObj {Object} 搜索条件对象
     **/
    searchHook(searchObj) {
      var that = this
      if (!this.isClearParam) { // 如果不是由清空参数触发则进入
        if(searchObj.isSearch === 'noSearch') { // 关键字改变实时同步但是不搜索，只有点击的时候才搜索
          this.search_word = searchObj.keyWord
        } else {
          this.resetPageNum()
          this.search_word = searchObj.keyWord
          this.startDate = searchObj.buyDateRangFormat.startDate
          this.endDate = searchObj.buyDateRangFormat.endDate
          this.days = searchObj.days
          // 触发父组件搜索事件
          this.searchRemote()
        }
      } else { // 如果是由清空参数触发则将清空参数的变量改为false
        setTimeout(() => { // 放入timer内，即使短时间内多次触发该函数，isClearParam只在最后一次被赋值为false
          that.isClearParam = false
        })
      }
    },
    /**
     * 重置查询参数、页码，重新执行查询
     * 通常在页卡被激活时调用
     */
    init() {
      this.isClearParam = true
      this.clearSearchParam()
      this.pagination.init()
      this.searchRemote()
    },
    /**
     * 页码重置到第1页
     */
    resetPageNum() {
      this.pagination.pageIndex = 1
    },
    /**
     * 清空查询参数
     */
    clearSearchParam() {
      this.days = '3'
      this.buyDateRang = []
      this.search_word = ''
      this.startDate = ''
      this.endDate = ''
      if (this.$refs['toolbox']) {
        this.$refs['toolbox'].clearSearchBykeyword()
      }
    },
    /**
     * 触发父组件事件，一般本地分页
     */
    searchLocal() {
      this.loading = true
      this.$emit('getFilterList', [
        this.pagination,
        this.search_word,
        this.days,
        this.startDate,
        this.endDate,
        this.sortBy
      ])
    },
    /**
     * 触发父组件事件，一般数据库分页
     */
    searchRemote() {
      this.loading = true
      // 主动获取数据
      this.$emit('getBaseList', [
        this.pagination,
        this.days,
        this.startDate,
        this.endDate,
        this.search_word,
        this.sortBy
      ])
    },
    /**
     * 取消编辑状态，暂时未发现被调用
     */
    cancelAllEdit() {
      this.$emit('cancelAllEdit', this.filterListData.curPageData)
    },
    /**
     * 跳转页面
     * @param val {Integer} 页码
     * @param pages {Integer} 每页条数
     */
    doPageClick(val, pages) {
      this.pagination.pageIndex = val
      if(pages) {
        this.pagination.pageSize = pages
      }
      this.searchLocal()
    },
    /**
     * 修改每页显示条数
     * @param val {Integer} 每页条数
     */
    exportExcel() {
      var tmpDown
      // var _data = this.filterListData
      this.loading = true
      API_MARKET[this.getData](
        { pageIndex: 1, pageSize: 1000000 },
        this.$route.query.id,
        this.days,
        this.startDate,
        this.endDate,
        this.search_word,
        'all'
      ).then(data => {
        if(data.length == 0) {
          this.$message({
            message: '暂无数据',
            type: 'error',
            customClass: 'message_position',
          })
          this.loading = false
          return
        }
        var _tableData = this.utils.changeTableData(this.headerData, data)
        var _t = this.utils.changeExcelData(_tableData)
        tmpDown = new Blob([this.s2ab(XLSX.write(_t,
          { bookType: 'xlsx', bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
        ))], {
            type: ""
          }) //创建二进制对象写入转换好的字节流
        var href = URL.createObjectURL(tmpDown); //创建对象超链接
        var _a = document.getElementById("hf")
        _a.href = href; //绑定a标签
        // document.getElementById("hf").click(); //模拟点击实现下载
        _a.click()
        setTimeout(function() { //延时释放
          URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
        }, 100);
        this.loading = false
      })
    },
    s2ab(s) { //字符串转字符流
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
      return buf
    },
  },
  props: [
    'sortBy',
    'filterListData',
    'showQuickSearchByDays',
    'showDateRangeSearch',
    'showSearchKey',
    'dateRangeSearchLabel',
    'dateRangeSearchPlaceholder',
    'searchKeyPlaceholder',
    'searchKeyStyle',
    'showClearLink',
    'listTableClass',
    'configClass',
    'hidPage',
    'hiddenToolBox',
    'showConfBox',
    'headerData',
    'showExport',
    'getData',
    'tableName'
  ],
  components: {
    tableToolBox
  }

}
</script>
<style lang="scss" scoped>
.chooseGoods_table_title {
  padding: 10px 0;
  font-size: 12px;
  color: #999;
  background: #f1f2f3;
  .span {
    margin-left: 10px;
    margin-top: 5px;
    line-height: 30px;
  }
  .num {
    font-size: 16px;
    color: #0BB8F8;
  }
  .el-button {
    padding: 4px 8px;
    margin: 0px 10px 0px 5px;
  }
  .toolbox_title {
    margin: 2px 0 0 20px;
  }
}

#aicrm .form_control.form-control-custom.hasPadding {
  padding-bottom: 50px;
  padding-top: 0px;
}

#aicrm .form_control.form-control-custom.noPadding {
  padding-bottom: 0px;
  padding-top: 0px;
}
</style>

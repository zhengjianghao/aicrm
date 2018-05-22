<template>
  <div class="form-control form_control form-control-custom" :class="nopage ? 'noPadding' : 'hasPadding'">
    <div class="user_toolbox chooseGoods_table_title" style="margin:0; padding-bottom: 5px;border-left: 3px solid #0BB8F8;border-bottom: 1px solid #d1dee5;" v-show="!showToolBox">
      <div class="pull-left maintenance_title">
        <slot name="toolboxLeft" :data="filterListData">
        </slot>
      </div>
      <div class="pull-right" style="padding-right:10px">
        <slot name="toolboxRight" :data="filterListData">
        </slot>
      </div>
    </div>
    <slot name="toolbox">
    </slot>
    <div class="market_tablelist" v-loading="loading" element-loading-text="数据较多,请耐心等待">
      <!--分页-->
      <slot name="tableData" :data="filterListData.curPageData" :startIndex="pagination.pageSize * (pageIndex-1)" :totalNum="filterListData.totalNum"></slot>
      <!-- 不分页 -->
      <slot name="tableDataNoPage" :data="filterListData"></slot>
      <div class="pull-right" v-show="!nopage">
        <el-pagination :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="filterListData.totalNum" @current-change="doPageByNum" @size-change="doPageBySize" :current-page="pageIndex">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import pagination from '../../misc/pagination'
export default {
  data() {
    return {
      pagination: pagination,
      loading: false,
      pageIndex: 1
    }
  },
  watch: {
    filterListData() {
      this.loading = false
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.pageIndex = 1
      this.pagination.init()
      this.searchRemote()
    },
    // 处理本地数据
    searchLocal() {
      this.loading = true
      this.$emit('getFilterList',
        this.pagination
      )
    },
    // 获取远程数据
    searchRemote() {
      this.loading = true
      // 主动获取数据
      this.$emit('getBaseList', [
        this.pagination,
        this.sortBy
      ])
    },
    doPageByNum(val) {
      this.pagination.pageIndex = val
      this.pageIndex = val
      this.searchLocal()
    },
    doPageBySize(val) {
      this.pagination.pageSize = val
      this.searchLocal()
    }
  },
  props: [
    'sortBy',
    'filterListData',
    'nopage',
    'showToolBox'
  ]
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

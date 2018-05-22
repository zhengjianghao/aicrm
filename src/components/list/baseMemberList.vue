<template>
  <div>
    <div class="search_box">
        <div class="user_toolbox">
            <search-input
                myPlaceholder="会员ID/姓名/手机号"
                :searchStyle="{width:'300px'}"
                :searchByWord="search"
                showClearLink="true"
                @sycnSearchWord="sycnSearchWord"
                :searchWord="search_word"
                >
            </search-input>
        </div>
    </div>
    <div
        class="user_tablelist"
        v-loading="loading"
        element-loading-text="数据较多,请耐心等待">
        <slot
          name="slotTableList"
          :slotMethod="emitComstomMethod"
          :data="blackGreyList"
          :slotCheckChang="selected"
        >
        </slot>
        <div class="pull-right">
            <el-pagination
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.totalNum"
            @current-change="doPageByNum"
            @size-change="doPageBySize"
            :current-page="pageIndex"
            >
            </el-pagination>
        </div>
    </div>
   <slot
      name="slotFooter"
      :slotMethod="batchOper"
    >
    </slot>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../misc/global.constant'
  import utils from '../../misc/utils'
  import pagination from '../../misc/pagination'
  export default {
    data() {
      return {
        loading: false,
        pagination: {},
        pageIndex: 1,
        search_word: '',
        multipleSelection: [],
      }
    },
    watch: {
    },
    mounted() {
      this.pagination = Object.assign(this.pagination, pagination)
      this.init()
      this.search()
    },
    computed: {
      ...mapGetters(['blackGreyList'])
    },
    methods: {
      // 初始化页面
      init() {
        // 分页初始化
        this.pagination.init()
        this.pageIndex = 1
        // 初始化关键字搜索
        this.search_word = ''
      },
      sycnSearchWord(val) {
        this.search_word = val
      },
      search() {
        this.loading = true
        var id = this.groupId ? this.groupId : this.$route.query.id
        this.getData([id, this.pagination, this.search_word]).then( data => {
          this.loading = false
        })
      },
      /**
       *  单个操作会员
       *  @param id {Array} [Number] 会员id
       * */
      emitComstomMethod(ids) {
          this.comstomMethod(ids).then(o => {
            utils.showSuccessMsg(this, '操作成功')
            this.search()
          })
      },
      /**
       *  批量操作会员
       *  @param id {Array} [Number] 会员id
       * */
      batchOper() {
        var sels = this.multipleSelection
        if(!sels || sels.length === 0) {
          utils.showErrorMsg(this, '请选择会员！')
          return
        }
        var ids = sels.map(o => {
          return o.id
        })
        this.comstomMethod(ids).then(o => {
          utils.showSuccessMsg(this, '批量操作成功')
          this.search()
        })
      },
      doPageByNum(val) {
        this.pagination.pageIndex = val
        this.pageIndex = val
        this.search()
      },
      doPageBySize(val) {
        this.pagination.pageSize = val
        this.search()
      },
      selected(val) {
        this.multipleSelection = val;
      }
    },
    props: [
      'comstomMethod',
      'groupId',
      'getData'
    ]
}
</script>
<style lang="scss" scoped>
  @import '../../style/variable.scss';
.user_tablelist {
  overflow: hidden;
  background: $white;
}
.el-table {
    font-size: $menuFontSize;
}
.dialog_footer {
    position: relative;
    border-top: solid 1px #ccc;
    overflow: hidden;
    width: 100%;
    .el-button {
        float: right;
        margin: 10px 10px 10px 0px;
    }
}
</style>

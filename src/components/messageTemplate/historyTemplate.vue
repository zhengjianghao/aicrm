<template>
  <div
    v-loading="loading"
    element-loading-text="数据较多,请耐心等待">
    <el-table
            :data="filterHistoryTemplate.curPageData"
            stripe
            border
            max-height="580"
            style="width: 100%"
            >
            <el-table-column
            prop="is_copy"
            align="center"
            min-width="40"
            label="来源">
            </el-table-column>
            <el-table-column
            prop="content"
            header-align='center'
            min-width="260"
            label="内容">
            </el-table-column>
            <el-table-column
            prop="char_count"
            align="center"
            min-width="40"
            label="条数">
            </el-table-column>
            <el-table-column
            prop="start_time"
            align="center"
            min-width="110"
            label="起始时间">
            </el-table-column>
            <el-table-column
            prop="end_time"
            align="center"
            min-width="110"
            label="结束时间">
            </el-table-column>
            <el-table-column
            min-width="40"
            align="center"
            label="操作">
            <template scope="scope">
                <a class="link_underline" @click="updateMSG(scope.row.content,scope.row.id)">引用</a>
            </template>
            </el-table-column>
        </el-table>
        <div class="pull-right">
            <el-pagination
                :page-sizes="pagination.pageSizes"
                :page-size="pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="filterHistoryTemplate.totalNum"
                @current-change="doPageByNum"
                :current-page="pageIndex"
                @size-change="doPageBySize">
            </el-pagination>
        </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../misc/global.constant'
  import pagination from '../../misc/pagination'
  import utils from '../../misc/utils'
  export default {
    data() {
      return {
          pagination: pagination,
          marketType: '',
          g_const: globalConstant,
          pageIndex: 1,
          loading: false,
          type: ''
       }
    },
    computed: {
      ...mapGetters([
        'historyTemplate',
        'filterHistoryTemplate',
        'baseMCommonData',
        'openModalState'
      ])
    },
    watch: {
      openModalState() {
        if(this.openModalState.name === this.g_const.openModalCodes.messageTemplate) {
          this.init()
          //this.type = this.openModalState.param.state
        }
      },
      historyTemplate() {
        this.loading = false
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      ...mapActions([
        'updateMsgContent',
        'getHistoryTemplate',
        'getHistoryTemplateByParam',
        'closeModal',
        'useMessageTemplate',
        'getMessageTemplate',
        'getMessageTemplateByParam',
        'updateMesContent',
        'updateIsCopy'
      ]),
      init() {
        this.pagination.pageIndex = 1
        this.pagination.pageSize = 10
        this.pageIndex = 1
        this.marketType = utils.getRealMarketType(this.baseMCommonData.type)
        this.loading = true
        this.getHistoryTemplate([this.pagination, 'used', this.marketType])
        this.getHistoryTemplateByParam([this.pagination])
      },
      search() {
        this.getHistoryTemplateByParam([this.pagination])
      },
      doPageByNum(val) {
        this.pagination.pageIndex = val
        this.search()
      },
      doPageBySize(val) {
        this.pagination.pageSize = val
        this.pageIndex = val
        this.search()
      },
      updateMSG(msg,id) {
        var that = this
        this.updateIsCopy(true)
        this.updateMesContent(true)
        this.updateMsgContent({
          type: that.openModalState.param.state,
          msg: msg.replace('【签名】','')
        });
        this.useMessageTemplate([id,this.marketType]).then(() => {
          this.getHistoryTemplate([this.pagination, 'used', this.marketType])
          this.getHistoryTemplateByParam([this.pagination])
          this.getMessageTemplate([this.pagination, 'share', this.marketType])
          this.getMessageTemplateByParam([this.pagination])
        });
        this.closeModal('messageTemplate')
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
.sys_template {
  color: #0BB8F8;
}
</style>

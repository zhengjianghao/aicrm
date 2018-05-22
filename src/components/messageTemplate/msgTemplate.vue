<template>
  <div
    v-loading="loading"
    element-loading-text="数据较多,请耐心等待">
    <el-table
        :data="filterMessageTemplate.curPageData"
          stripe
          border
          max-height="580"
          style="width: 100%"
          >
          <el-table-column
          prop="from"
          align="center"
          min-width="40"
          label="来源">
              <template scope='scope'>
                <span :class="scope.row.from == '系统推荐' ? 'sys_template' : ''">{{scope.row.from}}</span>
              </template>
          </el-table-column>
          <el-table-column
          prop="content"
          header-align='center'
          min-width="255"
          label="内容">
          </el-table-column>
          <el-table-column
          prop="char_count"
          min-width="40"
          align="center"
          label="条数">
          </el-table-column>
          <el-table-column
          prop="used_count"
          min-width="65"
          align="center"
          label="引用次数">
          </el-table-column>
          <el-table-column
          prop="created_at"
          min-width="110"
          align="center"
          label="发布时间">
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
              :current-page="pageIndex"
              layout="total, sizes, prev, pager, next, jumper"
              :total="filterMessageTemplate.totalNum"
              @current-change="doPageByNum"
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
        'messageTemplate',
        'filterMessageTemplate',
        'baseMCommonData',
        'openModalState'
      ])
    },
    watch: {
      openModalState() {
        if(this.openModalState.name === this.g_const.openModalCodes.messageTemplate) {
          //this.type = this.openModalState.param.state
          this.init()
        }
      },
      messageTemplate() {
        this.loading = false
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      ...mapActions([
        'updateMsgContent',
        'getMessageTemplate',
        'getMessageTemplateByParam',
        'closeModal',
        'useMessageTemplate',
        'getHistoryTemplate',
        'getHistoryTemplateByParam',
        'updateIsCopy',
        'updateMesContent'
      ]),
      init() {
        this.pagination.pageIndex = 1
        this.pagination.pageSize = 10
        this.pageIndex = 1
        this.loading = true
        this.marketType = utils.getRealMarketType(this.baseMCommonData.type)
        this.getMessageTemplate([this.pagination, 'share', this.marketType])
        this.getMessageTemplateByParam([this.pagination])
      },
      search() {
          this.getMessageTemplateByParam([this.pagination])
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
      updateMSG(msg,id){
        var that = this
        this.updateIsCopy(true)
        this.updateMesContent(true)
        this.updateMsgContent({
          type: that.openModalState.param.state,
          msg: msg.replace('【签名】','')
        });
        this.useMessageTemplate([id, this.marketType]).then(() => {
          this.getMessageTemplate([this.pagination,'share',this.marketType])
          this.getMessageTemplateByParam([this.pagination])
          this.getHistoryTemplate([this.pagination,'used',this.marketType])
          this.getHistoryTemplateByParam([this.pagination])
        });
        this.closeModal('messageTemplate');
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

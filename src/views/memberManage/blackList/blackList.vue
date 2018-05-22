<template>
  <div>
      <content-header
        name="黑名单"
        tip='设计理念：加入黑名单后将不再推送信息，同时不再享受任何营销政策'
      >
        <template
          slot="toolBox"
        >
          <el-button type="primary" @click="openModal(gbConst.openModalCodes.blackList)">添加会员到黑名单</el-button>
        </template>
      </content-header>
      <table-list
        ref="tableList"
        :filterListData="memberListData"
        :showClearLink="true"
        :sortBy="sortBy" :showQuickSearchByDays="false" :showDateRangeSearch="false" :showSearchKey="true" searchKeyPlaceholder="会员ID/姓名/手机号" :searchKeyStyle="{width:'300px'}" @getBaseList="searchRemote" @getFilterList="searchLocal"
      >
        <template
          slot="tableData"
          scope="scope"
        >
            <el-table
              class="user_header"
              :data="scope.remotePageData"
              border
              stripe
              max-height="640"
              style="background:$white">
                <el-table-column
                  :prop="settingGlobal.IS_HIDE_ID == 1 ? 'nick_change' : 'nick'"
                  align="center"
                  min-width="150"
                  label="买家ID">
                </el-table-column>
                <el-table-column
                  align="center"
                  :prop="settingGlobal.IS_HIDE_NAME == 1 ? 'real_name_change' : 'real_name'"
                  min-width="60"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  :prop="settingGlobal.IS_HIDE_PHONE == 1 ? 'mobile_change' : 'mobile'"
                  align="center"
                  min-width="80"
                  label="手机号">
                </el-table-column>
                <el-table-column
                  prop="add_time"
                  min-width="88"
                  align="center"
                  label="加入黑名单时间">
                </el-table-column>
                <el-table-column
                  align="center"
                  min-width="130"
                  label="操作">
                  <template scope="props">
                      <a class="link_underline" @click="openModal(gbConst.openModalCodes.memberDetails, props.row.id)">查看详情</a>
                      <a class="link_underline warning" @click="remove(props.row.id)">移除黑名单</a>
                  </template>
                </el-table-column>
            </el-table>
          </template>
      </table-list>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../../misc/global.constant'
  export default {
    data() {
      return {
        gbConst: globalConstant,
        sortBy: ''
      }
    },
    computed: {
      ...mapGetters([
        'closeModalName',
        'settingGlobal',
        'memberListData'
      ])
    },
    mounted() {
      this.init()
    },
    watch: {
      /**
       * 关闭弹出框，通用
       */
      closeModalName() {
        if(this.closeModalName === 'blackList') {
          this.init()
        }
      }
    },
    methods: {
      ...mapActions([
        'updateOpenModal',
        'removeBlackList',
        'getMemberListPage'
      ]),
      /**
       * 刷新当前请求
       */
      init() {
        this.$refs['tableList'].init()
      },
      /**
       * 获取会员分组id
       * @return {String} 会员分组id
       */
      getGroupId() {
        return this.$route.query.id
      },
      /**
       * 刷新当前请求
       */
      refreshByDefault() {
        this.$refs['tableList'].searchLocal()
      },
      /**
       * 获取数组
       * @param pagination {Object} 分页对象
       * @param search_word {String} 搜索关键字
       */
      searchRemote([pagination, days, startDate, endDate, search_word, sortBy]) {
        // 主动获取数据
        this.getMemberListPage([this.getGroupId(), pagination, search_word])
      },
      /**
       * 获取数组
       * @param pagination {Object} 分页对象
       * @param search_word {String} 搜索关键字
       */
      searchLocal([pagination, search_word, days, startDate, endDate, sortBy]) {
        // 主动获取数据
        this.getMemberListPage([this.getGroupId(), pagination, search_word])
      },
      /**
       * 打开弹窗
       * @param code {String} 用来区分弹窗的代码
       * @param id {String} 会员分组id
       */
      openModal(code, id) {
          this.updateOpenModal({
              name: code,
              param: {
                  id: id
              }
          })
      },
      /**
       * 移除灰名单列表
       * @param ids {Array<String>} 灰名单数组
       */
      remove(ids) {
        var that = this
        that.$confirm('是否确认将该会员移除黑名单?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.removeBlackList([ids]).then(o => {
              // 刷新
              that.refreshByDefault()
              that.$message({
                  message: '移除成功',
                  customClass: 'message_position',
                  type: 'success'
              })
            })
          }).catch(() => {
            that.$message({
                type: 'info',
                customClass: 'message_position',
                message: '已取消'
            });
        })
      }

    }
}
</script>
<style lang="scss">
</style>

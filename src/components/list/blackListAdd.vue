<template>
  <div>
    <base-member-list
      :comstomMethod="doAddBlackList"
      :getData="getList"
      ref="baseMemberList"
    >
      <template
        slot="slotTableList"
        scope="props"
      >
        <el-table
            :data="props.data"
            border
            max-height="435"
            @selection-change="props.slotCheckChang"
            style="width: 100%">
            <el-table-column
            type="selection"
            align="center"
            prop="id"
            label='全选'
            width="55">
            </el-table-column>
            <el-table-column
            :prop="settingGlobal.IS_HIDE_ID == 1 ? 'nick_change' : 'nick'"
            align="center"
            label="会员ID">
            </el-table-column>
            <el-table-column
            :prop="settingGlobal.IS_HIDE_NAME == 1 ? 'real_name_change' : 'real_name'"
            align="center"
            label="姓名">
            </el-table-column>
            <el-table-column
            :prop="settingGlobal.IS_HIDE_PHONE == 1 ? 'mobile_change' : 'mobile'"
            align="center"
            label="手机号"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            align="center"
            min-width="130"
            label="操作">
            <template scope="scope">
                <a class="link link_underline" @click="props.slotMethod([scope.row.id])">添加该会员</a>
            </template>
            </el-table-column>
        </el-table>
      </template>
      <template
        slot="slotFooter"
        scope="props"
      >
        <div class="dialog_footer">
            <el-button @click="close()">取消</el-button>
            <el-button type="primary" @click="props.slotMethod">批量添加</el-button>
        </div>
      </template>
    </base-member-list>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import g_const from '../../misc/global.constant'
  export default {
    computed: {
      ...mapGetters([
        'openModalState',
        'settingGlobal'
      ])
    },
    watch: {
      // 弹出时调用, 当用户打开时，重新获取数据
      openModalState() {
        if(this.openModalState.name === g_const.openModalCodes.blackList) {
          this.$refs.baseMemberList.init()
          this.$refs.baseMemberList.search()
        }
      }
    },
    methods: {
      ...mapActions([
        'addBlackList',
        'closeModal',
        'getOutOfBlackListPage'
      ]),
      // 回调函数，为子组件提供数据
      getList([id, pagination, search_word]) {
        return this.getOutOfBlackListPage([search_word, pagination])
      },
       /**
       *  关入小黑屋
       *  @param ids 会员ids
       * */
      doAddBlackList(ids) {
          return this.addBlackList(ids)
      },
      // 关闭弹出框
      close() {
        this.closeModal('blackList')
      }
    }
}
</script>
<style lang="scss" scoped>
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

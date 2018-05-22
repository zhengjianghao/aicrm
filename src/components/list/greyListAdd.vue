<template>
  <div>
    <base-member-list
      :comstomMethod="doAddGreyList"
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
      // 弹出时调用
      openModalState() {
        if(this.openModalState.name === g_const.openModalCodes.greyList) {
          this.$refs.baseMemberList.init()
          this.$refs.baseMemberList.search()
        }
      }
    },
    methods: {
      ...mapActions([
        'addGreyList',
        'closeModal',
        'getOutOfGreyListPage'
      ]),
      getList([id, pagination, search_word]) {
        return this.getOutOfGreyListPage([search_word, pagination])
      },
       /**
       *  关入小黑屋
       *  @param id 会员id
       * */
      doAddGreyList(ids) {
        return this.addGreyList(ids)
      },
      close() {
        this.closeModal('greyList')
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

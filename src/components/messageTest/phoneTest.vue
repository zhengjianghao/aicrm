<template>
  <div
    v-loading="loading"
    element-loading-text="数据较多,请耐心等待">
    <el-table
      class="user_header"
      :data="filterContactListData.curPageData"
      border
      stripe

      style="width:100%;max-height:435px"
      max-height="435">
      <el-table-column
      prop="name"
      align="center"
      min-width="100"
      label="名称">
      <template scope="scope">
          <span>{{scope.row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column
      prop="mobile"
      align="center"
      min-width="140"
      label="手机号">
      <template scope="scope">
          <div v-show="filterContactListData.curPageData[scope.$index].isEdit">
              <el-input v-model="scope.row.mobile"></el-input>
          </div>
          <span v-show="!filterContactListData.curPageData[scope.$index].isEdit">{{scope.row.mobile}}</span>
      </template>
      </el-table-column>
      <el-table-column
      width="200"
      align="center"
      label="操作">
      <template scope="scope">
          <div v-show="!filterContactListData.curPageData[scope.$index].isEdit">
            <a class="Edit link" @click="edit(scope)">编辑</a>
            <a class="Delet link" @click="del(scope.row.id)">删除</a>
          </div>
          <div v-show="filterContactListData.curPageData[scope.$index].isEdit">
            <a class="Edit link" @click="save(scope.row.mobile, scope.row.id, scope.$index)">编辑完成</a>
            <a class="Cancel link" @click="cancel(scope.$index)">取消</a>
          </div>
      </template>
      </el-table-column>
    </el-table>
    <div class="pull-right">
        <el-pagination
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filterContactListData.totalNum"
          @current-change="doPageByNum"
          @size-change="doPageBySize"
          :current-page="pageIndex"
          >
        </el-pagination>
    </div>
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
        vm: {
          activeTabName: 'testPhoneNum'
        },
        pagination: pagination,
        isEditContact: false,
        contactName: '',
        contactPhone: '',
        contactId: '',
        pageIndex: 1,
        loading: false
      }
    },
    props: ['active'],
    watch: {
        openModalState() {
            // 从浏览测试号码及分组页面过来，需要选定相应的页卡
            if(!this.openModalState.param) {
                return
            }else if(this.openModalState.param.state) {
                this.vm.activeTabName = this.openModalState.param.state;
            }else {
                this.vm.activeTabName = "testPhoneNum"
            }
        },
        subState() {
            if(this.subState === 'testPhoneNumber') {
                this.init()
            }
        },
        filterContactListData() {
            this.loading = false
        }
    },
    mounted() {
        this.init()
    },
    computed: {
        ...mapGetters(['openModalState', 'subState', 'filterContactListData', 'contactListData'])
    },
    methods: {
      ...mapActions(['getContactList', 'getContactListByParam', 'deleteContact', 'updateContact']),
      init() {
          if(!this.filterContactListData.curPageData) return
          this.pagination.pageIndex = 1
          this.pagination.pageSize = 10
          this.pageIndex = 1
          this.filterContactListData.curPageData.forEach((curObj, index) => {
            if(curObj.isEdit) {
                curObj.isEdit = false
                curObj.mobile = curObj.oldPhone
            }
          })
          this.search()
      },
      search() {
          this.loading = true
          this.getContactListByParam(this.pagination)
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
      save(phone, id, index) {
        if(!phone) {
            utils.showErrorMsg(this, '手机号不能为空')
            return
        }
        if(!utils.phoneRex.test(phone)) {
            utils.showErrorMsg(this, '手机号格式不正确')
            return
        }
         // 手机号未修改 不进行数据库操作
        var noModify = this.contactListData.filter(o => {
            return o.oldPhone == phone && o.id === id
        }).length === 1
        if(noModify) {
            utils.showSuccessMsg(this, '修改成功')
            // 退出编辑状态
            this.filterContactListData.curPageData[index].isEdit = false
            return
        }
        // 存在相同号码则返回false
        var notExist = this.contactListData.every(o => {
            return o.oldPhone !== phone || o.id === id
        })
        if(!notExist) {
            utils.showErrorMsg(this, '该手机号已存在')
            return
        }
        this.updateContact([id, {
            mobile: phone
        }]).then(o => {
            // 退出编辑状态
            this.filterContactListData.curPageData[index].isEdit = false
            utils.showSuccessMsg(this, '修改成功')
        })
      },
      edit(scope) {
        var curObj = this.filterContactListData.curPageData[scope.$index]
        this.$set(curObj, 'isEdit', true)
        curObj.oldPhone = curObj.mobile
      },
      del(id) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.deleteContact(id).then(o => {
            utils.showSuccessMsg(this, '删除成功')
            this.getContactList(this.pagination)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            customClass: 'message_position',
            message: '已取消删除'
          });
        });

      },
      cancel(index) {
        var curObj = this.filterContactListData.curPageData[index]
        curObj.mobile = curObj.oldPhone
        curObj.isEdit = false
      }
    },
    components: {
    }
}
</script>
<style lang="scss" scoped>
  @import '../../style/variable.scss';

.el-table {
    font-size: $menuFontSize;
}
.Edit {
    text-decoration: underline;
    color: $primary;
    margin-right: 5px;
}
.Delet {
    text-decoration: underline;
    color: $warning;
}
.Cancel {
    text-decoration: underline;
    color: $menuColor;
}
.MR{
    margin-right:5px;
}
.add_input {
    margin: 5px 0px;
    .el-input {
        display: inline-block;
    }
}
.close_font {
    margin: 0px 3px 0px 10px;
}
.cell {
    padding-bottom: 10px;
}
.smallDialog {
    .el-dialog__header {
        margin: 0
    }
}
</style>

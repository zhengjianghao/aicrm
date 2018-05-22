<template>
  <div v-loading="loading" element-loading-text="数据较多,请耐心等待">
    <el-table class="user_header" :data="filterContactGroupListData.curPageData" border stripe max-height="435" style="background:$white">
      <el-table-column prop="group_name" align="center" min-width="100" label="测试组名称">
        <template scope="scope">
          <span v-show="!filterContactGroupListData.curPageData[scope.$index].isEdit">
            {{scope.row.group_name}}
          </span>
          <div v-show="filterContactGroupListData.curPageData[scope.$index].isEdit">
            <el-input v-model="scope.row.group_name"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="200" align="center" label="人员">
        <template scope="scope">
          <div class="add_input" v-show="filterContactGroupListData.curPageData[scope.$index].isEdit">
            <el-select placeholder="请选择" style="width:100%;" multiple v-model="scope.row.contactIds">
              <el-option v-for="item in contactListData" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </div>
          <div v-show="!filterContactGroupListData.curPageData[scope.$index].isEdit">
            <span v-for="data in filterContacts(scope.row.contactIds)" slot="reference" class="name-wrapper MR">
              <el-tag type="gray">{{ data.name }}</el-tag>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="操作">
        <template scope="scope">
          <div v-show="!filterContactGroupListData.curPageData[scope.$index].isEdit">
            <a class="Edit link" @click="edit(scope)">编辑</a>
            <a class="Delet link" @click="del(scope.row.id)">删除</a>
          </div>
          <div v-show="filterContactGroupListData.curPageData[scope.$index].isEdit">
            <a class="Edit link" @click="save(scope.row.id, scope.row.group_name, scope.row.contactIds, scope.$index)">编辑完成</a>
            <a class="Cancel link" @click="cancel(scope.$index)">取消</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pull-right">
      <el-pagination :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="filterContactGroupListData.totalNum" @current-change="doPageByNum" @size-change="doPageBySize" :current-page="pageIndex">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
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
      pageIndex: 1,
      loading: false
    }
  },
  props: ['active'],
  watch: {
    // openModalState() {
    //     if(!this.openModalState.param){
    //         return
    //     }else if(this.openModalState.param.state) {
    //         this.vm.activeTabName = this.openModalState.param.state;
    //     }else {
    //         this.vm.activeTabName = "testPhoneNum"
    //     }
    // }
    filterContactGroupListData() {
      this.loading = false
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    ...mapGetters(['openModalState', 'subState', 'filterContactGroupListData', 'contactListData', 'contactGroupListData'])
  },
  methods: {
    ...mapActions(['getContactGroupList', 'getContactGroupListByParam', 'deleteContactGroup', 'updateContactsInGroup', 'updateContactGroupName']),
    init() {
      if (!this.filterContactGroupListData.curPageData) return
      this.pagination.pageIndex = 1
      this.pagination.pageSize = 10
      this.pageIndex = 1
      this.filterContactGroupListData.curPageData.forEach((curObj, index) => {
        if (curObj.isEdit) {
          curObj.isEdit = false
          curObj.group_name = curObj.oldGroupName
          curObj.contactIds = curObj.oldContactIds
        }
      })
      this.search()
    },
    search() {
      this.loading = true
      this.getContactGroupListByParam(this.pagination)
    },
    doPageByNum(val) {
      this.pagination.pageIndex = val
      this.search()
    },
    doPageBySize(val) {
      this.pagination.pageSize = val
      this.search()
    },
    edit(scope) {
      var curObj = this.filterContactGroupListData.curPageData[scope.$index]
      this.$set(curObj, 'isEdit', true)
      curObj.oldGroupName = curObj.group_name
      curObj.oldContactIds = [].concat(curObj.contactIds)
    },
    save(id, name, contactIds, index) {
      var that = this
      if (!name) {
        utils.showErrorMsg(this, '名称不能为空')
        return
      }
      // 如果分组名未修改 只对联系人修改进行存储
      var noModify = this.contactGroupListData.filter(o => {
        return o.oldGroupName == name && o.id === id
      }).length === 1
      // 未修改分组名
      if (noModify) {
        this.updateContactsInGroup([id, {
          contact_ids: contactIds
        }]).then(o => {
          //获取测试组信息
          that.getContactGroupList(that.pagination).then(o => {
            utils.showSuccessMsg(this, '修改成功')
          })
        })
        // 退出编辑状态
        that.filterContactGroupListData.curPageData[index].isEdit = false
        return
      }
      // 已修改分组名，但与其它分组名相同，返回false
      var notExist = this.contactGroupListData.every(o => {
        return o.group_name !== name || o.id === id
      })
      // 与其它分组名相同 给出提示消息
      if (!notExist) {
        utils.showErrorMsg(this, '该名称已存在')
        return
      }
      this.updateContactGroupName([id, {
        group_name: name
      }]).then(o => {
        that.updateContactsInGroup([id, {
          contact_ids: contactIds
        }]).then(o => {
          utils.showSuccessMsg(this, '修改成功')
          // 退出编辑状态
          that.filterContactGroupListData.curPageData[index].isEdit = false
        })

      })

    },
    del(id) {
      var that = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteContactGroup(id).then(o => {
          utils.showSuccessMsg(that, '删除成功')
          that.getContactGroupList(that.pagination)
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
      var curObj = this.filterContactGroupListData.curPageData[index]
      curObj.isEdit = false
      curObj.group_name = curObj.oldGroupName
      curObj.contactIds = curObj.oldContactIds
    },
    filterContacts(selContacts) {
      return this.contactListData.filter(o => {
        var ret = selContacts.every(id => {
          return o.id !== id
        })
        return !ret
      })
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

.MR {
  margin-right: 5px;
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
</style>

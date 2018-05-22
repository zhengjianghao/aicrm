<template>
  <table-list
    ref="tableList"
    :hidPage='true'
    :configClass='true'
    listTableClass='market_tablelist'
    :hiddenToolBox='true'
    @getBaseList="searchRemote"
    @getFilterList="getFilterList"
    :filterListData="filterData">
    <template slot="tableDataNoPage" scope="props">
      <div id="double11StepDiv" class="nice_scroll double11StepDiv">
        <el-table :data="props.data" :highlight-current-row="true" :show-header="false" ref='stairTable'>
          <el-table-column min-width="110px" align='center' label="阶梯">
            <template scope="scope">
              <div class="stair">第{{scope.$index + 1}}阶梯</div>
            </template>
          </el-table-column>
          <el-table-column min-width="825px" label="设置">
            <template scope="scope">
              <el-row>
                <el-col :span='12' class="stairContent">
                  目标会员：
                  <target-multiselect ref='multiselect' :checkList="scope.row.target_member" :isindex='scope.$index' :allDate='props.data'></target-multiselect>
                </el-col>
                <el-col :span='12' class="stairContent">
                  客单价限制：
                  <kdj-multiselect :checkList="scope.row.guest_limit" :isindex='scope.$index' :allDate='props.data'>
                  </kdj-multiselect>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span='12' class="stairContent">
                  买家最近一次购物时间限制：
                  <el-select v-model="scope.row.last_buy" style="width: 100px;">
                    <el-option v-for="item in lastBuyList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span='12' class="stairContent">
                  发送时间跨度：
                  <!--<el-tooltip class="item" effect="dark" :manual="true" :value='stairDateId.indexOf(scope.$index) >=0 ' :content="stairDateContent.length >0 ? stairDateId.indexOf(scope.$index) >=0 ? stairDateContent[stairDateId.indexOf(scope.$index)] : '' : ''" placement="top">-->
                  <el-date-picker style="width: 300px;" v-model="scope.row.send_time" :clearable="false" type="daterange" placeholder="选择时间范围" align="right">
                  </el-date-picker>
                  <!--</el-tooltip>-->
                </el-col>
              </el-row>
              <el-row>
                <el-col :span='12' class="stairContent">
                  单独指定发送时间：
                  <el-select v-model="scope.row.specifies_send_time" style="width: 100px;">
                    <el-option v-for="item in g_global.SpecSendTime" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span='12' class="stairContent">
                  买家分配方案：
                  <el-select v-model="scope.row.divide_plan" style="width: 140px;">
                    <el-option v-for="item in divideList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span='12' class="stairContent">
                  专享营销语：
                  <!--<el-tooltip class="item" effect="dark" :manual="true" :value='messageId.indexOf(scope.$index) >=0 ' :content="messageContent.length >0 ? messageId.indexOf(scope.$index) >=0 ? messageContent[messageId.indexOf(scope.$index)] : '' : ''" placement="top">-->
                  <el-input v-model="scope.row.marketing_message"></el-input>
                  <!--</el-tooltip>-->
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column min-width="110px" align='center' label="操作">
            <template scope="scope">
              <a @click="removeStair(scope.$index)" class="delet warning">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </table-list>
</template>

<script type='text/ecmascript-6' scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from '../../misc/utils'
import g_global from '../../misc/global.constant'
export default {
  data() {
    return {
      stairs: [],
      filterData: [],
      utils: utils,
      g_global: g_global,
      lastBuyList: [{
        label: '不限制',
        value: ''
      }, {
        label: '最近一年',
        value: 'lastYear'
      }, {
        label: '最近两年',
        value: 'lastTwoYear'
      }, {
        label: '一年之前',
        value: 'oneYearAgo'
      }, {
        label: '两年之前',
        value: 'twoYearAgo'
      }],
      divideList: [{
        label: '【时间先后均分】',
        value: 'timeDivide'
      }, {
        label: '【随机均分】',
        value: 'randomDivide'
      }],
      stairDateId: [],
      stairDateContent: [],
      messageId: [],
      messageContent: []
    }
  },
  mounted() {
    this.stairs = this.stairDate ? this.stairDate : []
    this.showBuyingRycel()
  },
  watch: {
    stairDate() {
      this.stairs = this.stairDate ? this.stairDate : []
      this.showBuyingRycel()
    }
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    addStair() {
      var add = {
        target_member: [],
        guest_limit: ['all'],
        last_buy: '',
        send_time: [],
        divide_plan: 'timeDivide',
        marketing_message: (this.doubleName ? this.doubleName : '双11') + '劲爆来袭',
        specifies_send_time: ''
      }
      this.stairs.push(add)
      this.showBuyingRycel()
      // 滚动到列表底部,放入timer内可兼容其它浏览器（uc等浏览器会出现滚动到底部后再更加一行,不能实现滚动到底部）
      setTimeout(o => {
        document.getElementById('double11StepDiv').scrollTop = document.getElementById('double11StepDiv').scrollHeight
      })
    },
    removeStair(index) {
      this.$confirm('确定删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.stairs.splice(index, 1)
        this.deletVeriflaction(index)
        this.showBuyingRycel()
        this.$message({
          type: 'info',
          customClass: 'message_position',
          message: '已成功删除'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          customClass: 'message_position',
          message: '已取消删除'
        })
      })
    },
    updateValue() {
      this.updataBaseMConfig({
        stairs: this.stairs,
      })
    },
    //验证问候语
    checkMessage(value, id) {
      var that = this
      if (value.length == 0 || value.length > 100) {
        if (that.messageId.indexOf(id) < 0) {
          that.messageId.push(id)
          that.messageContent.push('营销语长度在1到100个字')
        } else {
          that.messageContent[that.messageId.indexOf(id)] = '营销语长度在1到100个字'
        }
      } else {
        if (that.messageId.indexOf(id) >= 0) {
          that.messageContent.splice(that.messageId.indexOf(id), 1)
          that.messageId.splice(that.messageId.indexOf(id), 1)
        }
      }
    },
    checkTargetMember(value) {
      return value.length > 0
    },
    //删除时同时删除错误验证
    deletVeriflaction(id) {
      var that = this
      that.messageContent.splice(that.messageId.indexOf(id), 1)
      that.messageId.splice(that.messageId.indexOf(id), 1)
      that.stairDateContent.splice(that.stairDateId.indexOf(id), 1)
      that.stairDateId.splice(that.stairDateId.indexOf(id), 1)
    },
    //验证时间
    checkDate(value, id) {
      var that = this
      if (!value || value.length == 0 || !value[0]) {
        if (that.stairDateId.indexOf(id) < 0) {
          that.stairDateId.push(id)
          that.stairDateContent.push('不能为空')
        } else {
          that.stairDateContent[that.stairDateId.indexOf(id)] = '不能为空'
        }
      } else {
        if (that.stairDateId.indexOf(id) >= 0) {
          that.stairDateContent.splice(that.stairDateId.indexOf(id), 1)
          that.stairDateId.splice(that.stairDateId.indexOf(id), 1)
        }
      }
    },
    checkStairAll() {
      var _temp = []
      var that = this
      for (var i in this.stairs) {
        that.checkDate(that.stairs[i].send_time, parseInt(i) + 1)
        that.checkMessage(that.stairs[i].marketing_message, parseInt(i) + 1)
        var isTrue = that.checkTargetMember(that.stairs[i].target_member)
        if (!isTrue) {
          _temp.push(parseInt(i) + 1)
        }
      }
      if (_temp.length > 0) {
        this.utils.showErrorMsg(this, '请选择第' + _temp + '级阶梯会员分组')
        return false
      }
      if (this.stairDateId.length > 0) {
        this.utils.showErrorMsg(this, '请选择第' + this.stairDateId + '级阶梯的时间跨度')
        return false
      }
      if (this.messageId.length > 0) {
        this.utils.showErrorMsg(this, '第' + this.messageId + '级阶梯的营销语长度在1到100个字')
        return false
      }
      return this.stairDateId.length == 0 && this.messageId.length == 0 && _temp.length == 0
    },
    // 处理本地数据 快消品周期宝贝本地分页
    getFilterList(pagination) {
      this.filterData = this.stairs
    },
    // 子组件回调函数，用于分页
    searchRemote([pagination, sortBy]) {
      this.filterData = this.stairs
    },
    // 展现数据
    showBuyingRycel() {
      // 调用组件分页方法
      this.$refs['tableList'].init()
    }
  },
  props: [
    'stairDate',
    'doubleName'
  ]
}
</script>

<style lang="scss" scoped>
.double11StepDiv {
  max-height: 400px;
  overflow: auto;
}

.stairs {
  padding: 15px 0;
}

.stairs:not(:last-child) {
  border-bottom: 1px solid #ccc;
}

.stair {
  text-align: center;
  font-size: 12px;
  height: 40px;
  line-height: 40px;
}

.stairContent {
  font-size: 12px;
  height: 40px;
  line-height: 40px;
}

.el-input {
  width: 80%;
}

.delet {
  font-size: 12px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
}
</style>

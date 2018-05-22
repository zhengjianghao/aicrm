<template>
  <table-list
    ref="tableList"
    :hidPage='true'
    listTableClass='market_tablelist'
    :configClass='true'
    :hiddenToolBox='true'
    @getBaseList="searchRemote"
    @getFilterList="getFilterList"
    :filterListData="filterData">
    <template slot="tableDataNoPage" scope="props">
      <div id="double11StepDiv" class="nice_scroll double11StepDiv">
        <el-table stripe :highlight-current-row="true" :data="props.data" :show-header="false">
          <el-table-column
            min-width="110px"
            align='center'
            label="阶梯">
            <template scope="scope">
              <div class="stair">第{{scope.$index + 1}}类</div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="825px"
            label="设置">
            <template scope="scope">
              <el-row>
                <el-col :span='12' class="stairContent">
                  目标会员：
                  <target-multiselect
                  :checkList="scope.row.target_member"
                  :isindex='scope.$index'
                  :allDate='props.data'
                  ></target-multiselect>
                </el-col>
                <el-col :span='12' class="stairContent">
                  买家最近一次购物时间限制：
                  <el-select v-model="scope.row.last_buy" style="width: 100px;">
                  <el-option
                      v-for="item in lastBuyList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                  </el-select>
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
                <el-col :span='12'>
                  <el-checkbox v-model="scope.row.no_shopping">截止到现在还没有购物过的买家</el-checkbox>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            min-width="110px"
            align='center'
            label="操作"
          >
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
import {mapGetters, mapActions} from 'vuex'
import utils from '../../misc/utils'
import g_global from '../../misc/global.constant'
export default {
  data () {
    return {
      stairs: [],
      utils: utils,
      filterData: [],
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
    }
  },
  mounted() {
    // this.showBuyingRycel()
  },
  watch: {
    stairDate () {
      this.stairs = this.stairDate ? this.stairDate : []
      this.showBuyingRycel()
    },
    // stairs() {
    //   this.updateValue()
    // }
  },
  methods: {
    ...mapActions([
        'updataBaseMConfig'
      ]),
    addStair () {
      var add = {
        target_member: [],
        last_buy: '',
        no_shopping: true,
        specifies_send_time: ''
      }
      this.stairs.push(add)
      this.showBuyingRycel()
      // 滚动到列表底部,放入timer内可兼容其它浏览器（uc等浏览器会出现滚动到底部后再更加一行,不能实现滚动到底部）
      setTimeout(o => {
        document.getElementById('double11StepDiv').scrollTop = document.getElementById('double11StepDiv').scrollHeight
      })
    },
    removeStair (index) {
      this.$confirm('确定删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.stairs.splice(index,1)
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
    checkTargetMember(value) {
      return value.length > 0
    },
    checkStairAll() {
      var _temp = []
      var that = this
      for(var i in this.stairs) {
        var isTrue = that.checkTargetMember(that.stairs[i].target_member)
        if(!isTrue) {
          _temp.push(parseInt(i) + 1)
        }
      }
      if(_temp.length > 0 ) {
        this.utils.showErrorMsg(this, '请选择第'+_temp+'级阶梯会员分组')
      }
      return _temp.length == 0
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
    'stairDate'
  ]
}
</script>

<style lang="scss" scoped>
.double11StepDiv {
  max-height: 400px;
  overflow: auto;
}
.stairs{
  padding: 15px 0;
}
.stairs:not(:last-child){
  border-bottom: 1px solid #ccc;
}
.stair{
  text-align: center;
  font-size: 12px;
  height: 40px;
  line-height: 40px;
}
.stairContent{
  font-size: 12px;
  height: 40px;
  line-height: 40px;
}
.el-input{
  width: 80%;
}
.delet{
  font-size: 12px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
}
</style>

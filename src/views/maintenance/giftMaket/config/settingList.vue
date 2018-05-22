<template>
  <table-list
    ref="tableList"
    @checkAll='checkAll'
    :hidPage='true'
    :hiddenToolBox='true'
    :showConfBox='true'
    listTableClass='market_tablelist'
    :configClass='true'
    @getBaseList="searchRemote"
    @getFilterList="getFilterList"
    :filterListData="filterData">
    <template slot="toolboxLeft" scope="props">
      <h3 style="color:#5D6D7D;">购买行为匹配</h3>
      <span style="line-height: 30px">购买行为并非购买订单数，系统会自动合并相近的订单为一次购买</span>
    </template>
    <template slot="toolboxRight" scope="props">
      <div style="padding: 15px 10px 0px 0px;">
        当前已有
        <span class="num">{{props.data.length ? props.data.length : 0}}</span> 级优惠配置
        <el-button style="background-color: #0bb8f8;background-image: linear-gradient(45deg, #0bb8f8 25%, #2AF598 100%);" type="primary" @click='add'>添加一级优惠</el-button>
      </div>
    </template>
    <template slot="tableDataNoPage" scope="props">
      <el-table
          :data="props.data"
          max-height='775'>
          <el-table-column
          width="100px"
          prop="level"
          align='center'
          label="">.
            <template scope="scope">
              第{{scope.$index + 1}}级
            </template>
          </el-table-column>
          <el-table-column
          min-width="120"
          prop="buys"
          label="购买行为">
            <template scope="scope">
                第
                <el-tooltip
                class="item"
                effect="dark"
                :manual="true"
                :value='buysId.indexOf(scope.$index) >=0 '
                :content="buysContent.length >0 ? buysId.indexOf(scope.$index) >=0 ? buysContent[buysId.indexOf(scope.$index)] : '' : ''"
                placement="top">
                  <el-input v-model="scope.row.buys" @change='checkBuys(scope.row.buys, scope.$index)' style="width: 100px;"></el-input>
                </el-tooltip>
                <!--<el-select v-model="scope.row.buys">
                  <el-option
                    v-for="item in buy_times"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>-->
                次购买
            </template>
          </el-table-column>
          <el-table-column
          prop="giftSet"
          min-width="200px"
          label="赠品设置">
              <template scope="scope">
                <div style="display: inline-block">自动添加备注信息：
                  <el-tooltip
                  class="item"
                  effect="dark"
                  :manual="true"
                  :value='messageId.indexOf(scope.$index) >=0 '
                  :content="messageContent.length >0 ? messageId.indexOf(scope.$index) >=0 ? messageContent[messageId.indexOf(scope.$index)] : '' : ''"
                  placement="top">
                    <el-input v-model="scope.row.add_message" @change='checkMessage(scope.row.add_message, scope.$index)'></el-input>
                  </el-tooltip>
                  <el-tooltip content='用于送赠品、升级快递等，添加标记信息不能超过20字' popper-class='tool_notes' placement="top-start" effect="dark">
                    <i class="iconfont icon-help1 toolGanTanHao"></i>
                  </el-tooltip>
                  </div>
                <div style="line-height:30px">
                  <el-checkbox v-model="scope.row.is_edit_flags">修改备注旗子</el-checkbox>
                  <el-radio-group v-model="scope.row.flags">
                    <el-radio :disabled="!scope.row.is_edit_flags" v-for="flag in flags" :label="flag.value" :key="flag.value"><span class="iconfont icon-qishi" :style="flag.style"></span></el-radio>
                  </el-radio-group>
                </div>
                  <!--<config-flags
                    :isEditFlags='scope.row.is_edit_flags'
                    :checkedFlags="scope.row.flags"
                    :discountSet='props.data'
                    :indexId='scope.$index'
                    :gift="true">
                  </config-flags>-->

              </template>
          </el-table-column>
          <el-table-column
          min-width="90px"
          label="操作">
              <template scope="scope">
                <span class="link_underline"  @click="cancel(scope.$index)"><a class="Delet link">删除</a></span>
              </template>
          </el-table-column>
      </el-table>
    </template>
  </table-list>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../../../misc/global.constant'
export default {
  data() {
    return {
      // 存储完整的要设置快消品周期的宝贝
      discount_set: [],
      filterData: [],
      messageContent: [],
      messageId: [],
      buysId: [],
      buysContent: []
    }
  },
  watch: {
    // 父级组件传来的数据变化时执行
    settingListData() {
      this.discount_set = this.settingListData
      // 展现列表
      this.showBuyingRycel()
    },
  },
  computed: {
    ...mapGetters([
      'selectGoodsData',
      'goodsData'
    ]),
    flags() {
      return globalConstant.flags.map((o) => {
        o.style = { color: o.color }
        return o;
      })
    }
  },
  methods: {
    ...mapActions([
      'updateOpenModal',
      'updateSelectGoods',
      'updataBaseMConfig',
      'getGoods'
    ]),
    add() {
      var add = {
        buys: '',
        add_message: '',
        is_edit_flags: false,
        flags: 0
      }
      this.discount_set.push(add)
      this.showBuyingRycel()
    },
    cancel(id) {
      var that = this
      this.$confirm('确定删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.discount_set.splice(id,1)
        //删除后将相应的验证删除
        that.buysContent = []
        that.buysId = []
        that.messageId = []
        that.messageContent = []
        // if(that.buysId.indexOf(id)>=0) {
        //   that.buysContent.splice(that.buysId.indexOf(id),1)
        //   that.buysId.splice(that.buysId.indexOf(id),1)
        // }
        // if(that.messageId.indexOf(id)>=0) {
        //   that.messageContent.splice(that.messageId.indexOf(id),1)
        //   that.messageId.splice(that.messageId.indexOf(id),1)
        // }
        // 展现列表
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
    checkBuys(value, id) {
      var reg =  /^\+?[1-9]\d*$/g;
      var that=this;
      if(value=='') {
        if(that.buysId.indexOf(id)<0){
          that.buysId.push(id)
          that.buysContent.push('请输入大于0的 整数')
        }else{
          that.buysContent[that.buysId.indexOf(id)]='请输入大于0的 整数'
        }

      }else if(!reg.test(value)){
        if(that.buysId.indexOf(id)<0){
          that.buysId.push(id)
          that.buysContent.push('请输入大于0的 整数')
        }else {
          that.buysContent[that.buysId.indexOf(id)]='请输入大于0的 整数'
        }

      }else{
        if(that.buysId.indexOf(id)>=0) {
          that.buysContent.splice(that.buysId.indexOf(id),1)
          that.buysId.splice(that.buysId.indexOf(id),1)
        }
        // that.updateValue()
      }
    },
    checkMessage(value, id) {
      var that = this
      if(value.length == 0 || value.length > 100) {
        if(that.messageId.indexOf(id)<0){
          that.messageId.push(id)
          that.messageContent.push('备注信息长度在1到100个字')
        }else{
          that.messageContent[that.messageId.indexOf(id)]='备注信息长度在1到100个字'
        }
      }else{
          if(that.messageId.indexOf(id)>=0) {
            that.messageContent.splice(that.messageId.indexOf(id),1)
            that.messageId.splice(that.messageId.indexOf(id),1)
          }
          // that.updateValue()
        }
    },
    checkAll() {
      // if(this.discount_set.length == 0) {
      //   return '请设置优惠等级'
      // }
      for(var i in this.discount_set) {
        this.checkBuys(this.discount_set[i].buys, parseInt(i))
        this.checkMessage(this.discount_set[i].add_message, parseInt(i))
      }
      return this.buysId.length == 0 && this.messageId.length == 0
    },
    // updateValue() {
    //   var _data = this.buyingCycelGoods.map(o => {
    //     return {
    //       num_iid: o.num_iid,
    //       buying_cycel_days: o.buying_cycel_days
    //     }
    //   })
    //   this.buyingCycelGoodsCur = _data
    //   // 更新营销配置基本量
    //   this.updataBaseMConfig({
    //     buying_cycel_items: _data
    //   })
    // },


    // 处理本地数据 快消品周期宝贝本地分页
    getFilterList([pagination]) {
      // this.filterData = pagination.doPage(this.discount_set)
      this.filterData = this.discount_set
    },

    // 子组件回调函数，用于分页
    searchRemote([pagination, sortBy]) {
      // this.filterData = pagination.doPage(this.discount_set)
      this.filterData = this.discount_set
    },
    // 展现数据
    showBuyingRycel() {
      // 调用组件分页方法
      this.$refs['tableList'].init()
    },
  },
  props: [
    'sortBy',
    'settingListData'
  ],
}
</script>
<style lang="scss" scoped>
@import '../../../../style/variable.scss';
$commonColor: #365964;
$commonColor_low: #AAAAAA;
.el-table {
  a {
    text-decoration: underline;
  }
}

.el-table::after {
  width: 0px;
}

.Delet {
  color: $warning;
}

.introduce {
  .sub_title {
    font-size: $titleFontSize;
    color: $commonColor;
    text-decoration: underline;
  }
  .des {
    color: $commonColor_low;
    line-height: 16px;
  }
  width: 288px;
}
</style>

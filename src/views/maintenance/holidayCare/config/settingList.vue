<template>
  <table-list
    ref="tableList"
    @checkHolidayAll='checkHolidayAll'
    @getBaseList="searchRemote"
    @getFilterList="getFilterList"
    :hiddenToolBox='true'
    :showConfBox='true'
    listTableClass='market_tablelist'
    :configClass='true'
    :filterListData="filterData">
    <template slot="toolboxLeft" scope="props">
      <h3 style="color:#5D6D7D;">节假日设置</h3>
      <el-radio v-model="holiday_setting" label="">
        <AI></AI> 智慧管理</el-radio>
      <el-radio v-model="holiday_setting" label="custom">自定义节假日</el-radio>
    </template>
    <template slot="toolboxRight" scope="props">
      <div style="padding: 25px 10px 0px 0px;">
        已设置
        <span class="num">{{props.data.totalNum ? props.data.totalNum : 0}}</span> 个节假日问候
        <el-button style="background-color: #0bb8f8;background-image: linear-gradient(45deg, #0bb8f8 25%, #2AF598 100%);" v-show="canEdit" type="primary" @click="add">添加节假日</el-button>
      </div>
    </template>
    <template slot="tableData" scope="props">
      <!-- AI管理 -->
      <el-table v-if="holiday_setting === ''" :data="props.data" max-height="775" border>
        <el-table-column min-width="60px" align="left" prop="festivalName" label="节日名称">
          <template scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column min-width="110px" prop="festivalDate" align="left" label="节气日期">
          <template scope="scope">
            {{ g_const.calendar.filter(o => { return o.value === scope.row.calendar})[0].name }} {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column prop="applyArea" align="left" min-width="200" label="适用地区">
          <template scope='scope'>
            <select-city-code :selCity="scope.row.area" @sycnCity="sycnCity" :oneRow="true" :id="scope.row.id" :canEdit="canEdit">
            </select-city-code>
          </template>
        </el-table-column>
        <el-table-column align="left" min-width="80px" label="发送时间">
          <template scope="scope">
            {{ g_const.holidaySendTime.filter(o => { return o.value === scope.row.sendtime})[0].name }}
          </template>
        </el-table-column>
        <el-table-column prop="greetings" align="left" min-width="110px" label="问候语">
          <template scope="scope">
            {{scope.row.message}}
          </template>
        </el-table-column>
      </el-table>

      <!-- 自定义 -->
      <el-table v-if="holiday_setting === 'custom'" :data="props.data" max-height="775" border>
        <el-table-column min-width="60px" align="left" prop="festivalName" label="节日名称">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :manual="true" :value='holidayNameId.indexOf(scope.row.id) >=0 ' :content="holidayNameC.length >0 ? holidayNameId.indexOf(scope.row.id) >=0 ? holidayNameC[holidayNameId.indexOf(scope.row.id)] : '' : ''" placement="top">
              <el-input style="width: 100%;" @blur="checkHolidayName(scope.row.name, scope.row.id)" v-model="scope.row.name"></el-input>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column min-width="110px" prop="festivalDate" align="left" label="节气日期">
          <template scope="scope">
            <el-select class="input-custom" style="width: 40%; display: inline-block; margin-left: 5px" @visible-change="calendarChange(scope.row, $event)" v-model="scope.row.calendar">
              <el-option v-for="item in g_const.calendar" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker :clearable='false' class="input-custom" style="width: 55%; display: inline-block" v-model="scope.row.date" :editable="false" @change="updateValue" type="date" placeholder="选择日期">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="applyArea" align="left" min-width="200" label="适用地区">
          <template scope='scope'>
            <select-city-code :selCity="scope.row.area" @sycnCity="sycnCity" :oneRow="true" :id="scope.row.id" :canEdit="canEdit">
            </select-city-code>
          </template>
        </el-table-column>
        <el-table-column align="left" min-width="80px" label="发送时间">
          <template scope="scope">
            <el-select class="input-custom" style="width: 100%" @change="updateValue" v-model="scope.row.sendtime">
              <el-option v-for="item in g_const.holidaySendTime" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="greetings" align="left" min-width="110px" label="问候语">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" :manual="true" :value='holidayMessageId.indexOf(scope.row.id) >=0 ' :content="holidayMessageC.length >0 ? holidayMessageId.indexOf(scope.row.id) >=0 ? holidayMessageC[holidayMessageId.indexOf(scope.row.id)] : '' : ''" placement="top">
              <el-input style="width: 100%;" @blur="checkHolidayMessage(scope.row.message, scope.row.id)" v-model="scope.row.message"></el-input>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column min-width="60px" align="left" label="操作">
          <template scope="scope">
            <span class="pull-left">
              <el-switch @change="updateSwitch(scope.row)" v-model="scope.row._switch" on-text="开" off-text="关">
              </el-switch>
            </span>
            <span class="pull-right">
              <a @click="del(scope.row.id)" v-if="props.totalNum !== 1" class="Delet link link_underline">删除</a>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </table-list>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import globalConstant from '../../../../misc/global.constant'
import utils from '../../../../misc/utils'
export default {
  data() {
    return {
      // 存储完整的要设置快消品周期的宝贝
      listData: [],
      filterData: [],
      listDataCustom: [],
      holiday_setting: 'test',
      g_const: globalConstant,
      timer_max: '',
      isDoPag: false,
      holidayNameC: [],
      holidayNameId: [],
      holidayMessageC: [],
      holidayMessageId: []
    }
  },
  mounted() {
    this.holiday_setting = this.holidaySetting
  },
  watch: {
    // 获取父组件传入的值
    holidaySetting() {
      this.holiday_setting = this.holidaySetting
    },
    // 切换ai / custom后重新加载节假日数据
    holiday_setting() {
      this.reload()
    },
    // 父组件传入的数自定义数据改变，则执行该函数
    settingListCustomData() {
      this.reload()
    }
  },
  computed: {
    ...mapGetters([
    ]),
    canEdit() {
      return this.holiday_setting === 'custom'
    }
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    reload() {
      // 重新加载数据
      this.setHolidayData()
      // 将修改的数据同步的vuex
      this.updateValue()
      // 展现列表
      this.show()
    },
    // 公历农历转换
    calendarChange(row, e) {
      utils.calendarSwitch(row, e, this.updateValue)
    },
    // 更新地区
    sycnCity(obj, id) {
      this.listData.map(o => {
        if (o.id === id) {
          o.area = obj.bindCity
        }
        return o
      })
      this.updateValue()
    },
    // 营销任务开关
    updateSwitch(row) {
      row.isswitch = row._switch ? 1 : 0
      this.updateValue()
    },
    // 同步更新vuex对应的数据
    updateValue() {
      // 更新营销配置基本
      this.updataBaseMConfig({
        holiday_set: this.holiday_setting,
        holiday_data_ai: this.holiday_setting === 'custom' ? this.settingListAiData : this.listData,
        holiday_data_custom: this.holiday_setting === 'custom' ? this.listData : this.listDataCustom,
      })
    },
    // 切换ai or custom时
    setHolidayData() {
      // custom
      if (this.holiday_setting === 'custom') {
        this.listData = this.processListData(this.settingListCustomData)
        this.listDataCustom = this.processListData(this.settingListCustomData)
      } else { // ai
        this.listData = this.processListData(this.settingListAiData)
      }
    },
    // 加工数据
    processListData(data) {
      if (!data) return []
      // 排序 和 copy 数组
      var _data = JSON.parse(JSON.stringify(data))
      _data = _data.sort((a, b) => {
        return b.id - a.id
      })
      _data = _data.map(o => {
        o._switch = Boolean(o.isswitch)
        // 将旧数据中地区字段类型{}改成[]
        o.area = (o.area instanceof Array) === true ? o.area : []
        return o
      })
      return _data
    },
    // 本地分页
    getFilterList([pagination]) {
      this.isDoPag = true
      this.filterData = pagination.doPage(this.listData)
    },
    // 删除
    del(id) {
      var that = this
      this.$confirm('确定删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listData = this.listData.filter(o => {
          return o.id != id
        })
        if (that.holidayNameId.indexOf(id) >= 0) {
          that.holidayNameC.splice(that.holidayNameId.indexOf(id), 1)
          that.holidayNameId.splice(that.holidayNameId.indexOf(id), 1)
        }
        if (that.holidayMessageId.indexOf(id) >= 0) {
          that.holidayMessageC.splice(that.holidayMessageId.indexOf(id), 1)
          that.holidayMessageId.splice(that.holidayMessageId.indexOf(id), 1)
        }
        // 展现列表
        this.show()
      }).catch(() => {
        this.$message({
          type: 'info',
          customClass: 'message_position',
          message: '已取消删除'
        })
      })
    },
    // 子组件回调函数，用于分页
    searchRemote([pagination, sortBy]) {
      this.filterData = pagination.doPage(this.listData)
    },
    // 展现快消品周期宝贝数据
    show() {
      // 调用组件分页方法
      this.$refs['tableList'].init()
    },
    // 新增家假日问候
    add() {
      var maxId = this.listData[0].id
      var add = {
        id: parseInt(maxId) + 1,
        name: '',
        calendar: 'gregorian',
        date: new Date(),
        area: {},
        sendtime: '0',
        message: '',
        isswitch: 1,
        _switch: true
      }
      this.listData.unshift(add)
      // 展现列表
      this.show()
    },
    checkHolidayName(value, id) {
      var that = this
      if (value.length == 0 || value.length > 10) {
        if (that.holidayNameId.indexOf(id) < 0) {
          that.holidayNameId.push(id)
          that.holidayNameC.push('节气名称长度在1到10个字')
        } else {
          that.holidayNameC[that.holidayNameId.indexOf(id)] = '节气名称长度在1到10个字'
        }
      } else {
        if (that.holidayNameId.indexOf(id) >= 0) {
          that.holidayNameC.splice(that.holidayNameId.indexOf(id), 1)
          that.holidayNameId.splice(that.holidayNameId.indexOf(id), 1)
        }
        that.updateValue()
      }

    },
    checkHolidayMessage(value, id) {
      var that = this
      if (value.length == 0 || value.length > 100) {
        if (that.holidayMessageId.indexOf(id) < 0) {
          that.holidayMessageId.push(id)
          that.holidayMessageC.push('问候语长度在1到100个字')
        } else {
          that.holidayMessageC[that.holidayMessageId.indexOf(id)] = '问候语长度在1到100个字'
        }
      } else {
        if (that.holidayMessageId.indexOf(id) >= 0) {
          that.holidayMessageC.splice(that.holidayMessageId.indexOf(id), 1)
          that.holidayMessageId.splice(that.holidayMessageId.indexOf(id), 1)
        }
        that.updateValue()
      }
    },
    checkHolidayAll() {
      if (this.holiday_setting == '') {
        return true
      }
      if (this.listData.length == 0) {
        return '请设置自定义节假日'
      }
      for (var i in this.listData) {
        this.checkHolidayName(this.listData[i].name, this.listData[i].id)
        this.checkHolidayMessage(this.listData[i].message, this.listData[i].id)
      }
      return this.holidayNameId.length == 0 && this.holidayMessageId.length == 0
    }
  },
  props: [
    'sortBy',
    'settingListAiData',
    'settingListCustomData',
    'holidaySetting' //ai or custom
  ],
}
</script>
<style lang="scss" scoped>
@import '../../../../style/variable.scss';
$commonColor: #365964;
$commonColor_low: #AAAAAA;
.el-table {
  border-left: hidden;
  border-right: hidden;
  img {
    width: 52px;
    height: 52px;
    border: solid 1px #cccccc;
    margin-top: 5px;
  }
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

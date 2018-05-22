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
      <h3 style="color:#5D6D7D;">恶劣天气设置</h3>
      <el-radio v-model="bad_weather_set" label="">
        <AI></AI> 智慧管理</el-radio>
      <el-radio v-model="bad_weather_set" label="custom">自定义设置</el-radio>
    </template>
    <template slot="toolboxRight" scope="props">
      <div style="padding: 25px 10px 0px 0px;">
        已设置
        <span class="num">{{props.data.totalNum ? props.data.totalNum : 0}}</span> 个恶劣天气
        <el-button style="background-color: #0bb8f8;background-image: linear-gradient(45deg, #0bb8f8 25%, #2AF598 100%);" v-show="canEdit" type="primary" @click="add">添加恶劣天气</el-button>
      </div>
    </template>
    <template slot="tableData" scope="props">
      <!-- AI管理 -->
      <el-table v-if="bad_weather_set === ''" :data="props.data" :row-key="setRowKey" max-height="775" border>
        <el-table-column width="110" align="left" label="恶劣天气">
          <template scope="scope">
            {{ g_const.weather_type.filter(o => { return o.value === scope.row.name})[0].name }}
          </template>
        </el-table-column>
        <el-table-column width="370" prop="festivalDate" align="left" label="触发级别（严重程度：蓝色<黄色<橙色<红色）">
          <template scope="scope">
            <el-checkbox-group v-model="scope.row.level">
              <el-row type='flex'>
                <el-col v-for="item in scope.row.hasTypes" :key='item.value' :span='24'>
                  <el-checkbox v-show="item.name != ''" disabled :label="item.value" :value="item.value">{{item.name}}</el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column prop="applyArea" align="left" min-width="150" label="适用地区">
          <template scope='scope'>
            <select-city-code :curCityTextArray="scope.row.area_text_array" @sycnCity="sycnCity" :oneRow="true" :id="scope.row.id" :canEdit="canEdit"></select-city-code>
          </template>
        </el-table-column>
        <el-table-column align="left" width="120" label="发送时间">
          <template scope="scope">
            {{ g_const.badWeatherSendTime.filter(o => { return o.value === scope.row.sendtime})[0].name }}
          </template>
        </el-table-column>
        <el-table-column prop="greetings" align="left" min-width="110px" label="关怀语">
          <template scope="scope">
            气象台标准用语
          </template>
        </el-table-column>
      </el-table>

      <!-- 自定义 -->
      <el-table v-else-if="bad_weather_set === 'custom'" :data="props.data" :row-key="setRowKey" max-height="775" border>
        <el-table-column width="110" align="left" label="恶劣天气">
          <template scope="scope">
            <el-select class="input-custom" style=" display: inline-block; margin-left: 5px" @visible-change='changeHasTypes(scope, scope.row, props.data, $event)' v-model="scope.row.name">
              <el-option v-if="scope.row.isRendSelect" v-for="item in g_const.weather_type" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="370" prop="festivalDate" align="left" label="触发级别（严重程度：蓝色<黄色<橙色<红色）">
          <template scope="scope">
            <el-checkbox-group v-model="scope.row.level">
              <el-row type='flex'>
                <el-col v-for="item in scope.row.hasTypes" :key='item.value' :span='24'>
                  <el-checkbox v-show="item.name != ''" :label="item.value" :value="item.value">{{item.name}}</el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column prop="applyArea" align="left" min-width="150" label="适用地区">
          <template scope='scope'>
            <select-city-code :curCityTextArray="scope.row.area_text_array" @sycnCity="sycnCity" :oneRow="true" :id="scope.row.id" :canEdit="canEdit"></select-city-code>
          </template>
        </el-table-column>
        <el-table-column align="left" width="120" label="发送时间">
          <template scope="scope">
            <el-select class="input-custom" style="width: 100%" @change="updateValue" v-model="scope.row.sendtime">
              <el-option v-for="item in g_const.badWeatherSendTime" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="greetings" align="left" min-width="110px" label="关怀语">
          <template scope="scope">
            <el-row>
              <el-radio-group style="width：100%" v-model="scope.row.is_ai_message" @change='checkHolidayMessage(scope.row.message, scope.row.id, scope.row.is_ai_message)'>
                <el-col>
                  <el-radio label='ai'>气象台标准用语</el-radio>
                </el-col>
                <el-col>
                  <el-radio style="width: 100%" label='custom'>
                    <el-tooltip class="item" effect="dark" :manual="true" :value='holidayMessageId.indexOf(scope.row.id) >=0 ' :content="holidayMessageC.length >0 ? holidayMessageId.indexOf(scope.row.id) >=0 ? holidayMessageC[holidayMessageId.indexOf(scope.row.id)] : '' : ''" placement="top">
                      <el-input :disabled="scope.row.is_ai_message == 'ai'" placeholder='自定义关怀语' style="width: 90%" @blur="checkHolidayMessage(scope.row.message, scope.row.id, scope.row.is_ai_message)" v-model="scope.row.message"></el-input>
                    </el-tooltip>
                  </el-radio>
                </el-col>
              </el-radio-group>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column width="100" align="left" label="操作">
          <template scope="scope">
            <div class="text-center">
              <el-switch @change="updateSwitch(scope.row)" v-model="scope.row._switch" on-text="开" off-text="关">
              </el-switch>
            </div>
            </br>
            <div class="text-center">
              <a @click="del(scope.row.id)" v-if="props.totalNum !== 1" class="Delet link link_underline">删除</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </table-list>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../../../misc/global.constant'
import utils from '../../../../misc/utils'
import moment from 'moment'
export default {
  data() {
    return {
      // 存储完整的要设置快消品周期的宝贝
      listData: [],
      filterData: [],
      listDataCustom: [],
      bad_weather_set: undefined,
      g_const: globalConstant,
      timer_max: '',
      isDoPag: false,
      holidayMessageC: [],
      holidayMessageId: [],
      weather_level: {
        blue: '蓝色预警',
        yellow: '黄色预警',
        origin: '橙色预警',
        red: '红色预警'
      },
    }
  },
  mounted() {
    this.bad_weather_set = this.badWeatherSetting
  },
  watch: {
    // 父组件传入的ai/自定义 选项改变则执行该函数
    badWeatherSetting(val) {
      if (val === undefined) return
      this.bad_weather_set = this.badWeatherSetting
    },
    // 父组件传入的数自定义数据改变，则执行该函数
    settingListCustomData(val) {
      if (!val) return
      this.reload()
    },
    // 切换ai / custom后重新加载节假日数据
    bad_weather_set(val, oldVal) {
      if (val === undefined || (!this.settingListCustomData && val === 'custom')) return
      this.reload()
    }
  },
  computed: {
    ...mapGetters([
    ]),
    canEdit() {
      return this.bad_weather_set === 'custom'
    }
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    setRowKey(row) {
      return row.id
    },
    // 重载
    reload() {
      // 重新加载数据
      this.setHolidayData()
      // 展现列表
      this.show()
      // 将修改的数据同步的vuex
      this.updateValue()
    },
    //获得types
    changeHasTypes(scope, row, data, e) {
      if (e == true) {
        row.oldName = row.name
        this.$set(row, 'isRendSelect', true)
      } else if (e == false) {
        if (row.oldName != row.name) {
          var _types = data[scope.$index]
          var weatherList = this.g_const.bad_weather_list
          for (var i in weatherList) {
            if (weatherList[i].name == row.name) {
              _types.hasTypes = weatherList[i].hasTypes
              _types.level = []
            }
          }
        }
      }
    },
    // 更新地区
    sycnCity(obj, id) {
      this.listData.map(o => {
        if (o.id === id) {
          o.area_text_array = obj.bindCityTextArray
          if(!o.area_text_array || o.area_text_array.length === 0) {
            o.area = []
          } else {
            o.area = obj.bindCity
          }
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
        bad_weather_set: this.bad_weather_set,
        bad_weather_ai: this.bad_weather_set === 'custom' ? this.settingListAiData : this.listData,
        bad_weather_custom: this.bad_weather_set === 'custom' ? this.listData : this.listDataCustom,
      })
    },
    // 切换ai or custom时
    setHolidayData() {
      // custom
      if (this.bad_weather_set === 'custom') {
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
        name: '未知',
        level: [],
        area: [],
        sendtime: '0',
        message: '',
        is_ai_message: 'ai',
        isswitch: 0,
        _switch: false,
        hasTypes: [
          {
            name: '蓝色预警',
            value: 'blue'
          }, {
            name: '黄色预警',
            value: 'yellow'
          }, {
            name: '橙色预警',
            value: 'origin'
          }, {
            name: '红色预警',
            value: 'red'
          }
        ]
      }
      this.listData.unshift(add)
      // 展现列表
      this.show()
    },
    checkHolidayMessage(value, id, isAI) {
      var that = this
      if (isAI == 'ai') {
        value = ''
        if (that.holidayMessageId.indexOf(id) >= 0) {
          that.holidayMessageC.splice(that.holidayMessageId.indexOf(id), 1)
          that.holidayMessageId.splice(that.holidayMessageId.indexOf(id), 1)
        }
        // that.updateValue()
      } else if (value.length == 0 || value.length > 100) {
        if (that.holidayMessageId.indexOf(id) < 0) {
          that.holidayMessageId.push(id)
          that.holidayMessageC.push('关怀语在1到100个字')
        } else {
          that.holidayMessageC[that.holidayMessageId.indexOf(id)] = '关怀语在1到100个字'
        }
      } else {
        if (that.holidayMessageId.indexOf(id) >= 0) {
          that.holidayMessageC.splice(that.holidayMessageId.indexOf(id), 1)
          that.holidayMessageId.splice(that.holidayMessageId.indexOf(id), 1)
        }
        // that.updateValue()
      }
    },
    checkHolidayAll() {
      if (this.bad_weather_set == '') {
        return true
      }
      for (var i in this.listData) {
        this.checkHolidayMessage(this.listData[i].message, this.listData[i].id, this.listData[i].is_ai_message)
      }
      return this.holidayMessageId.length == 0
    }
  },
  props: [
    'sortBy',
    'settingListAiData',
    'settingListCustomData',
    'badWeatherSetting' //ai or custom
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

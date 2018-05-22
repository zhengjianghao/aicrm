<template>
  <div>
      <div>
        <div class="user_toolbox">
            <div class="toolbox_control">
                <el-button-group >
                    <el-button size="small" :class="selectedDayCount === '15' ? 'toolbox_active' : 'toolbox_default'" @click="searchByDays('15')">近15天</el-button>
                    <el-button size="small" class="margin_left_tiny" :class="selectedDayCount === '30' ? 'toolbox_active' : 'toolbox_default'" @click="searchByDays('30')">近30天</el-button>
                    <el-button size="small" style="margin-left: 2px;" :class="selectedDayCount === '90' ? 'toolbox_active' : 'toolbox_default'" @click="searchByDays('90')">近90天</el-button>
                </el-button-group>
            </div>
            <div class="toolbox_control">
                <el-date-picker
                type="daterange"
                format="yyyy-MM-dd"
                placeholder="选择下单时间段"
                size="small"
                v-model="dateRange"
                @change="searchDaysRange"
                :editable="false"
                >
                </el-date-picker>
            </div>
        </div>
        <div class="chartWaper" v-show="showRebuyType">
        <div id="marketingRebuy" v-loading="marketingRebuyLoading"  :element-loading-text="processText" class="wrap"></div>
        <div class="img_name_tooltip">
            <el-tooltip placement="top-start" popper-class='tool_notes' effect="dark">
              <div slot="content" class="tool_content" v-html="getTooltipContentF"></div>
              <span>&nbsp;</span>
            </el-tooltip>
        </div>
        <div class='toolBox'>
            <span class='line_ave' @click="showAve('one', drawChartSpecial)">
                <span v-if='!isShowAveOne'>显示均值辅助线</span>
                <span v-else>隐藏均值辅助线</span>
            </span>
            <span class="line_ave" v-if="isEffect">{{selRebuyTypeParam.name}}</span>
        </div>
        <div class="noData" v-show="rebuy_isEmpty">
            <span>暂无数据</span>
        </div>
        </div>
        <div class="chartWaper">
        <div id="marketingTypes" v-loading="marketingTypesLoading"  :element-loading-text="processText" class="wrap"></div>
        <div class="img_name_tooltip" v-if="tooltipContent">
            <el-tooltip placement="top-start" popper-class='tool_notes' effect="dark">
              <div slot="content" class="tool_content" v-html="getTooltipContent"></div>
              <span>&nbsp;</span>
            </el-tooltip>
        </div>
        <div class="toolBox">
            <span class='line_ave' @click="showAve('two', drawChartResult)">
                <span v-if='!isShowAveTwo'>显示均值辅助线</span>
                <span v-else>隐藏均值辅助线</span>
            </span>
            <el-select v-show="!isEffect" popper-class="chartSel" v-model="selUserTypeValue" @change="user_search()" class="w_2" :style="resultSelStyle" placeholder="请选择">
                <el-option
                v-for="obj in marketingTypes"
                :label="obj.value"
                :value="obj.name"
                :key="obj.value"
                >
                </el-option>
            </el-select>
            <span class='line_ave' v-if="isEffect">{{marketingTypes[0].value}}</span>
        </div>
        <div class="noData" v-show="user_isEmpty">
            <span>暂无数据</span>
        </div>
        </div>
        <div class="chartWaper" v-show="!isEffect">
            <div id="marketingContentTypes" v-loading="marketingContentTypesLoading"  :element-loading-text="processText" class="wrap"></div>
            <div class="img_name_tooltip">
                <el-tooltip placement="top-start" popper-class='tool_notes' effect="dark">
                <div slot="content" class="tool_content">当前场景下发送成功短信的数量（营销信息超长的按照实际发送短信条数计算）</div>
                <span>&nbsp;</span>
                </el-tooltip>
            </div>
            <div class="toolBox">
                <span class='line_ave' @click="showAve('three', drawChartPush)">
                    <span v-if='!isShowAveThree'>显示均值辅助线</span>
                    <span v-else>隐藏均值辅助线</span>
                </span>
                <el-select popper-class="chartSel" v-model="selMsgTypeValue" @change="msg_search()" class="w_2" placeholder="请选择">
                <el-option
                    v-for="obj in g_const.marketingContentTypes"
                    :label="obj.value"
                    :value="obj.name"
                    :key="obj.value"
                    >
                </el-option>
                </el-select>
            </div>
            <div class="noData" v-show="msg_isEmpty">
                <span>暂无数据</span>
            </div>
        </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
    import resultDataSerivce from './resultData.service.js'
    import chartHelper from '../../misc/chartHelper'
    import global_const from '../../misc/global.constant'
    import utils from '../../misc/utils'
    import echarts from 'echarts'
    import Immutable from 'immutable'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        data() {
            return {
                chart: {},
                selectedDayCount: '15',
                startDate: '',
                processText: '数据量较大请耐心等待',
                marketingRebuyLoading: false,
                marketingTypesLoading: false,
                marketingContentTypesLoading: false,
                endDate: '',
                dateRange: [],
                selUserTypeValue: '',
                selMsgTypeValue: global_const.marketingContentTypes[0].name,
                selRebuyType: '',
                showRebuyType: false,
                selUserTypeName: {},
                selMsgTypeName: {},
                g_const: global_const,
                isActived: false, // 组件是否被激活
                hasRefresh: false,
                isShowAveOne: false, // 均值輔助線
                isShowAveTwo: false, // 均值輔助線
                isShowAveThree: false, // 均值輔助線
                toolContentF: {
                    paixia: '公式=选定时间段内 每日选定用户群内产生加购的用户数（拍下即算，未付款、退款都不影响）/当前任务选定用户群内的当日付款用户总数（付款即算，退款不影响），（注意：每日都会有会员流转会不固定，只要当日内流转进来的就算上，流转出去的就减去）<br/>每日按照0-24小时自然日计算，时效当日内',
                    fugou: '公式=选定时间段内 每日选定用户群内产生复购的用户数（拍下即算，未付款、退款都不影响）/当前任务选定用户群全部会员数（注意：每日都会有会员流转会不固定，只要当日内流转进来的就算上，流转出去的就减去）；每日按照0-24小时自然日计算，时效当日内',
                }
            }
        },
        // 组件被激活
        activated() {
            this.isActived = true
        },
        // 组件转为非激活状态
        deactivated() {
            this.isActived = false
        },
        computed: {
            ...mapGetters([
                'subState',
                'resultDataForUser',
                'resultDataForMsg',
                'resultDataForRebuy',
            ]),
            taskId() {
                return this.$route.query.id
            },
            getTooltipContentF() {
                if(!this.selRebuyTypeParam) {
                    return
                }else if(this.tooltipContentT) {
                    return this.tooltipContentT
                } else if(this.selRebuyTypeParam.name == '加购用户占比') {
                    return this.toolContentF.paixia
                }else if(this.selRebuyTypeParam.name == '复购用户占比') {
                    return this.toolContentF.fugou
                }
            },
            getTooltipContent() {
                return this.tooltipContent[this.selUserTypeValue]
            },
            user_isEmpty() {
                if (this.resultDataForUser && this.resultDataForUser.length > 0) {
                    return false;
                } else {
                    return true;
                }
            },
            msg_isEmpty() {
                if (this.resultDataForMsg && this.resultDataForMsg.length > 0) {
                    return false;
                } else {
                    return true;
                }
            },
            rebuy_isEmpty() {
                if (this.resultDataForRebuy && this.resultDataForRebuy.length > 0) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        watch: {
            // 特殊表
            resultDataForRebuy() {
                if (this.subState === this.g_const.activeCode.resultData && this.isActived
                    ) {
                        this.drawChartSpecial()
                    }
            },
            // 展示营销效果
            resultDataForUser() {
                 if (this.subState === this.g_const.activeCode.resultData && this.isActived
                    ) {
                        this.drawChartResult()
                    }
            },
            // 展示营销内容发送情况
            resultDataForMsg() {
                 if (this.subState === this.g_const.activeCode.resultData && this.isActived
                    ) {
                        this.drawChartPush()
                    }
            },
            // 特殊表显示或隐藏
            selRebuyTypeParam() {
                if(this.selRebuyTypeParam) {
                    this.selRebuyType = this.selRebuyTypeParam
                    this.showRebuyType = true
                } else {
                    this.showRebuyType = false
                }
            },
            // 展示营销效果 下拉框改变执行此函数
            selUserTypeValue() {
              this.getSelUserTypeName()
              if(!this.resultDataForUser) {
                  this.drawChartResult([])
              }
            },
            // 展示营销内容发送情况 下拉框改变执行此函数
            selMsgTypeValue() {
              this.getSelMsgTypeName()
              if(!this.resultDataForMsg) {
                  this.drawChartPush([])
              }
            },
            subState() {
                if (this.subState === this.g_const.activeCode.resultData && this.isActived) {
                      this.hasRefresh = true
                      this.init()
                      this.chartForUser = echarts.init(document.getElementById('marketingTypes'))
                      this.chartForMsg = echarts.init(document.getElementById('marketingContentTypes'))
                      this.chartForRebuy = echarts.init(document.getElementById('marketingRebuy'))
                      this.chartForUser.resize();
                      this.chartForMsg.resize();
                      this.chartForRebuy.resize();
                      this._getResultDataForUser()
                      this.msg_search()
                      this.rebuy_search()
                      var that = this
                      setTimeout(function() {
                        that.hasRefresh = false
                      }, 1000);
                }
            }
        },
        mounted() {
          this.isActived = true
          if(this.selRebuyTypeParam) {
              this.selRebuyType = this.selRebuyTypeParam
              this.showRebuyType = true
          } else {
              this.showRebuyType = false
          }
          this.getSelMsgTypeName()
        },
        methods: {
            ...mapActions([
                'getResultDataForUser',
                'getResultDataForMsg',
                'getResultDataForRebuy'
            ]),
            init() {
                // 初始化均值线
                this.isShowAveOne = false
                this.isShowAveTwo = false
                this.isShowAveThree = false
                this.clearSearchParam()
            },
            getSelUserTypeName() {
              var arr = this.marketingTypes.filter(o => {
                return o.name === this.selUserTypeValue
              })
              this.selUserTypeName.name = arr[0].value
            },
            getSelMsgTypeName() {
              var arr = this.g_const.marketingContentTypes.filter(o => {
                return o.name === this.selMsgTypeValue
              })
              this.selMsgTypeName.name = arr[0].value
            },
            clearSearchParam() {
                this.selectedDayCount = '15'
                this.dateRange = []
                this.selUserTypeValue = this.curUserTypeValue
                this.selMsgTypeValue = this.g_const.marketingContentTypes[0].name
            },
            _getResultDataForUser () {
                this.marketingTypesLoading = true
                if(!this.useCustomerGetResultMethod) {
                    this.getResultDataForUser([
                        this.taskId,
                        this.selectedDayCount,
                        this.startDate,
                        this.endDate,
                        this.selUserTypeValue
                    ])
                } else {
                    this.$emit('getResultData', [
                        this.taskId,
                        this.selectedDayCount,
                        this.startDate,
                        this.endDate,
                        this.selUserTypeValue
                    ])
                }
            },
            _getResultDataForMsg() {
              if(this.isEffect) return
              this.marketingContentTypesLoading = true
              this.getResultDataForMsg([
                  this.taskId,
                  this.selectedDayCount,
                  this.startDate,
                  this.endDate,
                  this.selMsgTypeValue
              ])
            },
            _getResultDataForRebuy() {
              if(!this.showRebuyType) return
              this.marketingRebuyLoading = true
              this.getResultDataForRebuy([
                  this.taskId,
                  this.selectedDayCount,
                  this.startDate,
                  this.endDate,
                  this.selRebuyType.value
              ])
            },
            draw(chart, data, selType) {
                chart.setOption(resultDataSerivce.createOption(data, this.selectedDayCount, selType));
            },
            // 绘制第一张表，此表为某些营销任务特有的表
            drawChartSpecial(data) {
              var _data = data ? data : this.resultDataForRebuy
              this.chartForRebuy.setOption(resultDataSerivce.createOption(_data, this.selectedDayCount, this.selRebuyType, this.isShowAveOne, this.dateRange))
              this.marketingRebuyLoading = false
            },
            // 绘制营销效果表
            drawChartResult(data) {
              var _data = data ? data : this.resultDataForUser
              var mapOptsF = Immutable.fromJS(this.getResultOptions ? this.getResultOptions(_data, this.selectedDayCount, this.selUserTypeName, this.isShowAveTwo, this.dateRange) : {})
              var mapOptsT = Immutable.fromJS(resultDataSerivce.createOption(_data, this.selectedDayCount, this.selUserTypeName, this.isShowAveTwo, this.dateRange))
              var opts = mapOptsT.mergeDeep(mapOptsF).toJS()
              this.chartForUser.setOption(opts)
              this.marketingTypesLoading = false
            },
            // 绘制营销内容发送情况表
            drawChartPush(data) {
              var _data = data ? data : this.resultDataForMsg
              this.chartForMsg.setOption(resultDataSerivce.createOption(_data, this.selectedDayCount, this.selMsgTypeName, this.isShowAveThree, this.dateRange))
              this.marketingContentTypesLoading = false
            },
            user_search() {
              if(this.hasRefresh) return
              this._getResultDataForUser()
            },
            msg_search() {
              this._getResultDataForMsg()
            },
            rebuy_search() {
              this._getResultDataForRebuy()
            },
            searchByDays(days) {
              this.selectedDayCount = days
              //有时间区间时清空并搜索，防止重复请求
              if(this.dateRange.length > 0 && this.dateRange[0] != null) {
                  this.dateRange = []
              }else {
                this._getResultDataForUser()
                this._getResultDataForMsg()
                this._getResultDataForRebuy()
              }
            //   this.dateRange = []
            },
            searchDaysRange(rangeDay) {
              var dayObj = utils.dateRangeFormat(rangeDay)
              this.startDate = dayObj.startDate
              this.endDate = dayObj.endDate
              this._getResultDataForUser()
              this._getResultDataForMsg()
              this._getResultDataForRebuy()
            },
            //显示均值辅助线
            showAve(val, drawC) {
                if(val === 'one') {
                    this.isShowAveOne = !this.isShowAveOne
                    this.marketingRebuyLoading = true
                } else if (val === 'two') {
                    this.isShowAveTwo = !this.isShowAveTwo
                    this.marketingTypesLoading = true
                } else if (val === 'three') {
                    this.isShowAveThree = !this.isShowAveThree
                    this.marketingContentTypesLoading = true
                }
                var that = this
                // 为了出现遮罩
                setTimeout(o => {
                    drawC()
                }, 100)
            },
        },
        props: [
            'selRebuyTypeParam',
            'marketingTypes',
            'curUserTypeValue',
            'getResultOptions',
            'useCustomerGetResultMethod',
            'resultSelStyle',
            'tooltipContent',
            'isEffect',
            'tooltipContentT'
        ]
    }
</script>
<style lang="scss" scoped>
  h4 {
      padding-left: 20px;
      height: 40px;
      line-height: 40px;
      border-bottom: solid 1px #d1dbe5;
      font-size: 14px;
    }
    .chartWaper {
        margin: 10px 18px;
        height: 450px;
        position: relative;
        .wrap {
          height: 100%;
        }
        .img_name_tooltip {
            position: absolute;
            top: 16px;
            left: 1%;
            color: #5f646a;
            font-size: 14px;
            width: 135px;
            z-index: 1000;
            &:hover {
                cursor: pointer;
            }
            span {
                display: inline-block;
                width: 100%
            }
        }
        .toolBox {
          position: absolute;
          top: 7px;
          right: 70px;
          .line_ave {
              font-size: 12px;
              color: #ffffff;
              cursor: pointer;
          }
          .w_1 {
            width: 95px;
          }
          .w_2 {
            width: 140px;
          }

        }
        .noData {
            position: absolute;
            top: 200px;
            width:100%;
            color: #ffffff;
            text-align: center;
        }
    }
    .tool_content {
        max-width: 500px;
    }
</style>

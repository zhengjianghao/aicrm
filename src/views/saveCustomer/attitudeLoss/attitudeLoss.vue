<template>
  <div>
    <content-header :name="vm.taskName">
    </content-header>
    <div v-loading='load' element-loading-text="正在加载中,请耐心等待">
      <div class="header">
        会员状态变更：
        <el-select v-model="change_time">
          <el-option v-for="data in change_option" :label='data.name' :value='data.value' :key='data.value'>

          </el-option>
        </el-select>
      </div>
      <el-row type="flex">
        <el-col :span='24' class="box box-left">
          <el-row class="line-header">
            <el-col :span='5'>
              <p>平销-流失会员</p>
            </el-col>
          </el-row>
          <el-row class="line-header num">
            <el-col :span='5'>
              <p>
                <span>{{toQuartile(attitudeLoss.lost.total)}}</span>人</p>
            </el-col>
          </el-row>
          <!--<el-row v-for="(value,index) in show_data.lost.list" :key='index' class="col-line">
            <el-col :span='5'>
              <p class="type_name">{{value.name}}</p>
            </el-col>
            <el-col :span='19'>
              <i class="iconfont icon-kulian kulian" v-for="(name, index) in value.percent" :key='index'></i>
              <span>{{value.num}}人</span>
              <span class="pull-right">{{value.pec}}</span>
            </el-col>
          </el-row>-->

            <div id="lossChart" style="height: 500px"></div>

        </el-col>
        <el-col :span='24' class="box">
          <el-row class="line-header">
            <el-col :span='5'>
              <p>平销-预流失会员</p>
            </el-col>
          </el-row>
          <el-row class="line-header num">
            <el-col :span='5'>
              <p>
                <span>{{toQuartile(attitudeLoss.prelost.total)}}</span>人</p>
            </el-col>
          </el-row>
          <!--<el-row v-for="(value, index) in show_data.prelost.list" :key='index' class="col-line">
            <el-col :span='5'>
              <p class="type_name">{{value.name}}</p>
            </el-col>
            <el-col :span='19'>
              <i class="iconfont icon-kulian kulian" v-for="(name, index) in value.percent" :key='index'></i>
              <span>{{value.num}}人</span>
              <span class="pull-right">{{value.pec}}</span>
            </el-col>
          </el-row>-->

            <div id="prelossChart" style="height: 500px;"></div>

        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from '../../../misc/utils'
import g_const from '../../../misc/global.constant'
import echarts from 'echarts'
export default {
  data() {
    var maxData = 100
    var spirit = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAkCAYAAAAOwvOmAAAABGdBTUEAALGPC/xhBQAABhxJREFUWAnNWGuoVVUQnjnX7rUHalakhPkjNAj6EUaZUmFgSQ8ysYcF6c37oCglocQgyigsK+kh4TnXUivDVNRKo8xSexhafyMrf4RmWt3SIvGVd/q+tc5eaz/O8V4fQQN7r5lZM7NmzVpr1uytcqww3/qLyY3SJaOhej6egaIyADwFvgvv3cB3oP0I7Wpp185jHYKGegZlGwvBKXiuxNOrR0oqR+DYF5CdC+eW9UgHQt07VbERkHsWxtkeP6hsgfLD0qYbuzNS36ml1iB75Xk4M7WuEZVD6P8FU9uF1iCXLGXjUXTmQXIKIne4nkxtpxZYPwz3NpSuLSiqbIPR5eCvkjbMXpXORDBTeU2GYc+NxTMeHRfGziqmskGa0DdRfy/0gVF0yjvEfXBRTmGnlORRaZFFcKQr11ebpIPz5S5M4kk8gzNCnFyTDK/lWNYpv2RrYOC6jAGBI2fKvXKb7s/xe0a+b004jy9BuC2joLIRY43OL2UpI7RHnss51IVYPgSlScftEAe4Xg/CRjuwB2DvSBjT5GrQLwe6isRIddhw7IEvcwLTYWx2jndiZNnuh4G8I9dgnPWJ4RgpQ5TSoPLGSXeI9tt1Lt6V9FCIFlIO9l8VvFNMjCYjEyba3dIbe6gemMXJHI9Mo0sz24Oq4bRWZEJCe+OKtc7C43K37suyQM23kVK2rdIh+6Viq0D3L8i8aX3Qt8zJlG0b5EcVZJr1gDvJ2Q4uqwMcWRg+ggQYr47tMlQukFH6T1XGN5Trkh8Q0eiIylJk6NszcmVbCHpiivcXHBgqrcoxIjDaFdkKxhDHVFg2OQ/Lu6sEh24CM32XrSg4RC1ewmmHPG+8LLVTiTpYb72wP8IyVLl9XCKtEqFhrlOXhD2LF7rKzSRKQHjbR1Bk6toQIxT7S7JH+gXyRzkDjhevGE1FNwgDKeXGYs5ybJNBQc6HcFOg04jKV2nS4So/MdyB36x7McltgY5IUZd9k2GT92cC6n3hRh+Y8NB2YpDaF2WL8upZlJI9DINhcwZ+yR2ag4H2+25doNMI703DSY/gfMk7FWcdBSPGzO7XfRqYw7B534mdVaxFP8CyXAJqGmTHSavcUZDJMuKYxmLRlBvTFx0U9NVjViVPtem7eVaBbtVvweOTv+0cK/Pi9o51hsMYqehpdikzuv8ZYanto6zNFEfYOzXUDapyFo54Iy7fuPlqeUOZP1GJmlyOZxDm2s9FWVEWquzEs1kaUAYzSR4NeLV0yLmpSP1McTq1Pehx+TiYyIbAyyMVm4o0MB3seECS8LNN8C75Ddl8DoqV2XXrr4pcBo3G1BA7iDNPrU0xaZQfCEVgBi7bYvS/gM7oUFHSc0zOATILkVgBvVNqilWTZarvQ+IlxGo12pgGTG4RZuY8VFyRdmdgs6RlfdSAmqhBLnZPSa4C7z5MNKYAQ5bWXFVAI5ykuXKZFKELRYA7zb5cqNhaCMTMrqgQ2nSel8W7bPy0erFKcwKTkM/eqtK1mw4bh2Eo01QVmAGdp4Nw2SYCXxhokc/Rz883RIpgYUBHgn5MXrfTPeHePtfw8Ko0d+sQVVp1BWQn4PGVpkq8uBdYb0g84Swnr1L0wTvVrmugvCHpRztADkg50CzCVL6BS4zg4sDvDmnTldChY99D9JkgfshVnvy6TmAzJrE8IUK1J6/apZjTFheL2PsInJiVkCel5en1hyWa415s1c8Sho8Uqcn6Nd75evwpFGwzEuETbis2DQ7Nydjhh0PKIfbFSJHyhRevkRtIBlBZgvTYiqT6d+AdC1K20yD+Ch5u7jR8jPJvTL5+yzpFcZaz+3ASBMc8C79iCjNRJ1byRrJiKcp/R96D6MwEN5/bvkMaGSEt+kdKw6FFp8guW1+8l+AZQzIHzLorcW5XSl/ZVLiSmCgb5IpqtTkODg3O6XN9PoH+rbUcomxtp9jjZ8m/LQ+SrAm+wuD/AP6X4gXDaJwNrL5dxTIOwddM/hsgNUB95UTI/wqajYHSn2BJb89b/goq4Wu7RT/tTql7pxIL/6ufZolTSZv8XjT8JvL1PZeM/6U4QdZm/Fe1A1FZh331HrJ/Z6La0/ZfHXfIk0D+TQoAAAAASUVORK5CYII='
    return {
      vm: {
        taskName: '态度流失一览'
      },
      lossAttitude: '',
      prelossAttitude: '',
      utils: utils,
      g_const: g_const,
      change_time: '15day',
      show_data: {},
      load: true,
      change_option: [
        {
          name: '不限制',
          value: ''
        }, {
          name: '最近15天',
          value: '15day'
        }, {
          name: '最近30天',
          value: '30day'
        }, {
          name: '1个月',
          value: '1month'
        }, {
          name: '2个月',
          value: '2month'
        }, {
          name: '3个月',
          value: '3month'
        }, {
          name: '4个月',
          value: '4month'
        }, {
          name: '5个月',
          value: '5month'
        }, {
          name: '6个月',
          value: '6month'
        }, {
          name: '7个月',
          value: '7month'
        }, {
          name: '8个月',
          value: '8month'
        }, {
          name: '9个月',
          value: '9month'
        }, {
          name: '10个月',
          value: '10month'
        }, {
          name: '11个月',
          value: '11month'
        }, {
          name: '12个月',
          value: '12month'
        },
      ],
      test_data: [
        {
          name: '态度不满',
          num: 115,
          percent: 1,
          pec: '5%',
        }, {
          name: '假货怀疑',
          num: 100,
          percent: 5,
          pec: '5%',
        }, {
          name: '发货后退货退款的',
          num: 500,
          percent: 3,
          pec: '5%',
        },
      ],
      test_date2: {
        lost: {
          num: 540,
          list: {
            态度不满: 115,
            假货怀疑: 145
          }
        },
        prelost: {
          num: 2257,
          list: {
            态度不满: 115,
            假货怀疑: 156
          }
        }
      },
      marktType: {
        DISPLEASURE: '态度不满',
        FAKESUSPECT: '假货怀疑'
      },
      option: {
          tooltip: {
            formatter: function (array) {
              return array.name + ': ' + array.data ;
            },
          },
          xAxis: {
              show: false,
              max: maxData,
              splitLine: {show: false},
              show: false,
              offset: 10,
              axisLine: {
                  lineStyle: {
                      color: '#999'
                  }
              },
              axisLabel: {
                  margin: 10
              }
          },
          yAxis: {
              data: ['态度不满', '假货怀疑', '质量不满', '欺诈行为','价格不满', '承诺不兑现', '预期落差', '物流问题', '未发货退款的', '发货后退货退款的', '申请过售后的'],
              inverse: true,
              axisTick: {show: false},
              axisLine: {show: false},
              axisLabel: {
                  margin: 10,
                  textStyle: {
                      color: '#999',
                      fontSize: 12
                  }
              }
          },
          grid: {
              top: 'center',
              height: 500,
              left: 150,
              right: 100
          },
          series: [{
              // current data
              type: 'pictorialBar',
              symbol: spirit,
              symbolRepeat: 'fixed',
              symbolMargin: '27%',
              symbolClip: true,
              symbolSize: 18,
              symbolBoundingData: maxData,
              data: [],
              // markLine: {
              //     symbol: 'none',
              //     label: {
              //         normal: {
              //             show: false,
              //         }
              //     },
              //     lineStyle: {
              //         normal: {
              //             color: 'green',
              //             type: 'dotted',
              //             opacity: 0.2,
              //             width: 2,
              //             opacity: 0,
              //         }
              //     },
              //     data: [{
              //         type: 'max'
              //     }]
              // },
              z: 10
          }, {
              // full data
              type: 'pictorialBar',
              itemStyle: {
                  normal: {
                      opacity: 0.2
                  }
              },
              label: {
                  normal: {
                      show: true,
                      formatter: function (params) {
                          return params.value
                      },
                      position: 'insideRight',
                      offset: [40, 0],
                      textStyle: {
                          color: 'black',
                          fontSize: 14
                      }
                  }
              },
              animationDuration: 0,
              symbolRepeat: 'fixed',
              symbolMargin: '27%',
              symbol: spirit,
              symbolSize: 18,
              symbolBoundingData: maxData,
              data: [],
              z: 5
          }]
      }
    }
  },
  mounted() {
    this.getActiveMenuCode(g_const.activeMenuCodes.saveCustomer)
    this.getAttitudeLoss(this.change_time)
    this.load = true
    this.updateSiderbarActiveNode({
      id: '',
      openName: '态度不满流失',
      name: '态度流失一览'
    })

  },
  computed: {
    ...mapGetters([
      'attitudeLoss'
    ])
  },
  watch: {
    attitudeLoss() {
      this.drawChart()
    },
    change_time() {
      this.load = true
      this.getAttitudeLoss(this.change_time)
    }
  },
  methods: {
    ...mapActions([
      'getSubCode',
      'updateSiderbarActiveNode',
      'getActiveMenuCode',
      'getAttitudeLoss'
    ]),
    toQuartile(num) {
      return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
    drawChart() {
      var list_max = this.attitudeLoss.lost.total ? this.attitudeLoss.lost.total : 100
      var pre_max = this.attitudeLoss.prelost.total ? this.attitudeLoss.prelost.total : 100
      var list_option = {
        xAxis: {
          max: list_max
        },
        series: [{
              data: this.attitudeLoss.lost.list,
              symbolBoundingData: list_max
          }, {
              data: this.attitudeLoss.lost.list,
              symbolBoundingData: list_max
          }]
      }
      var pre_option = {
        xAxis: {
          max: pre_max
        },
        series: [{
              data: this.attitudeLoss.prelost.list,
              symbolBoundingData: pre_max
          }, {
              data: this.attitudeLoss.prelost.list,
              symbolBoundingData: pre_max
          }]
      }
      this.lossAttitude = echarts.init(document.getElementById('lossChart'))
      this.prelossAttitude = echarts.init(document.getElementById('prelossChart'))
      this.lossAttitude.setOption(this.option)
      this.lossAttitude.setOption(list_option)
      this.prelossAttitude.setOption(this.option)
      this.prelossAttitude.setOption(pre_option)
      this.load = false
    }
  },
  components: {

  }
}
</script>
<style lang="scss" scoped>
.header {
  background: #f1f2f3;
  margin: 8px;
  padding: 10px 0 10px 10px;
  font-size: 12px;
}

.box {
  font-size: 12px;
  padding-right: 15px;
  .col-line {
    height: 35px;
    line-height: 35px;
    .type_name {
      text-align: right;
    }
  }
  .line-header {
    p {
      text-align: right;
    }
  }
  .num {
    margin: 15px 0;
    span {
      font-size: 24px;
    }
  }
  .kulian {
    margin-left: 15px;
    font-size: 18px;
  }
}

.box-left {
  border-right: 1px solid #999;
}
</style>

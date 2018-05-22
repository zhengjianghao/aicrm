<template>
  <div>
    <div class="calendar_box">
      <div style="text-align: center;display: inline-block;" v-if="calType != 'double12'">
        <p v-show="num > 0" class="month_head" :class="num == 17 ? '' : 'has_border'" :style="{width: num * 61 +'px'}">10月</p>
        <p v-show="num < 17" class="month_head" :style="{width: (17 - num) * 61 +'px'}">11月</p>
      </div>
      <div style="text-align: center;display: inline-block;" v-else>
        <p v-show="num > 0" class="month_head" :class="num == 17 ? '' : 'has_border'" :style="{width: num * 61 +'px'}">11月</p>
        <p v-show="num < 17" class="month_head" :style="{width: (17 - num) * 61 +'px'}">12月</p>
      </div>
      <i v-show="cal_index > 0" class="iconfont icon-zuo cal_turn cal_turn_left" @click='forward'></i>
      <div class="min_box" id="middle_box" style="width: 3800px;">
        <template v-for="(date,index) in calendarDate">
          <div class="pull-left" :key="index">
            <div class="calendar_all" v-for="(value, index) in date.days" :key='index'>
              <p class="calendar_week">{{value.week}}</p>
              <div class="calendar_day" :class='value.className'>
                <span>{{value.day}}</span>
                <p style="height: 18px;">
                  <span v-show="value.message > 0">{{value.message}}人</span>
                </p>
              </div>
            </div>
            <div class="double_type">{{date.message}}</div>
          </div>
        </template>
      </div>
      <i v-show="cal_index < 44" class="iconfont icon-you cal_turn cal_turn_right" @click='backward'></i>
    </div>
  </div>
</template>
<script type='text/ecmascript-6' scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from '../../misc/utils'
import moment from 'moment'
export default {
  data() {
    return {
      nowDate: '2017-10-28',
      utils: utils,
      num: this.calType == 'double12' ? 3 : 4,
      cal_index: 27,
      max_index: 44,
    }
  },
  computed: {
    ...mapGetters([
      'calendarDate'
    ]),
  },
  mounted() {
    this.getCalendarDate([this.calData ? this.calData : {}, this.calType])
    // this.num = this.calType == 'double12' ? 3 : 4
    this.doMove()
    // this.getfilCalendarData(this.nowDate)
  },
  watch: {
    cal_index() {
      if(this.calType == 'double12') {
        this.getNum12()
      } else {
        this.getNum()
      }
    },
    calData() {
      this.getCalendarDate([this.calData ? this.calData : {}, this.calType])
      this.cal_index = 27
      this.doMove()
    }
  },
  methods: {
    ...mapActions([
      'getCalendarDate',
      'getfilCalendarData'
    ]),
    getCalendar(value) {
      //var _value = '2017-10-01'
      var num = 61
      var _cale = []
      var that = this
      for (var i = 0; i < num; i++) {
        var _date = moment(new Date(value)).add(i, 'days')
        _cale.push({
          week: that.weeks[parseInt(moment(_date).format('d'))],
          day: moment(_date).format('D'),
        })
      }
      this.showCalendarDate = _cale
    },
    forward() {
      // if(this.cal_index >=24 && this.cal_index <= 30) {
      this.cal_index = this.cal_index - 1
      // }else {
      //   this.cal_index = this.cal_index - 5
      // }
      if (this.cal_index <= 0) {
        this.cal_index = 0
      }
      this.doMove()
    },
    backward() {
      // if(this.cal_index >=24 && this.cal_index <= 30) {
      this.cal_index = this.cal_index + 1
      // }else {
      //   this.cal_index = this.cal_index + 5
      // }
      if (this.cal_index >= this.max_index) {
        this.cal_index = this.max_index
      }
      this.doMove()
    },
    doMove() {
      var _box = document.getElementById('middle_box')
      _box.style.left = -(this.cal_index * 61) + 'px'
    },
    getNum12() {
      var _nowDate = moment(this.calendarDate[this.cal_index].days[0].date)
      var _now11 = moment().format('YYYY') + '-12-01'
      var _now11_13 = moment().format('YYYY') + '-11-13'
      var _now11_14 = moment().format('YYYY') + '-11-14'
      var _fil = moment(_now11)
      var _isTen = _nowDate.isBetween(_now11_13, _now11);
      var _isBefore = _nowDate.isBefore(_now11_14)
      if (_isTen) {
        var _day = _nowDate.to(_fil).split(' ')[1]
        if (_day == 'a') {
          this.num = 1
        } else {
          this.num = _day
        }
      } else if (_isBefore) {
        this.num = 17
      } else {
        this.num = 0
      }
    },
    getNum() {
      var _nowDate = moment(this.calendarDate[this.cal_index].days[0].date)
      var _now11 = moment().format('YYYY') + '-11-01'
      var _now11_14 = moment().format('YYYY') + '-10-14'
      var _now11_15 = moment().format('YYYY') + '-10-15'
      var _fil = moment(_now11)
      var _isTen = _nowDate.isBetween(_now11_14, _now11);
      var _isBefore = _nowDate.isBefore(_now11_15)
      if (_isTen) {
        var _day = _nowDate.to(_fil).split(' ')[1]
        if (_day == 'a') {
          this.num = 1
        } else {
          this.num = _day
        }
      } else if (_isBefore) {
        this.num = 17
      } else {
        this.num = 0
      }
    }
  },
  props: ['calData', 'calType']
}
</script>
<style lang="scss" scoped>
.def_color {
  background: #f9f9f9;
}

.before_color {
  background: rgba(0, 128, 0, 0.35);
}

.first_hot {
  background: rgba(128, 0, 128, 0.35);
}

.s_orgasm {
  background: rgba(255, 165, 0, 0.35);
}

.consolidation {
  background: rgba(255, 255, 0, 0.35);
}

.double_e {
  background: rgba(255, 0, 0, 0.35);
}

.end_double {
  background: rgba(0, 191, 255, 0.35);
}

.calendar_box {
  text-align: center;
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 1037px;
  min-width: 1037px;
  padding: 20px 18px 0px 18px;
  .min_box {
    height: 80px;
    position: relative;
  }
}

.month_head {
  float: left;
  color: #f50b0b;
}

.has_border {
  border-right: solid 1px black;
}

.calendar_all {
  text-align: center;
  display: inline-block;
  width: 61px;
  height: 80px;
  overflow: hidden;
  .calendar_week {
    font-size: 14px;
    font-weight: bold;
    height: 20px;
    background: #e9ebed;
  }
  .calendar_day {
    padding: 15px 0px 5px 0px;
    font-size: 16px;
    color: #393f51;
    font-weight: bolder;
    p {
      color: rgba(27, 25, 30, 0.6);
      font-size: 12px;
      font-weight: normal;
      margin-top: 5px;
    }
  }
}

.cal_turn {
  background: #e5e5e5;
  color: white;
  font-weight: bolder;
  display: block;
  text-align: center;
  width: 18px;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  cursor: pointer;
  z-index: 200;
  bottom: 23px;
}

.cal_turn_left {
  position: absolute;
  left: 0px; // z-index: 1000;
}

.cal_turn_right {
  position: absolute;
  right: 0px; // z-index: 1000;
}

.double_type {
  font-size: 14px;
  color: #f50b0b;
}
</style>

<template>
<div style="display: inline-block">
    <el-select v-model="curTime" :disabled="disabled" @change="changeHandle" placeholder="请选择" class="el-input-normal">
      <el-option
        v-for="item in timersList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span>至</span>
    <el-select v-model="curTimeEnd" :disabled="disabled" @change="changeHandleEnd"  placeholder="请选择" class="el-input-normal">
      <el-option
        v-for="item in timersListEnd"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import moment from 'moment'
  export default {
    data() {
      return {
        endOptions: [],
        startOptions: [],
        step: 30,
        allMins : 0,
        timersList: [],
        timersListEnd: [],
        curTime: '08:30',
        curTimeEnd: '22:00'
      }
    },
    watch: {
      startTime() {
        if(this.startTime.length == 4) {
          this.curTime = '0' + this.startTime
        }else if( this.startTime.length == 5) {
          this.curTime = this.startTime
        }
      },
      endTime() {
        if(this.endTime.length == 4) {
          this.curTimeEnd = '0' + this.endTime
        }else if( this.endTime.length == 5) {
          this.curTimeEnd = this.endTime
        }
        //this.curTimeEnd = this.endTime
      }
    },
    mounted() {
      this.step = this.timeStep ? parseInt(this.timeStep) : this.step
      this.processTimer()
      this.processTimerEnd(this.curTime)
    },
    methods: {
      init() {
        this.$emit('updateTime', {
          startTime: this.curTime,
          endTime: this.curTimeEnd
        })
      },
      changeHandle(val) {
        this.init()
        this.processTimerEnd(val)
      },
      changeHandleEnd() {
        this.init()
      },
      processTimer() {
        // 一天有多少个15分钟
        this.allSteps = (60 / this.step) * 24
        var allOptions = []
        for(var i = 0; i < this.allSteps; i++) {
          allOptions.push(this.timerFormat(i * this.step))
        }
        this.timersList = allOptions
      },
      processTimerEnd(start) {
        if(!start) return
        var h = parseInt(start.split(':')[0])
        var m = parseInt(start.split(':')[1])
        var _start = h * 60 + m
        // 一天有多少个15分钟
        this.allSteps = (60 / this.step) * 24
        // 已经过去了多少个15分钟
        var curSteps = _start / this.step
        var allOptions = []
        for(var i = curSteps + 1; i < this.allSteps; i++) {
          allOptions.push(this.timerFormat(i * this.step))
        }
        for(var j = 0 ; j < curSteps + 1; j++) {
          allOptions.push(this.timerFormat(j * this.step, true))
        }
        this.timersListEnd = allOptions
      },
      /**
       * 格式化时间集合
       * mins 时间点 以30分为间隔
       */
      timerFormat(mins, isTomorrow) {
        // 小时数
        var h = parseInt(mins / 60)
        // 分钟数
        var m = mins % 60
        var str_h = ''
        var str_m = ''
        str_h = h
        // 大于等于1小时 小于10小时
        if(h < 10) {
          str_h = '0' + h
        }
        str_m = m
        // 不足10分钟
        if(m < 10) {
          str_m = '0' + m
        }
        return {
          label: str_h + ':' + str_m + (isTomorrow ? ' 隔天' : ''),
          value: str_h + ':' + str_m
        }
      }

    },
    props: [
      'startTime',
      'endTime',
      'disabled',
      'timeStep'
    ]
}
</script>
<style lang="scss">

</style>

<template>
<div>
  <el-row :gutter="20">
    <el-col :span="3"><p>缓冲时间：</p></el-col>
    <el-col :span="21">
      <el-select v-model="buffer_time">
          <el-option v-for="data in global.bufferTime"
          :value='data.value'
          :label='data.name'
          :key='data.value'></el-option>
      </el-select>
    </el-col>
  </el-row>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import global from '../../misc/global.constant'
  export default {
    data() {
      return {
        global: global,
        buffer_time: '6'
      }
    },
    mounted() {
      // this.send_times = this.sendTimes
    },
    watch: {
      buffer_time() {
        this.updataValue()
      },
      bufferTime() {
        this.buffer_time = this.bufferTime
      },

    },
    computed: {
      ...mapGetters([
          ]),

    },
    methods: {
      ...mapActions([
        'updataBaseMConfig',
      ]),
      updataValue() {
        // 更新营销配置基本量
        this.updataBaseMConfig({
          buffer_time: this.buffer_time,
        })
      }
    },
    props: [
      'bufferTime',
    ]
}
</script>
<style lang="scss">

</style>

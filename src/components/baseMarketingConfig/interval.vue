<template>
  <el-row :gutter="20">
    <el-col :span="3"><p>{{ title }}：</p></el-col>
    <el-col :span="6">
      <el-radio v-model="interval_label"  label=""><AI></AI>智慧逐个ID管理</el-radio>
      <el-tooltip :content='tooltipContent' placement="top-start" popper-class='tool_notes' effect="dark">
        <i class="iconfont icon-help1 toolGanTanHao"></i>
      </el-tooltip>
    </el-col>
    <el-col :span="15">
        <el-radio v-model="interval_label" label="custom">
            {{ customLabel }}
            <el-select v-model="interval" :disabled="interval_label != 'custom'" class="el-input-sm-sm">
                <el-option
                    :disabled = "interval_label != 'custom'"
                    v-for="item in (qianxu != undefined ? g_const.urgeTime3 : g_const.marketingInterval)"
                    :label="item.name"
                    :value="item.value"
                    :key="item.value"
                    >
                </el-option>
            </el-select>
        </el-radio>
        <el-tooltip content='是指签收快递时间，而非确认订单时间' placement="top-start" popper-class='tool_notes' effect="dark">
          <i class="iconfont icon-help1 toolGanTanHao"></i>
        </el-tooltip>
    </el-col>
</el-row>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import g_const from '../../misc/global.constant'
  export default {
    data() {
      return {
        interval_label: '',
        interval: '168',  // 单位小时 7天
        g_const: g_const,
        tooltipContent: '根据每个会员的购买习惯以及店铺历史数据，智能为每个会员制定营销时间'
      }
    },
    watch: {
      interval_label() {
        this.updataValue()
      },
      interval() {
        this.updataValue()
      },
      intervalLabel() {
        this.interval_label = this.intervalLabel
      },
      intervalValue() {
        this.interval = this.intervalValue ? this.intervalValue : this.interval
      }
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig'
      ]),
      updataValue() {
        // 更新营销配置基本量
        this.updataBaseMConfig({
          interval_label: this.interval_label,
          interval: this.interval
        })
      }
    },
    props: [
      'intervalLabel',
      'intervalValue',
      'title',
      'customLabel',
      'qianxu'
      ]
}
</script>
<style lang="scss">

</style>

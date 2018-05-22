<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <p>会员状态变更时间：</p>
      </el-col>
      <el-col :span="2">
        <el-radio v-model="member_change_label" label="">不限制</el-radio>
      </el-col>
      <el-col :span="2">
        <el-radio v-model="member_change_label" label="15">最近15天</el-radio>
      </el-col>
      <el-col :span="2">
        <el-radio v-model="member_change_label" label="30">最近30天</el-radio>
      </el-col>
      <el-col :span="15">
        <el-radio v-model="member_change_label" label="custom">自定义</el-radio>
        <el-select v-model="member_change" :disabled="member_change_label != 'custom'" placeholder="请选择">
          <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      member_change_label: '',
      member_change: '',
      options: [{
        label: '1个月',
        value: '1'
      }, {
        label: '2个月',
        value: '2'
      }, {
        label: '3个月',
        value: '3'
      }, {
        label: '4个月',
        value: '4'
      }, {
        label: '5个月',
        value: '5'
      }, {
        label: '6个月',
        value: '6'
      }, {
        label: '7个月',
        value: '7'
      }, {
        label: '8个月',
        value: '8'
      }, {
        label: '9个月',
        value: '9'
      }, {
        label: '10个月',
        value: '10'
      }, {
        label: '11个月',
        value: '11'
      }, {
        label: '12个月',
        value: '12'
      }]
    }
  },
  mounted() {
    // this.member_change_label = this.orderTimeLabel
  },
  watch: {
    memberChange() {
      if (this.memberChangeLabel == 'custom') {
        this.member_change = this.memberChange
      } else {
        this.member_change = '1'
      }
    },
    memberChangeLabel() {
      this.member_change_label = this.memberChangeLabel
    },
    member_change() {
      this.updataValue()
    },
    member_change_label() {
      this.updataValue()
    }
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    updataValue() {
      // 更新营销配置基本量
      this.updataBaseMConfig({
        member_change: this.member_change,
        member_change_label: this.member_change_label
      })
    }

  },
  props: [
    'memberChange',
    'memberChangeLabel',
  ]
}
</script>
<style lang="scss">

</style>

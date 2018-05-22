<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <p>订单类型：</p>
      </el-col>
      <el-col :span="2">
        <el-checkbox v-model="unlimited" @change="handleCheckAllChange" label="不限">不限</el-checkbox>
      </el-col>
      <el-col :span="19">
        <el-checkbox-group v-model="ckOrderType" @change="handleCheckedCitiesChange">
          <el-row :gutter="20">
            <el-col :span="item.length <= 6 ? 3 : 5" v-for="(item, index) in orderTypes" v-if="index <= 4" :key="item">
              <el-checkbox :label="item">
                {{item}}
              </el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3"></el-col>
      <el-col :span="21">
        <el-checkbox-group v-model="ckOrderType" @change="handleCheckedCitiesChange">
          <el-row :gutter="20">
            <el-col :span="item.length <= 6 ? 3 : 4" v-for="(item, index) in orderTypes" v-if="index > 4" :key="item">
              <el-checkbox :label="item">
                {{item}}
              </el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
export default {
  data() {
    return {
      unlimited: true,
      ckOrderType: []
    }
  },
  computed: {
    orderTypes() {
      return globalConstant.orderTypes;
    }
  },
  watch: {
    checkedOrderType() {
      this.ckOrderType = this.checkedOrderType
      this.unlimited = this.ckOrderType.length === 0
    },
    ckOrderType() {
      // 更新营销配置基本量
      this.updataBaseMConfig({
        activity_type: this.ckOrderType
      })
      if (this.dataBind) {
        var sycnObj = {
          activity_type: this.ckOrderType
        }
        this.$emit('sycnMethod', sycnObj)
        //this.dataBind.activity_type = this.ckOrderType
      }
    }
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    handleCheckAllChange(event) {
      this.ckOrderType = event.target.checked ? [] : [this.orderTypes[0]];
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.unlimited = checkedCount <= 0
    }
  },
  props: [
    'checkedOrderType',
    'dataBind'
  ]

}
</script>
<style lang="scss" scoped>
.el-col {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  p {
    display: block;
    text-align: right;
    color: #5D6D7D;
  }
  span {
    font-size: 12px;
  }
}
</style>

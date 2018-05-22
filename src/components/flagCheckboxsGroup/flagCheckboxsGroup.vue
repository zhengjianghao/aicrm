<template>
  <div class="form-group">
    <el-row :gutter="20">
      <el-col :span="gift ? 5 : 3">
        <p v-if="!gift">备注旗子：</p>
        <el-checkbox v-if="gift" v-model="is_edit_flags">修改备注旗子</el-checkbox>
      </el-col>
      <el-col :span="gift ? 19 : 21">
        <div class="elment_content">
          <el-checkbox :disabled="gift ? !is_edit_flags : false" style="position: absolute" v-model="unlimited" @change="handleCheckAllChange">不限</el-checkbox>
          <el-checkbox-group style="margin-left: 73px" v-model="ckFlags" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="flag in flags" :label="flag.value" :disabled="gift ? !is_edit_flags : false" :key="flag.value">
              <span class="iconfont icon-qishi" :style="flag.style"></span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
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
      ckFlags: [],
      is_edit_flags: '',
      discount_set: []
    }
  },
  computed: {
    flags() {
      return globalConstant.flags.map((o) => {
        o.style = { color: o.color }
        return o;
      })
    }
  },
  watch: {
    // discountSet() {
    //   this.discount_set = this.discountSet
    // },
    isEditFlags() {
      this.is_edit_flags = this.isEditFlags
    },
    checkedFlags() {
      this.ckFlags = this.checkedFlags
      this.unlimited = this.ckFlags.length === 0
    },
    ckFlags() {
      var that = this
      // 更新营销配置基本量
      // if(this.gift) {
      //   that.discount_set[that.indexId].flags = that.ckFlags
      //   that.updataBaseMConfig({
      //     discount_set: that.discount_set
      //   })
      // }else {
      //   that.updataBaseMConfig({
      //   seller_flag: that.ckFlags
      //   })
      //   if(that.dataBind) {
      //     var sycnObj = {
      //       seller_flag: that.ckFlags
      //     }
      //     that.$emit('sycnMethod', sycnObj)
      //   }
      // }
      this.updateValue()
    },
    is_edit_flags() {
      var that = this
      if (this.gift) {
        that.discountSet[that.indexId].is_edit_flags = that.is_edit_flags
        if (!that.is_edit_flags) {
          that.ckFlags = []
        }
      }
      // this.updataBaseMConfig({
      //   discount_set: this.discount_set
      // })
      this.updateValue()
    },
  },
  mounted() {
    this.is_edit_flags = this.isEditFlags != undefined ? this.isEditFlags : ''
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    handleCheckAllChange(event) {
      this.ckFlags = event.target.checked ? [] : [this.flags[0].value];
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.unlimited = checkedCount <= 0
    },
    updateValue() {
      var that = this
      // 更新营销配置基本量
      if (this.gift) {
        that.discountSet[that.indexId].flags = that.ckFlags
        // that.discount_set[that.indexId].is_edit_flags = that.is_edit_flags
        that.updataBaseMConfig({
          discount_set: that.discountSet
        })
      } else {
        that.updataBaseMConfig({
          seller_flag: that.ckFlags
        })
        if (that.dataBind) {
          var sycnObj = {
            seller_flag: that.ckFlags
          }
          that.$emit('sycnMethod', sycnObj)
          //this.dataBind.seller_flag = this.ckFlags
        }
      }
    }
  },
  props: [
    'checkedFlags',
    'gift',
    'dataBind',
    'discountSet',
    'indexId',
    'isEditFlags'
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

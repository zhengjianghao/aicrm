<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <p>快递公司：</p>
      </el-col>
      <el-col :span="2">
        <el-checkbox v-model="unlimited" @change="handleCheckAllChange" label="不限">不限</el-checkbox>
      </el-col>
      <el-col :span="19">
        <el-checkbox-group v-model="express_array_sel" @change="handleCheckedCitiesChange">
          <el-row :gutter="20">
            <el-col :span="item.name.length > 6 ? 4 : 3" v-for="(item, index) in expressArray" v-if="index <= 6" :key="item.name">
              <el-checkbox :label="item.name">
                {{item.name}}
              </el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3"></el-col>
      <el-col :span="21">
        <el-checkbox-group v-model="express_array_sel" @change="handleCheckedCitiesChange">
          <el-row :gutter="20">
            <el-col :span="item.name.length > 6 ? 4 : 3" v-for="(item, index) in expressArray" v-if="index > 6 && index <= 13" :key="item.name">
              <el-checkbox :label="item.name">
                {{item.name}}
              </el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3"></el-col>
      <el-col :span="21">
        <el-checkbox-group v-model="express_array_sel" @change="handleCheckedCitiesChange">
          <el-row :gutter="20">
            <el-col :span="item.name.length > 6 ? 4 : 3" v-for="(item, index) in expressArray" v-if="index > 13 && index <= 20" :key="item.name">
              <el-checkbox :label="item.name">
                {{item.name}}
              </el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3"></el-col>
      <el-col :span="21">
        <el-checkbox-group v-model="express_array_sel" @change="handleCheckedCitiesChange">
          <el-row :gutter="20">
            <el-col :span="item.name.length > 6 ? 4 : 3" v-for="(item, index) in expressArray" v-if="index > 19 && index <= 26" :key="item.name">
              <el-checkbox :label="item.name">
                {{item.name}}
              </el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3"></el-col>
      <el-col :span="21">
        <el-checkbox-group v-model="express_array_sel" @change="handleCheckedCitiesChange">
          <el-row :gutter="20">
            <el-col :span="item.name.length > 6 ? 4 : 3" v-for="(item, index) in expressArray" v-if="index > 26 && index <= 33" :key="item.name">
              <el-checkbox :label="item.name">
                {{item.name}}
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
      express_array_sel: []
    }
  },
  computed: {
    expressArray() {
      return globalConstant.expressList;
    }
  },
  watch: {
    expressArraySel() {
      this.express_array_sel = this.expressArraySel
      this.unlimited = this.express_array_sel.length === 0
    },
    express_array_sel() {
      // 更新营销配置基本量
      this.updataBaseMConfig({
        express: this.express_array_sel
      })
      if (this.dataBind) {
        var sycnObj = {
          express: this.express_array_sel
        }
        this.$emit('sycnMethod', sycnObj)
        //this.dataBind.express = this.express_array_sel
      }
    }
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    handleCheckAllChange(event) {
      this.express_array_sel = event.target.checked ? [] : [this.expressArray[0].value];
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.unlimited = checkedCount <= 0
    }
  },
  props: [
    'expressArraySel',
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

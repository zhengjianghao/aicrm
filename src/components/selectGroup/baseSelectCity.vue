<template>
  <div>
    <div v-if="!oneRow">
      <el-row :gutter="20">
        <el-col :span="3">
          <p>地区：</p>
        </el-col>
        <el-col :span="21">
          <el-select v-if="!isRenderTree" class="input-custom" @visible-change='selectClickHandle' v-model="tempSelectCityValue" placeholder="选择地区">
          </el-select>
          <el-cascader ref="cascaderTree" v-show="isRenderTree" class="el-input-sm-sm" placeholder="选择地区" :options="city" change-on-select @change="handleChange" v-model="cur_city" :props="props">
          </el-cascader>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3"></el-col>
        <el-col :span="21" style="height: auto;">
          <el-tag style="margin-right: 5px;" v-for="tag in sel_tag" :key="tag" :closable="true" :close-transition="false" @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-tag v-if="!sel_tag || sel_tag.length === 0">全国</el-tag>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row :gutter="5">
        <el-col  class="text-left" style="height: auto;padding-right: 100px">
          <el-tag style="margin-right: 5px;" v-for="tag in sel_tag" :key="tag" :closable="true" :close-transition="false" @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-tag v-if="!sel_tag || sel_tag.length === 0">全国</el-tag>
        </el-col>
        <el-col  class="text-right" v-if="canEdit" style="position: absolute;right: 1px;top: 50%;transform: translateY(-50%);width: 100px">
          <el-select v-if="!isRenderTree" class="input-custom" @visible-change='selectClickHandle' v-model="tempSelectCityValue" placeholder="选择地区">
          </el-select>
          <el-cascader ref="cascaderTree" v-show="isRenderTree" class="el-input-sm-sm" placeholder="选择地区" :options="city" change-on-select @change="handleChange" v-model="cur_city" :props="props">
          </el-cascader>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import g_const from '../../misc/global.constant'
import utils from '../../misc/utils'
import { List, is } from 'immutable'
export default {
  data() {
    return {
      tempSelectCityValue: '',
      isRenderTree: false,
      placeHolder: '选择地区',
      g_const: g_const,
      city: [],
      bindCity: [],
      cur_city_text_array: [],
      cur_city: [],
      sel_tag: [],
      cur_city_temp: [],
      props: {
        value: 'label'
      }
    }
  },
  mounted() {
    if(this.curCityTextArray) {
      this.sel_tag = JSON.parse(JSON.stringify(this.curCityTextArray))
    }
  },
  watch: {
    // 父组件传来的选中的地区code，转换成相应的地区名
    curCityTextArray(n, o) {
      // 重复地区名，不处理
      if (this.isSame(n, o)) return
      if(!this.curCityTextArray)  {
        this.sel_tag = []
      } else {
        this.sel_tag = JSON.parse(JSON.stringify(this.curCityTextArray))
      }
    },
    // 用户修改同步到vuex
    sel_tag() {
      this.updataValue()
    }
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    selectClickHandle() {
      this.city = this.transform()
      this.isRenderTree = true
      this.$refs.cascaderTree.menuVisible = true
    },
    // 更新到vuex
    updataValue() {
      var sycnObj = {
        // 去除/ 并将对应的省市区分组
        // bindCity: this.groupCityTag(this.sel_tag)
        bindCity: this.customUpdate(this.sel_tag, this.cityData),
        bindCityTextArray: this.sel_tag
      }
      if (this.dataBind) {
        this.$emit('sycnMethod', sycnObj)
      }
      // 调用父组件的函数,更新列表中对应一行的地区数据
      if (this.oneRow) {
        this.$emit('sycnCity', sycnObj, this.id)
      }
      if (this.marketDate) {
        // 更新营销配置基本量
        this.updataBaseMConfig({
          city: sycnObj.bindCity,
          area_text_array: sycnObj.bindCityTextArray
        })
      }
    },
    // 将省市区用/连接（在标签上显示）
    concatCityTag(cityTag) {
      return cityTag.map(o => {
        var p = o.province
        var c = o.city ? '/' + o.city : ''
        var d = o.district ? '/' + o.district : ''
        return p + c + d
      })
    },
    // 是否重复
    isSame(n, o) {
      return is(List(n), List(o))
    },
    // 整理省市区，用于显示
    getCityTag(_province, _city, _district, isCode) {
      if (!_province) return []
      // 去重(省、市)
      var temp_province = utils.commonArrayUnique(JSON.parse(JSON.stringify(_province)))
      var temp_city = utils.commonArrayUnique(JSON.parse(JSON.stringify(_city)))
      // 存储整理好的省市区对应表，用于在tag中展示
      var ret = []
      // 遍历现存的省份
      temp_province.forEach(sel_p => {
        var tag = {}
        var c_index = 0
        // 遍历全国省市列表
        this.cityData.forEach(p => {
          // 找到对应省份
          var _cur_p = isCode ? p.value : p.label
          if (_cur_p === sel_p) {
            tag.province = sel_p
            // 遍历现存城市
            temp_city.forEach(sel_c => {
              tag.city = undefined // 初始值
              tag.district = undefined // 初始值
              // 遍历相应省份对应城市
              p.children.forEach(c => {
                var _cur_c = isCode ? c.value : c.label
                // 在该省找到对应城市
                if (_cur_c === sel_c) {
                  c_index++
                  tag.city = sel_c
                  var d_index = 0
                  // 遍历现存地区
                  _district.forEach(sel_d => {
                    c.children.forEach(a => {
                      var _cur_a = isCode ? a.value : a.label
                      // 在该市找到对应区域（省、市、区）
                      if (_cur_a === sel_d) {
                        d_index++
                        tag.district = sel_d
                        ret.push(JSON.parse(JSON.stringify(tag)))
                      }
                    })
                  })
                  // 现存市不存在该区域（省、市）
                  if (d_index === 0) {
                    ret.push(JSON.parse(JSON.stringify(tag)))
                  }
                }
              })
            })
            if (c_index === 0) {
              ret.push(JSON.parse(JSON.stringify(tag)))
            }

          }
        })

      })
      return ret
    },
    // 删除城市
    handleClose(code) {
      this.sel_tag = this.sel_tag.filter(o => {
        return o !== code
      })
    },
    //添加城市
    handleChange(value) {
      // 选全国，则去除其它标签
      if (value && value[0] === '全国') {
        // 清空所有选择的城市标签
        this.sel_tag = []
        // 清空下拉框
        this.cur_city = []
        return
      }
      this.sel_tag = this.sel_tag.map(o => {
        if (this.cur_city.join('/').indexOf(o) >= 0) {
          o = this.cur_city.join('/')
        }
        return o
      })
      var arr = this.sel_tag.filter(o => {
        return this.cur_city.join('/').indexOf(o) >= 0 || o.indexOf(this.cur_city.join('/')) >= 0
      })
      if (arr.length === 0) {
        this.sel_tag.push(this.cur_city.join('/'))
      }
      this.cur_city = []
    },
    // 去除/ 并将对应的省市区分组
    groupCityTag() {
      var temp = {}
      var ret = {
        province: [],
        city: [],
        district: []
      }
      this.sel_tag.forEach(o => {
        var province = o.split('/')[0]
        var city = o.split('/')[1]
        var district = o.split('/')[2]
        if (!temp[province]) {
          temp[province] = province
          ret.province.push(province)
        }
        if (city) {
          if (!temp[city]) {
            temp[city] = city
            ret.city.push(city)
          }
        }
        if (district) {
          if (!temp[district]) {
            temp[district] = district
            ret.district.push(district)
          }
        }
      })
      return ret
    },
    // 获取城市完整字典
    transform() {
      return JSON.parse(JSON.stringify(this.cityData))
    }
  },
  props: [
    'curCityTextArray',
    'dataBind',
    'oneRow',
    'id',
    'canEdit',
    'cityData',
    'customTransform',
    'customUpdate',
    'marketDate'
  ]
}
</script>
<style lang="scss">

</style>

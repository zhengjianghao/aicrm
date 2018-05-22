<template>
  <div>
    <div v-if="!oneRow">
      <el-row :gutter="20">
        <el-col :span="3">
          <p>地区：</p>
        </el-col>
        <el-col :span="21">
          <el-cascader placeholder="请选择地区" :options="city" change-on-select @change="handleChange" v-model="cur_city" :props="props">
          </el-cascader>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3"></el-col>
        <el-col :span="21" style="min-height: 30px; height: auto;">
          <el-tag style="margin-right: 5px;" v-for="tag in sel_tag" :key="tag" :closable="true" :close-transition="false" @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-tag v-if="!sel_tag || sel_tag.length === 0">全国</el-tag>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row :gutter="20">
        <el-col :span="18" class="text-left" style="height: auto;">
          <el-tag style="margin-right: 5px;" v-for="tag in sel_tag" :key="tag" :closable="true" :close-transition="false" @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-tag v-if="!sel_tag || sel_tag.length === 0">全国</el-tag>
        </el-col>
        <el-col :span="6" class="text-right" v-if="canEdit">
          <el-cascader class="el-input-sm-sm" placeholder="选择地区" :options="city" change-on-select @change="handleChange" v-model="cur_city" :props="props">
          </el-cascader>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import g_const from '../../misc/global.constant'
import { List, is } from 'immutable'
import allCity from './allCity'
export default {
  data() {
    return {
      g_const: g_const,
      city: allCity,
      sel_city: [],
      cur_city: [],
      sel_tag: [],
      cur_city_temp: [],
      props: {
        value: 'label'
      }
    }
  },
  mounted() {
    this.city = allCity
  },
  watch: {
    selCity(n, o) {
      if (this.isSame(n, o)) return
      this.sel_city = JSON.parse(JSON.stringify(this.selCity))
      var _sel_tag = this.getCityTag(this.sel_city.province, this.sel_city.city, this.sel_city.district)
      this.sel_tag = this.concatCityTag(_sel_tag)
    },
    sel_tag() {
      this.updataValue()
    }
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    updataValue() {
      var sycnObj = {
        bindCity: this.groupCityTag(this.sel_tag),
        city: this.groupCityTag(this.sel_tag)
      }
      if (this.dataBind) {
        this.$emit('sycnMethod', sycnObj)
      }
      if (this.oneRow) {
        this.$emit('sycnCity', sycnObj, this.id)
      }
      if (this.marketDate) {
        // 更新营销配置基本量
        this.updataBaseMConfig({
          city: sycnObj.bindCity,
        })
      }
    },
    concatCityTag(cityTag) {
      return cityTag.map(o => {
        var p = o.province
        var c = o.city ? '/' + o.city : ''
        var d = o.district ? '/' + o.district : ''
        return p + c + d
      })
    },
    isSame(n, o) {
      if(!o || !n && n !== o) return false
      return is(List(n.province), List(o.province)) && is(List(n.city), List(o.city)) && is(List(n.district), List(o.district))
    },
    getCityTag(_province, _city, _district) {
      if (!_province) return []
      // 存储整理好的省市区对应表，用于在tag中展示
      var ret = []
      // 遍历现存的省份
      _province.forEach(sel_p => {
        // var tag = {}
        var c_index = 0
        // 遍历全国省市列表
        this.city.forEach(p => {
          // 找到对应省份
          if (p.label === sel_p) {
            var tag_p ={}
            tag_p.province = sel_p
            // 遍历现存城市
            _city.forEach(sel_c => {
              // 遍历相应省份对应城市
              p.children.forEach(c => {
                // 在该省找到对应城市
                if (c.label === sel_c) {
                  var tag_c = {}
                  c_index++
                  tag_c.city = sel_c
                  var d_index = 0
                  // 遍历现存地区
                  _district.forEach(sel_d => {
                    c.children.forEach(a => {
                      // 在该市找到对应区域（省、市、区）
                      if (a.label === sel_d) {
                        var tag_d = {}
                        d_index++
                        // ret中push的对象不会被替换成一样的
                        tag_d.district = sel_d
                        var tag_pcd = Object.assign({}, tag_p, tag_c, tag_d)
                        ret.push(tag_pcd)
                      }
                    })
                  })
                  // 现存市不存在该区域（省、市）
                  if (d_index === 0) {
                    var tag_pc = Object.assign({}, tag_p, tag_c)
                    ret.push(tag_pc)
                  }
                }
              })
            })
            if (c_index === 0) {
              ret.push(tag_p)
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
    getName(code) {
      var ret = {}
      if (!this.city) return ret
      this.city.forEach(p => {
        if (p.value === code) {
          ret = {
            value: p.value,
            label: p.label
          }
          return false
        } else {
          p.children.forEach(c => {
            if (c.value === code) {
              ret = {
                value: c.value,
                label: c.label
              }
              return false
            } else {
              if (c.children) {
                c.children.forEach(a => {
                  if (a.value === code) {
                    ret = {
                      value: a.value,
                      label: a.label
                    }
                    return false
                  }
                })
              }
            }

          })
        }
      })
      return ret
    },
    // 获取城市完整字典
    transform() {
      var ret = []
      ret = allCity.map(p => {
        var _p = {
          value: p[0],
          label: p[1]
        }
        if (!p[2]) return _p
        _p.children = p[2].map(c => {
          var _c = {
            value: c[0],
            label: c[1]
          }
          if (c[2]) {
            _c.children = c[2].map(a => {
              var _a = {
                value: a[0],
                label: a[1]
              }
              return _a
            })
          }
          return _c
        })
        return _p
      })
      return ret
    }
  },
  props: [
    'selCity',
    'dataBind',
    'oneRow',
    'id',
    'canEdit',
    'marketDate'
  ]
}
</script>
<style lang="scss" scoped>

</style>

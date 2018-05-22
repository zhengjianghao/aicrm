<template>
  <div>
    <base-select-city :curCityTextArray="curCityTextArray" :customTransform="customTransform" @sycnCity="sycnCity" :customUpdate="customUpdate" :marketDate='marketDate' :dataBind="dataBind" :oneRow="oneRow" :id="id" :canEdit="canEdit" :cityData="cityData">
    </base-select-city>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import allCity from './allCity'

export default {
  data() {
    return {
      cityData: allCity
    }
  },
  mounted() {
    // this.cityData = this.transform()
  },
  watch: {

  },
  methods: {
    sycnCity(obj, id) {
      this.$emit('sycnCity', obj, id)
    },
    transform() {
      return allCity
    },
    // 转换数据，用于显示
    customTransform(selCity, allCity, cb) {
      // selCity 为非数组类型 直接返回空数组
      if (!(selCity instanceof Array)) return []
      var ret = {
        province: [],
        city: [],
        district: []
      }
      // 遍历选中的区域
      selCity.forEach(curCode => {
        // 遍历全国省、市、区
        allCity.forEach(p => {
          // 省份 / 全国
          // 保存匹配的省份名称
          if (curCode === p.value) {
            ret.province.push(p.label)
            return
          }
          if (p.children) {
            // 城市
            p.children.forEach(c => {
              // 保存匹配的省份名称
              if (curCode === c.value) {
                ret.province.push(p.label)
                ret.city.push(c.label)
                return
              }
              if (c.children) {
                // 地区
                c.children.forEach(a => {
                  // 保存匹配的省份名称
                  if (curCode === a.value) {
                    ret.province.push(p.label)
                    ret.city.push(c.label)
                    ret.district.push(a.label)
                    return
                  }
                })
              }
            })
          }
        })
      })
      return cb(ret.province, ret.city, ret.district)
    },
    // 转换数据,用于保存
    customUpdate(curTags, allCity) {
      var ret_tags = []
      curTags.forEach(o => {
        var cur_tag = ''
        var province = o.split('/')[0]
        var city = o.split('/')[1]
        var district = o.split('/')[2]
        if (!province) return
        allCity.forEach(p => {
          // 省份 / 全国
          // 保存匹配的省份名称
          if (province === p.label) {
            cur_tag = p.value
            if (!city) return
            if (p.children) {
              // 城市
              p.children.forEach(c => {
                // 保存匹配的省份名称
                if (city === c.label) {
                  cur_tag = c.value
                  if (!district) return
                  if (c.children) {
                    // 地区
                    c.children.forEach(a => {
                      // 保存匹配的省份名称
                      if (district === a.label) {
                        cur_tag = a.value
                      }
                    })
                  }
                }
              })
            }
          }
        })
        if (cur_tag) {
          ret_tags.push(cur_tag)
        }
      })
      return ret_tags
    }
  },
  props: [
    'curCityTextArray',
    'dataBind',
    'oneRow',
    'id',
    'canEdit',
    'marketDate'
  ]
}
</script>
<style lang="scss">

</style>

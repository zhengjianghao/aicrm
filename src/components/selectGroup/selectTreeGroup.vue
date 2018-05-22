<template>
  <div style="display:inline-block">
    <el-select v-model="mySelArray" placeholder="请选择" v-for="group in memberGroupData" v-if="group.name === groupName" :key="group.name">
      <template v-for="(value, key, index) in group.submenus">
        <el-option style="font-weight: bold;font-size:14px;" :label="key" :value="key" :key="key">
          <el-checkbox :checked="isCheck(value)">{{ key }}</el-checkbox>
        </el-option>
        <el-option style="padding-left:30px" v-for="subItem in value" :label="subItem.name" :value="subItem.id" :key="subItem.id">
          <el-checkbox :checked="isSubCheck(subItem.id)">{{ subItem.name }}</el-checkbox>
        </el-option>
      </template>
    </el-select>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      mySelArray: []
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'memberGroupData'
    ])
  },
  watch: {
    selArray() {
      this.mySelArray = [].concat(this.selArray)
    }
  },
  methods: {
    // ...mapActions(['updateActiveGoodsCategory']),
    isCheck(subList) {
      var k = 0
      var selObj = this.selArray
      var len = selObj.length
      subList.forEach(id => {
        for (var i = 0; i < len; i++) {
          if (id === selObj[i].id) {
            k++
            break
          }
        }
      })
      return len === k
    },
    isSubCheck(id) {
      var selObj = this.selArray
      var len = selObj.length
      var ret = false
      for (var i = 0; i < len; i++) {
        if (id === selObj[i].id) {
          ret = true
          break
        }
      }
      return ret
    }
  },
  props: ['groupName', 'selArray']
}
</script>
<style lang="scss">

</style>

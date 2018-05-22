<template>
  <div style="display:inline-block">
    <el-select placeholder="所有宝贝的分类" v-model="activeSelCategory" @visible-change="selGoodCategory(activeSelCategory, $event)" size="small">
      <template v-for="item in goodsCategory">
        <el-option :label="item.name" :value="item.cid" :key="item.cid" v-if="item.cid === 'all'" style="font-weight: bold;">
        </el-option>
        <el-option :label="item.name" :value="item.cid" :key="item.cid" v-if="item.parent_cid === 0" style="font-weight: bold;">
        </el-option>
        <el-option style="padding-left:30px" v-for="subItem in goodsCategory" v-if="subItem.parent_cid === item.cid" :label="subItem.name" :value="subItem.cid" :key="subItem.cid">
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
      activeSelCategory: 'all'
    }
  },
  mounted() {
    this.transformParam()
  },
  watch: {
    activeCategory() {
      this.transformParam()
    }
  },
  methods: {
    ...mapActions(['updateActiveGoodsCategory', 'updateActiveGoodsCategoryBounced']),
    selGoodCategory(val, e) {
      if(e === false) {
        var selVal = val
        selVal = this.goodsCategory.filter(o => {
          return o.cid === selVal
        })[0].parent_cid
        if (selVal === 0) {
          selVal = this.goodsCategory.filter(o => {
            return o.parent_cid === val
          }).map(o => {
            return o.cid
          })
        } else {
          selVal = [val]
        }
        if (this.DoubleEleven) {
          this.updateActiveGoodsCategoryBounced(selVal)
        }else{
          this.updateActiveGoodsCategory(selVal)
        }
      }
    },
    transformParam() {
      if (this.activeCategory === '' || this.activeCategory === 'all') {
        this.activeSelCategory = this.activeCategory
      }
    }
  },
  props: ['goodsCategory', 'activeCategory', 'DoubleEleven']
}
</script>
<style lang="scss">

</style>

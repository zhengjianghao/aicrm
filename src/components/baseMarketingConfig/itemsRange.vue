<template>
  <el-row :gutter="20">
      <el-col :span="3">
          <p>
            <el-tooltip :content='tooltipContent' placement="top-start" popper-class='tool_notes'  effect="dark">
              <i class="iconfont icon-help1 toolGanTanHao"></i>
            </el-tooltip>
            <span>{{ title ? title : name }}：</span>
          </p>
      </el-col>

       <el-col :span="2">
          <el-radio label="" v-model="items_range_label">所有宝贝</el-radio>
      </el-col>
      <el-col :span="5">
          <span @click="openPushItem('inBuyGoods', items_range.include)">
              <el-radio v-model="items_range_label" label="include">指定部分宝贝
                  <span class="info">(已选中{{ items_range.include ? items_range.include.length : 0 }}个宝贝)</span>
              </el-radio>
          </span>
      </el-col>
      <el-col :span="14">
          <span @click="openPushItem('outBuyGoods', items_range.exclude)">
              <el-radio v-model="items_range_label" label="exclude">排除部分宝贝
                  <span class="info">(已选中{{ items_range.exclude ? items_range.exclude.length : 0 }}个宝贝)</span>
              </el-radio>
          </span>
      </el-col>
  </el-row>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import g_const from '../../misc/global.constant'
  export default {
    data() {
      return {
        items_range_label: '',
        items_range: {
          include: [],
          exclude: []
        },
        g_const: g_const,
        name: '购买宝贝范围',
        first_load: false,
        tooltipContent: '如果选择了指定商品，那么只有买家拍下的订单中包含了指定商品的才会推送'
      }
    },
    watch: {
      items_range_label() {
        this.updataValue()
      },
      items_range() {
        this.updataValue()
      },
      itemsLabel() {
        this.items_range_label = this.itemsLabel
      },
      itemsValue() {
        this.items_range = this.itemsValue ? this.itemsValue : this.items_range
      },
      // 监听选择宝贝的变化，将选择的宝贝ids赋给相应的属性
      selectGoodsData() {
        var selGoodsData = this.selectGoodsData
        if(selGoodsData.eleName === 'inBuyGoods') {
            this.items_range.include = selGoodsData.selectGoods
        } else if(selGoodsData.eleName === 'outBuyGoods') {
            this.items_range.exclude = selGoodsData.selectGoods
        }
      }
    },
    computed: {
      ...mapGetters([
        'selectGoodsData'
      ])
    },
    mounted() {
      this.first_load = true
      this.items_range_label = this.itemsLabel ? this.itemsLabel : ''
    },
    methods: {
      ...mapActions([
        'updataBaseMConfig',
        'updateOpenModal',
        'updateSelectGoods'
        ]),
      updataValue() {
        if(this.first_load) {
          this.first_load = false
          return
        }
        if(this.dataBind) {
          var sycnObj = {
            items_range_label: this.items_range_label,
            items_range: this.items_range,
          }
          this.$emit('sycnMethod', sycnObj)
        } else {
          // 更新营销配置基本量
          this.updataBaseMConfig({
            items_range_label: this.items_range_label,
            items_range: this.items_range
          })
        }
      },
      openPushItem(eleName, selGoods) {
          this.updateOpenModal({
              name: this.g_const.openModalCodes.chooseGoods,
              isOpen: true
          })
          this.updateSelectGoods({
              selectGoods: selGoods,
              eleName: eleName
          })
      }
    },
    props: [
      'itemsLabel',
      'itemsValue',
      'title',
      'dataBind'
      ]
}
</script>
<style lang="scss">

</style>

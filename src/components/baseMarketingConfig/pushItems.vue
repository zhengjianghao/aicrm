<template>
  <el-row :gutter="20">
    <el-col :span="3">
      <p> {{ title }}：</p>
    </el-col>
    <el-col :span="7" v-if="!isAi">
      <el-radio v-model="items_label" label="">{{customAILabel}}</el-radio>
    </el-col>
    <el-col :span="8" v-else>
      <el-radio v-model="items_label" label="">
        <AI></AI>{{customAILabel}}</el-radio>
      <el-tooltip :content='tooltipContent' placement="top-start" popper-class='tool_notes' effect="dark">
        <i class="iconfont icon-help1 toolGanTanHao"></i>
      </el-tooltip>
    </el-col>
    <el-col :span="13">
      <span @click="openPushItem('pushGoods', items)">
        <el-radio label="custom" v-model="items_label">{{ customLabel }}
          <span class="info">(已选中{{ items.length }}个宝贝)</span>
        </el-radio>
      </span>
    </el-col>
  </el-row>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import g_const from '../../misc/global.constant'
export default {
  data() {
    return {
      items_label: '',
      items: '',
      g_const: g_const,
      tooltipContent: '根据每个会员的购买习惯以及店铺历史数据，并且区分高中低端买家，智能为每个会员推荐潜需宝贝'
    }
  },
  watch: {
    items_label() {
      this.updataValue()
    },
    items() {
      this.updataValue()
    },
    itemsLabel() {
      this.items_label = this.itemsLabel
    },
    itemsValue() {
      this.items = this.itemsValue
    },
    // 监听选择宝贝的变化，将选择的宝贝ids赋给相应的属性
    selectGoodsData() {
      var selGoodsData = this.selectGoodsData
      if (selGoodsData.eleName === 'pushGoods') {
        this.items = selGoodsData.selectGoods
      }
    }
  },
  computed: {
    ...mapGetters([
      'selectGoodsData'
    ])
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig',
      'updateOpenModal',
      'updateSelectGoods'
    ]),
    updataValue() {
      // 更新营销配置基本量
      this.updataBaseMConfig({
        items_label: this.items_label,
        items: this.items
      })
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
    'customLabel',
    'customAILabel',
    'isAi'
  ]
}
</script>
<style lang="scss">
</style>

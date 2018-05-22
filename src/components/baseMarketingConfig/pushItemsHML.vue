<template>
    <el-col :span="7">
        <span>
            <el-checkbox  v-model="items_label">{{ customLabel }}</el-checkbox>
            <span :class="items_label ? 'chooseGoods' : 'noChoose'" @click="items_label ? openPushItem(pushType, items) : ''">点击选择宝贝(已选宝贝{{ items.length }}件)</span>
        </span>
    </el-col>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import g_const from '../../misc/global.constant'
  export default {
    data() {
      return {
        items_label: '',
        items: '',
        g_const: g_const,
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
        if(selGoodsData.eleName === this.pushType) {
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
        if(this.pushType == 'high') {
          this.updataBaseMConfig({
            high_items_label: this.items_label,
            high_items: this.items
          })
        }else if(this.pushType == 'middle') {
          this.updataBaseMConfig({
            middle_items_label: this.items_label,
            middle_items: this.items
          })
        }else if(this.pushType == 'low') {
          this.updataBaseMConfig({
            low_items_label: this.items_label,
            low_items: this.items
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
      'customLabel',
      'pushType'
      ]
}
</script>
<style lang="scss" scoped>
  .chooseGoods {
    font-size: 12px;
    color: #0BB8F8;
    &:hover {
      cursor: pointer;
    }
  }
  .noChoose {
    font-size: 12px;
    color: #bbb;
    &:hover {
      cursor: not-allowed;
    }
  }

</style>

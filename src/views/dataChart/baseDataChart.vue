<template>
  <div>
    <div class="user_toolbox">
      <div class="toolbox_control" style="margin-bottom:10px;">
        <el-button-group>
          <el-button size="small" :class="vm.activeTabName === '3month' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('3month')">最近三个月</el-button>
          <el-button size="small" class="margin_left_tiny" :class="vm.activeTabName === '6month' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('6month')">最近半年</el-button>
          <el-button size="small" style="margin-left: 2px;" class="margin_left_tiny" :class="vm.activeTabName === '12month' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('12month')">最近一年</el-button>
          <el-button size="small" style="margin-left: 2px;" :class="vm.activeTabName === '36month' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('36month')">历史全部</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="user_tablelist" style="margin-left:0;margin-right:0;" v-loading="loading" element-loading-text="数据较多,请耐心等待">
      <slot name="chartTab">
        <el-row class="flex_box" type="flex">
          <el-col v-for="(item, index) in menuListData" :key="item.name" :span="24" class="m_col link" :class="curItem.name === item.name ? 'curTab' : ''">
            <div class="chartMenu" @click="updateRoute(item)">
              <img class="chartBg" :src="item.img" />
              <div class="m_title">
                {{ item.title }}
              </div>
              <div class="m_num">
                {{ item.value }}
                <span class="unit">{{ item.unit }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </slot>
    </div>
    <div>
      <slot name="mChart" :chartData="curItem">
      </slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { fromJS } from 'immutable'
export default {
  data() {
    return {
      vm: {
        activeTabName: '3month'
      },
      curItem: {
        name: 'ROI',
        data: {}
      },
      loading: false
    }
  },
  watch: {

  },
  mounted() {
  },
  methods: {
    updateRoute(item) {
      this.curItem = item
      var name = this.$route.query.name
      var fullPath = decodeURI(this.$route.fullPath).replace('name=' + name, item._title ? 'name=' + item._title : 'name=' + item.title)
      this.$router.push(
        fullPath
      )
    },
    // 切换图表
    switchChartTab(item) {
      this.curItem = item
    },
    // 切换月份
    switchTab(name) {
      if (this.showLoading) {
        this.showLoading()
      }
      this.vm.activeTabName = name
      setTimeout(() => {
        this.$emit('getAllChartImg', this.vm.activeTabName)
      }, 500)
    }
  },
  props: [
    'menuListData',
    'showLoading'
  ]
}
</script>
<style lang="scss" scoped>
@import '../../style/variable.scss';
$flex_border_color: #dce1e4;
.flex_box {
  border: 1px solid $flex_border_color;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
}

.m_col {
  border-right: 1px solid $flex_border_color;
  border-bottom: 1px solid $flex_border_color;
  height: 100px;
}

.curTab {
  border-bottom: 0; // border-bottom: 3px solid $primary;
}

.chartMenu {
  position: relative;
  .chartBg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .m_title {
    top: 10px;
    left: 10px;
    position: absolute;
    color: $menuColor;
    font-size: 13px;
  }
  .m_num {
    position: absolute;
    top: 32px;
    left: 50px;
    color: $primary;
    font-size: 23px;
  }
  .unit {
    font-size: 10px;
    color: $menuColor;
  }
  height: 100%;
}
</style>

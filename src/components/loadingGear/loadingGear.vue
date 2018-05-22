<template>
  <div>
    <div class="gearbox">
      <!--齿轮-->
      <div class="gear one">
        <div class="iconfont icon-chiluncogwheel23 icon-gear" :style="stopClass"></div>
      </div>
      <!--内弧-->
      <div class="gear arc-in" :style="stopClass"></div>
      <!--外弧-->
      <div class="gear arc-out" :style="stopClass"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
export default {
  data() {
    return {
      stopStyle: {
        '-webkit-animation': 'initial'
      }
    }
  },
  computed: {
    stopClass() {
      return this.isStop ? this.stopStyle : ''
    },
  },
  props: [
    'isStop'
  ]
}
</script>
<style lang="scss" scoped>
@import './gear.css';
</style>

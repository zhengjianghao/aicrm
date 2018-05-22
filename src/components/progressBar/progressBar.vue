<template>
  <div class="progress">
    <div class="meter">
      <span class="progress orange" :style="getWidth(num, maxNum)"></span>
    </div>
    <span class="num">
      {{ num }}
    </span>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    getWidth(num, maxNum) {
      return 'width:' + (num / maxNum * 100) + '%'
    }
  },
  props: [
    'num',
    'maxNum'
  ]
}
</script>
<style lang="scss" scoped>
.orange {
  background-color: #ffce9c;
  background-image: -moz-linear-gradient(left, rgba(253, 184, 135, 0.21), #f99f50);
  background-image: -webkit-linear-gradient(left, rgba(253, 184, 135, 0.21), #f99f50);
}

.progress {
  position: relative;
}

.meter {
  margin-left: 35px;
  height: 15px;
  position: relative;
}

.progress {
  display: block;
  height: 100%;
  border-radius: 8px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  position: relative;
  overflow: hidden;
}

.num {
  position: absolute;
  top: 1px;
  left: 0;
}
</style>

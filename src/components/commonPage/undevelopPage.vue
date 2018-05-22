<template>
  <div class="undevelopPage" :style="u_style">
    <img class="undevelopPage_img" src="../../assets/images/unDevelop.jpg">
  </div>
</template>
<script type="text/ecmascript-6" scoped>
export default {
    data() {
      return {
        u_style: {}
      }
    },
    mounted() {
      var h = document.body.clientHeight - 293
      this.u_style = {
        height: h + 'px'
      }

    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.undevelopPage {
  position: relative;
}
.undevelopPage_img {
  width: 520px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>

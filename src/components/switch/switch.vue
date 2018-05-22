<template>
  <div>
    <div class="switch-out" :class="initValue.type === 'change_market' ? 'change_market' : ''" @click="switchState()">
      <span class="text_on">{{initValue.type === 'change_market' ? '拍下就营销' : 'ON'}}</span>
      <span class="text_off">{{initValue.type === 'change_market' ? '付款再营销' : 'OFF'}}</span>
      <div class="switch text-center" :class="{true: 'on', false: 'off'}[initValue.state]">
        {{ initValue.state == true ? _onText : _offText}}
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import g_const from '../../misc/global.constant'
import utils from '../../misc/utils'
export default {
  computed: {
    _onText() {
      return (!this.onText ? '已开启' : this.onText)
    },
    _offText() {
      return (!this.offText ? '已关闭' : this.offText)
    }
  },
  props: [
    'initValue',
    'onText',
    'offText'
  ],
  methods: {
    ...mapActions([
      'updateSwitchState',
      'doMarketTask',
      'getMarketingJob'
    ]),
    switchState() {
      if (this.initValue.type != 'change_market') {
        this.initValue.state = !this.initValue.state
      }
      this.$emit('change', this.initValue)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variable.scss';
.switch-out {
  height: 46px;
  width: 130px;
  position: relative;
  background-color: #1e1e24;
  border: 1px solid #44494F;
  border-radius: 30px;
  cursor: pointer;
  line-height: 46px;
  text-align: right;
  color: #4F4F51;
  font-size: $titleFontSize;
  font-weight: bold;
}

.switch-out .switch {
  height: 46px;
  width: 80px;
  border-radius: 30px;
  position: absolute;
  top: -1px;
  left: 49px;
  background: gray;
  color: #4F4F51;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  margin-top: 1px;
}

.switch-out .switch.on {
  left: -1px;
  text-align: center;
  background: -webkit-linear-gradient(left, #00E4FF 0%, #00BBFF 100%);
  background: linear-gradient(to right, #00E4FF 0%, #00BBFF 100%);
  color: #fff;
}

.switch-out .switch.off {
  left: 49px;
  text-align: center;
}

.switch-out.change_market {
  width: 185px;
  .switch {
    width: 95px;
    background: -webkit-linear-gradient(left, #00E4FF 0%, #00BBFF 100%);
    background: linear-gradient(to right, #00E4FF 0%, #00BBFF 100%);
    color: #fff;
    text-align: center;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }
  .switch.on {
    left: -1px;
  }
  .switch.off {
    left: 90px;
  }
  .text_on {
    position: absolute;
    font-size: 14px;
    left: 12px;
  }

  .text_off {
    position: absolute;
    font-size: 14px;
    right: 12px;
  }
}

.text_on {
  position: absolute;
  font-size: 14px;
  left: 15px;
}

.text_off {
  position: absolute;
  font-size: 14px;
  right: 10px;
}
</style>

<template>
  <div>
      <base-marketing-config
        :hideBtn='true'
        :service="service"
        :marketingType="g_const.marketTemplateType.POTENTIAL_P4P_SYS"
        :updateSidebar="getHomePageSidebar"
      >
        <template slot="baseConfig" scope="props">
          <div class="config_loading">
            <loading-gear :isStop="deductionRule.name ? baseMCommonData.status == 'OPEN' ? false : true : true" class="config_loading_gear"></loading-gear>
          </div>
        </template>
    </base-marketing-config>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import service from '../pon.service'
import loadingGear from 'components/loadingGear/loadingGear'
import globalConstant from '../../../../misc/global.constant'
export default {
  data() {
    return {
      service: service,
      g_const: globalConstant,
      // isStop: true
    }
  },
  mounted() {
    // this.doStop(false)
  },
  computed: {
    ...mapGetters([
      'baseMCommonData',
      'deductionRule'
    ])
  },
  methods: {
    ...mapActions([
      'getHomePageSidebar',
    ]),
    // doStop(_isStop) {
    //   this.isStop = _isStop
    // }
  },
  components: {
    loadingGear
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../style/mixin.scss';
.config_loading {
  background: url('../../../../assets/images/config_bg.jpg') no-repeat;
  background-size: auto 100%;
  height: 620px;
  margin-top: 5px;
  background-color: #2663a1;
  .config_loading_gear {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
}
</style>

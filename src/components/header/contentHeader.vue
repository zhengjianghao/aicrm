<template>
<div>
  <div class="title">
    <div class="title_content" style="max-width: 850px">
        <div class="remind remind_custom">
          <h3 class="subTitleColor sub">
              <span class="iconfont icon-tasks icon_custom"></span>
              <div class="title_custom">
                <span :class="name.length === 0 ? 'el-icon-loading' : '' ">
                  {{name}} <span class="notes_custom">{{notes}}</span>
                </span>
                <slot name="modifyName" v-show="name.length !== 0" :title="name"></slot>
              </div>
          </h3>
          <div class="hint-main">
               <span class="Dad" v-show="!isSysMarketingjob">{{base}}</span><span>{{tip}}</span>
               <p class="Dad" style="margin-top: 4px">{{remind}}</p>
          </div>
        </div>
    </div>
    <div class="switch-wraper">
      <slot name="toolBox" :title="name"></slot>
    </div>
  </div>
</div>

</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'isSysMarketingjob'
      ])
    },
    props: [
      'name',
      'base',
      'tip',
      'remind',
      'notes'
      ]
}
</script>
<style lang="scss" scoped>
.remind_custom {
  .sub {
    height: 22px;
    line-height: 22px;
    position: relative;
  }
  .icon_custom {
    position: absolute;
    left: 0;
    top: 0;
  }
  .title_custom {
    position: absolute;
    left: 22px;
    top: 0;
    .notes_custom {
      font-size: 12px;
      color: #9a9a9a;
    }
  }
}

</style>

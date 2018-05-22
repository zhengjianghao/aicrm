<template>
  <div class="container">
    <div class="top">
      <i class="iconfont iconfont icon-message VU-icon"></i>
      <p class="boxTitle">{{updateData.title.boxTitle}}</p>
      <i class="el-icon-close iconClose" @click="hideBox"></i>
    </div>
    <div class="bottom">
      <div>
        <div v-if='updateData.scene != undefined'>
          <p class="mtitle">{{updateData.scene.title}}</p>
          <p class="mcontent" v-for="(value,index) in updateData.scene.content" :key="index">
            {{index + 1}}）{{value.name}}
            <a @click="go(value)">【点击订购】</a>
          </p>
        </div>
        <template v-if="updateData.description != undefined">
          <div v-for="(value1,index1) in updateData.description" :key="index1">
            <p class="mtitle" v-if="value1.title">{{value1.title}}</p>
            <p class="mcontent" v-for="(value2,index2) in value1.content" :key="index2">
              {{index2 + 1}}）{{value2}}
              <!--<a v-if="value2 == '新增速发短信功能'" @click="openModal(gbConst.quickSendMessage)">【点击查看】</a>-->
            </p>
          </div>
        </template>
        <template v-if="updateData.notice != undefined">
          <div v-for="(value1,index1) in updateData.notice" :key="index1">
            <p class="mtitle" v-if="value1.title">{{value1.title}}</p>
            <p class="_notice" v-for="(value2,index2) in value1.content" :key="index2">
              {{value2}}
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
// import g_const from 'src/misc/global.constant'
export default {
  data() {
    return {
      // g_const: g_const,
    }
  },
  computed: {
    ...mapGetters([
      'marketJob',
      // 'menuState'
    ]),
    // gbConst() {
    // return g_const.openModalCodes
    // }
  },
  methods: {
    ...mapActions([
      'showVersionUpdate',
      'updateOpenModal'
    ]),
    //版本更新跳转
    go(value) {
      var {type: curType, path: curPath, f_name} = value
      // let that = this
      // for (let i = 0; i < that.marketJob.length; i++) {
      //   if (that.marketJob[i].type === curType) {
      //     let item = {
      //       id: that.marketJob[i].id,
      //       path: curPath,
      //       type: that.marketJob[i].type
      //     }
      //     that.goto(item)
      //     break
      //   }
      // }
      this.openModal('buyMarketingJob', f_name)
    },
    goto(item) {
      this.$router.push({
        path: item.path,
        query: this.getParam(item)
      })
    },
    getParam(item) {
      // var menuCode = this.menuState
      var paramObj = {
        id: item.id
      }
      if (item.type) {
        paramObj.taskType = item.type
      }
      return paramObj
    },
    hideBox() {
      this.showVersionUpdate(0)
    },
    openBox() {

    },
    openModal(code, state) {
      this.updateOpenModal({
        name: code,
        param: {
          f_name: state ? state : ''
        }
      })
    },
  },
  props: [
    'updateData'
  ]
}
</script>

<style lang="scss" scoped>

</style>

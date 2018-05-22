<template>
<div style="display: inline-block;">
  <div class="toolbox_control toolbox_search" :style="searchStyle">
    <el-input size="small" v-model="search_word" @change="search('noSearch')" :placeholder="myPlaceholder">
        <el-button slot="append" icon="search" @click="search()"></el-button>
    </el-input>
  </div>
  <a class="link link_underline empty" v-if="showClearLink?true:false" @click="clearAllParam">清空</a>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        search_word: '',
        is_search: ''
      }
    },
    created() {
        this.init()
    },
    mounted() {
      var el = this.$el.firstChild.firstChild.children[0]
      var that = this
      el.onkeyup = function(event) {
        event = event || window.event
        if(event.keyCode === 13) {
          that.search()
        }
      }
      this.init()
    },
    watch: {
      $route() {
          this.init()
      }
    },
    methods: {
      init() {
        this.search_word = ''
      },
      clearAllParam() {
        this.search_word = ''
        this.search()
      },
      search(value) {
        var _value = {}
        _value.search_word = this.search_word
        _value.is_search = value ? value : this.is_search // 判断是否需要搜索，只是关键字改变不用搜索
        this.$emit('doSearch', _value)
      }
    },
    props: [
      'myPlaceholder',
      'showClearLink',
      'searchStyle'
    ]
}
</script>
<style lang="scss" scoped>
.empty {
    display: inline-block;
    margin: 16px;
}
</style>

<template>
<div style="display: inline-block;">
  <div class="toolbox_control toolbox_search" :style="searchStyle">
    <el-input size="small" v-model="search_word" @change="search('nosearch')" :placeholder="myPlaceholder">
        <el-button slot="append" icon="search" @click="search()"></el-button>
    </el-input>
  </div>
  <slot name="clear" :clearAllParam="clearAllParamNoSearch">
    <a class="link link_underline empty" v-if="showClearLink?true:false" @click="clearAllParam">清空</a>
  </slot>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        search_word: '',
        search_word_save: '',
      }
    },
    created() {
        this.init()
    },
    mounted() {
      var el = this.$el.firstChild.firstChild.children[0]
      var that = this
      this.init()
    },
    watch: {
      searchWord() {
        this.search_word = this.searchWord
      },
      $route() {
          this.init()
      },
    },
    methods: {
      init() {
        this.search_word = ''
        this.search_word_save = ''
      },
      clearAllParamNoSearch() {
        this.search_word = ''
        this.$emit('sycnSearchWord', this.search_word)
      },
      clearAllParam() {
        this.search_word = ''
        this.$emit('sycnSearchWord', this.search_word)
        this.searchByWord()
      },
      // sycnSearchWord() {
      //   this.$emit('sycnSearchWord', this.search_word)
      // },
      search(value) {
        //this.search_word = this.search_word_save
        this.$emit('sycnSearchWord', this.search_word)
        if(value != 'nosearch') {
          this.searchByWord()
        }
      }
    },
    props: [
      'myPlaceholder',
      'searchStyle',
      'searchByWord',
      'showClearLink',
      'searchWord'
    ]
}
</script>
<style lang="scss" scoped>
.empty {
    display: inline-block;
    margin: 16px;
}
</style>

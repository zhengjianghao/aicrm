<template>
   <span :class="getType">{{name}}</span>
</template>
<script type="text/ecmascript-6" scoped>
  export default {
    computed: {
      getType() {
        if(!this.type) {
          return 'group_tag_black'
        }
        if(this.type === 'black') {
          return 'group_tag_black'
        }
        if(this.type === 'grey') {
          return 'group_tag_grey'
        }
      }

    },
    props: [
      'name',
      'type'
    ]
  }
</script>
<style lang="scss" scoped>
  .group_tag {
    border-radius: 3px;
    padding: 4px;
    color: #ffffff;
    font-size: 13px;
    padding: 2px 4px 2px 4px;
    display: inline-block;
  }
  .group_tag_black {
      @extend .group_tag;
      background-color: #101010;
  }
  .group_tag_grey {
      @extend .group_tag;
      background-color: #C0C0C0;
  }

</style>

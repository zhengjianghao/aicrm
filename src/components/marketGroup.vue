<template>
<div class="set_content">
    <el-form :model="taskForm"  label-width="100px">
      <el-form-item label="添加促销方式：" prop="taskName">
        <el-col :span="20">
          <el-select v-model="PromotionType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value"
                :key="item.value"
                >
              </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item class="text-right">
        <el-button type="primary" @click="save">确定</el-button>
        <el-button @click="close">关闭</el-button>
      </el-form-item>
    </el-form>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../misc/global.constant'
  export default {
    data() {
      return {
         taskForm: {
          taskName: '',
        },
        taskId: '',
        options: '',
        PromotionType: '',
        memberGroup: ''
      }
    },
    watch: {
        memberListData() {
            this.memberGroup = this.memberListData
        }
    },
    mounted() {
        this.memberGroup = this.memberListData
    },
    computed: {
      ...mapGetters(['openModalState','memberListData'])
    },
    methods: {
       ...mapActions(['closeModal', 'doSaveAs']),
       save() {
            this.close()
       },
       close() {
           this.closeModal('marketGroup')
       }
    },
    components: {
    }
}
</script>
<style lang="scss" scoped>
  .set_content {
    font-size: 12px;
    margin: 18px;
    .el-form {
      margin-left: 10px;
    }
  }

</style>

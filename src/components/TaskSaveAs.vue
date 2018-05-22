<template>
<div class="set_content">
    <el-form :model="taskForm" :rules="rules" ref="taskForm" label-width="100px">
      <el-form-item label="任务名称：" prop="taskName">
        <el-col :span="20">
          <el-input v-model="taskForm.taskName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label=""  class="text-right">
          <el-checkbox label="立即开启" v-model="taskForm.open"></el-checkbox>
      </el-form-item>
      <el-form-item class="text-right">
        <el-button type="primary" :disabled='saveDisabled'  @click="submitForm('taskForm')">保存</el-button>
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
          open: false
        },
        taskId: '',
        saveDisabled: false,
        rules: {
          taskName: [
            { required: true, message: '任务名称不能为空', trigger: 'blur' },
            { max: 100, message: '长度在必须小于100个字符', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.init()
    },
    computed: {
      ...mapGetters(['openModalState','repeatClickState'])
    },
    watch: {
      openModalState() {
        if (this.openModalState.name === 'saveAs') {
          this.init()
        }
      }
    },
    methods: {
       ...mapActions(['closeModal', 'doSaveAs', 'repeatClick']),
      submitForm(formName) {
        var that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //防止重复点击
            // this.repeatClick()
            that.saveDisabled = true
            this.doSaveAs({
              name: this.taskForm.taskName,
              open: this.taskForm.open
            }).then(() => {
              that.saveDisabled = false
            })
            // setTimeout(function() {
            //     that.repeatClick()
            // }, 1500);
            this.closeModal('saveAs')
          } else {
            return false;
          }
        })
      },
      init() {
        if(this.openModalState.param) {
          this.taskForm.taskName = '' + this.openModalState.param.taskName
          this.taskForm.open = false
        }
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

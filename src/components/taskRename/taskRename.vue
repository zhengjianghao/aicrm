<template>
<div class="set_content">
    <el-form :model="taskForm" :rules="rules" ref="taskForm" label-width="100px">
      <el-form-item label="任务名称：" prop="taskName">
        <el-col :span="20">
          <el-input v-model="taskForm.taskName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="text-right">
        <el-button type="primary" @click="submitForm('taskForm')">保存</el-button>
      </el-form-item>
    </el-form>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import API_MARKET from '../../service/marketing.service'
  import utils from '../../misc/utils'
  export default {
    data() {
      return {
        taskForm: {
          taskName: ''
        },
        taskId: '',
        rules: {
          taskName: [
            { required: true, message: '任务名称不能为空', trigger: 'blur' },
            { max: 100, message: '长度在必须小于100个字符', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      openModalState() {
        if (this.openModalState.name === 'editMarketingName') {
          this.init()
        }
      }
    },
    mounted() {
      this.init()
    },
    computed: {
      ...mapGetters([
        'openModalState',
        'baseMCommonData',
        'baseMConfigOriginalData'
      ])
    },
    methods: {
      ...mapActions([
        'closeModal',
        'getMarketingJob',
        'updataBaseMCommon'
      ]),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.rename()
              this.closeModal('rename')
          } else {
            return false;
          }
        })
      },
      // 营销任务重命名
      rename() {
        var cData = this.baseMCommonData
        API_MARKET.rename(cData.id, {
          title: this.taskForm.taskName,
          start_time: cData.start_time,
          end_time: cData.end_time,
          filter_option: this.baseMConfigOriginalData
        }).then(o => {
          // 更新标题栏
          this.updataBaseMCommon(o)
          // 刷新营销列表
          this.getMarketingJob()
          utils.showSuccessMsg(this, '名称修改成功')
        })
      },
      init() {
        if(this.openModalState.param) {
          this.taskForm.taskName = '' + this.openModalState.param.taskName
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

<template>
    <div class="target_mul_box">
        <el-popover @hide="groupHideHandle" @show="groupShowHandle" ref="selectMul" placement="bottom" width="200" trigger="click">
          <el-tree v-if="isRenderTree" :data="kdjMulDate" show-checkbox node-key="id" :default-checked-keys="checkList" :accordion="true" :props="defaultProps" @check-change="checkGroupChange" ref="kdjCheck">
          </el-tree>
        </el-popover>
        <el-input placeholder="请选择分组" v-popover:selectMul class="linkInput" readonly v-model="select_date">
            <template slot="append">
                <span class="iconfont icon-treeMenu"></span>
            </template>
        </el-input>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
    import { mapGetters, mapActions } from 'vuex'
    import utils from '../../misc/utils'
    export default {
        data() {
            return {
                select_date: '',
                isRenderTree: false, // 是否开始渲染el-tree
                defaultProps: {
                    label: 'label',
                    children: 'children'
                },
                kdjMulDate: [
                    {
                        id: 'all',
                        label: '不限制'
                    }, {
                        id: 'highGuest',
                        label: '高客单价客户'
                    }, {
                        label: '中客单价客户',
                        id: 'midGuest'
                    }, {
                        label: '低客单价客户',
                        id: 'lowGuest'
                    }
                ],
                memberDate: [],
                check_list: [],
                check_list_name: [],
                oldCheck: ''
            }
        },
        computed: {
            ...mapGetters([
            ]),
        },
        mounted() {
            this.init()
        },
        watch: {
            checkList() {
                this.init()
            },
            check_list() {
                this.updateValue()
            },
        },
        methods: {
            ...mapActions([
            'updataBaseMConfig',
            ]),
            // 更新选中的分组id、分组名称
            init() {
                // 卸载el-tree
                this.isRenderTree = false
                this.check_list = this.checkList ? this.checkList : []
                // 获取选中的分组名称
                this.check_list_name = utils.getGroupTextByIds(this.kdjMulDate, this.check_list)
                this.changeText()
            },
            changeText() {
                if (this.check_list_name.length >= 2) {
                    this.select_date = this.check_list_name[0] + ',' + this.check_list_name[1]
                } else if (this.check_list_name.length == 1) {
                    this.select_date = this.check_list_name[0]
                } else {
                    this.select_date = ''
                }
                if (this.select_date.length > 9) {
                    this.select_date = this.select_date.substr(0, 9) + '...'
                } else if (this.check_list_name.length > 2) {
                    this.select_date = this.select_date + '...'
                }
            },
            // 分组弹框关闭事件
            groupHideHandle() {
                this.check_list = this.$refs.kdjCheck.getCheckedKeys()
                this.check_list_name = this.$refs.kdjCheck.getCheckedNodes().filter((o, index) => {
                    return o.id && index < 8
                }).map(k => {
                    return k.label
                })
                this.changeText()
            },
            // 分组弹框打开事件
            groupShowHandle() {
                // 开始渲染el-tree组件
                if(!this.isRenderTree) {
                    this.isRenderTree = true
                }
            },
            // 监听el-tree选中分组的改变
            // 1.全不选时则自动选中不限
            // 2.选中不限则取消其它项的选中
            // 3.取消选中不限则选中其它任意一项
            checkGroupChange(data, isChecked) {
                if (!data.id) return
                // 获取当前选中ids
                var groupIds = this.$refs.kdjCheck.getCheckedKeys()
                var unlimited_id = 'all'
                var high_id = 'highGuest'
                if(data.id === unlimited_id && isChecked) { // 1.用户选中不限
                    groupIds = [unlimited_id]
                } else if(data.id === unlimited_id && !isChecked && groupIds.length === 0) { // 2.用户取消选中不限，且此时一个都没选中，则选中高客单价
                    groupIds = [high_id]
                } else if(data.id !== unlimited_id && isChecked) { // 3.用户选中其它（非不限）
                    // 取消选中不限（id==all）
                    groupIds = groupIds.filter(_id => {
                        return _id !== unlimited_id
                    })
                } else if(data.id !== unlimited_id && !isChecked) { // 4.用户取消选中其它（非不限）
                    if(groupIds.length === 0) { // 用户取消选中且此时一个也没选中，则选中不限
                        groupIds = [unlimited_id]
                    }
                }
                // 重新设置选中的项
                this.$refs.kdjCheck.setCheckedKeys(groupIds)
            },
            updateValue() {
                // 更新营销配置基本量
                var _date = this.allDate
                _date[this.isindex].guest_limit = this.check_list
                this.updataBaseMConfig({
                    stairs: _date
                })
            }
        },
        props: ['checkList','isindex','allDate']
    }
</script>
<style lang="scss" scoped>
.target_mul_box{
  display: inline-block;
  width: 200px;
}
.el-checkbox{
    display: block;
    width: 188px;
    padding: 5px;
    margin: 0;
}
.el-checkbox-group{
  .el-checkbox{
    width: 188px;
    padding: 5px;
    margin: 0;
  }
}
.el-checkbox:hover {
    background-color: #e4eaf1;
}
.popover_check_box {
    border: 1px solid #d1dee5;
}
</style>

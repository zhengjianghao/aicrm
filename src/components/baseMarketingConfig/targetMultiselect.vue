<template>
    <div class="target_mul_box">
        <el-popover @hide="groupHideHandle" @show="groupShowHandle" :disabled="isDisabled == undefined ? false : isDisabled" ref="selectMul" placement="bottom" width="200" trigger="click">
          <el-tree v-if="isRenderTree" :data="calMemberGroupTreeDate" show-checkbox node-key="id" :default-checked-keys="checkList" :accordion="true" :props="defaultProps" ref="treeAi">
          </el-tree>
        </el-popover>
        <el-tooltip
        class="item"
        effect="dark"
        :manual="true"
        :value='memberId.indexOf(isindex) >=0 && (isDisabled == undefined ? false : !isDisabled)'
        :content="memberContent.length >0 ? memberId.indexOf(isindex) >=0 ? memberContent[memberId.indexOf(isindex)] : '' : ''"
        placement="top">
            <el-input placeholder="请选择分组" :disabled="isDisabled == undefined ? false : isDisabled" v-popover:selectMul class="linkInput" readonly v-model="select_date">
                <template slot="append">
                    <span class="iconfont icon-treeMenu"></span>
                </template>
            </el-input>
        </el-tooltip>
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
                    children: 'children',
                    label: 'label'
                },
                memberDate: [],
                check_list: [],
                check_list_name: [],
                memberId: [],
                memberContent: []
            }
        },
        computed: {
            ...mapGetters([
                'memberGroupTreeData',
                'subState',
                'calMemberGroupTreeDate'
            ]),
            isSubState() {
                if (this.subState == 'resultData' || this.subState == 'resultDetail' || this.subState == 'pushRecord' || this.subState == 'unsubscribeRecord' || this.subState == 'qianniuTask') {
                    return false
                } else {
                    return true
                }
            }
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
            }
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
                this.check_list_name = utils.getGroupTextByIds(this.calMemberGroupTreeDate, this.check_list)
                this.changeText()
            },
            // 分组弹框关闭事件
            groupHideHandle() {
                this.check_list = this.$refs.treeAi.getCheckedKeys()
                this.check_list_name = this.$refs.treeAi.getCheckedNodes().filter((o, index) => {
                    return o.id && index < 8
                }).map(k => {
                    return k.label
                })
                this.changeText()
                this.checkMember(this.check_list, this.isindex)
            },
            //  分组弹框打开事件
            groupShowHandle() {
                // 开始渲染el-tree组件
                if(!this.isRenderTree) {
                    this.isRenderTree = true
                }
            },
            // 更新选中的分组名称
            changeText() {
                if (this.check_list_name.length >= 2) {
                    this.select_date = this.check_list_name[0] + ',' + this.check_list_name[1]
                } else if (this.check_list_name.length == 1) {
                    this.select_date = this.check_list_name[0]
                } else {
                    this.select_date = ''
                }
                if (this.select_date.length > 12) {
                    this.select_date = this.select_date.substr(0, 12) + '...'
                } else if (this.check_list_name.length > 2) {
                    this.select_date = this.select_date + '...'
                }
            },
            // 将数据的变动更新到vuex
            updateValue() {
                //是否是双11场景中 还是速发短信中
                if(this.allDate) {
                    // 更新营销配置基本量
                    var _date = this.allDate
                    _date[this.isindex].target_member = this.check_list
                    this.updataBaseMConfig({
                        stairs: _date
                    })
                }else {
                    this.changeMember(this.check_list)
                }
            },
            // 验证分组是否为空，为空则在保存的时候给出提示信息
            checkMember(value, id) {
                var that = this
                if(value.length == 0) {
                    if(that.memberId.indexOf(id) < 0){
                    that.memberId.push(id)
                    that.memberContent.push('请选择分组')
                    }else{
                    that.memberContent[that.memberId.indexOf(id)] = '请选择分组'
                    }
                }else{
                    if(that.memberId.indexOf(id) >= 0) {
                        that.memberContent.splice(that.memberId.indexOf(id), 1)
                        that.memberId.splice(that.memberId.indexOf(id), 1)
                    }
                }
                return this.memberId.length == 0
            }
        },
        props: ['selectDate', 'checkList', 'isindex', 'allDate', 'isSendShow', 'changeMember', 'isDisabled']
    }
</script>
<style lang="scss" scoped>
.target_mul_box {
  display: inline-block;
  width: 200px;
}
.iconfont {
    font-size: 12px;
}
.el-checkbox-group {
  border: 1px solid #d1dee5;
  .el-checkbox{
    width: 188px;
    padding: 5px;
    margin: 0;
  }
  .el-checkbox:hover {
    background-color: #e4eaf1;
  }
}
</style>

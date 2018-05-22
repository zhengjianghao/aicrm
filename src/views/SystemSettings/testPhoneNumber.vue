<template>
    <div class="testPhone_content">
        <div class="user_toolbox">
            <div class="toolbox_control">
                <el-button-group>
                    <el-button size="small" :class="vm.activeTabName === constTestPhoneNum ? 'toolbox_active' : 'toolbox_default'" @click="switchTab(constTestPhoneNum)">单个手机号</el-button>
                    <el-button size="small" class="margin_left_tiny" :class="vm.activeTabName === constTestNumGroup ? 'toolbox_active' : 'toolbox_default'" @click="switchTab(constTestNumGroup)">测试组</el-button>
                </el-button-group>
            </div>
            <div class="addTest pull-right">
                <a class="addLink link primary" @click="isAdd = true" v-show="!isAdd && vm.activeTabName === constTestPhoneNum">
                    <i class="el-icon-plus"></i>添加测试账号</a>
                <a class="addLink link primary" @click="isAdd = true" v-show="!isAdd && vm.activeTabName === constTestNumGroup">
                    <i class="el-icon-plus"></i>添加测试组账号</a>
                <div v-show="isAdd&&vm.activeTabName === constTestPhoneNum" class="toolbox_control">
                    <el-input placeholder="名称" style="width:100px;" v-model="contactName"></el-input>
                    <el-input placeholder="手机号" style="width:118px;" v-model="contactMobile"></el-input>
                    <el-button type="primary" @click="doAddContact" size="small">保存</el-button>
                    <a class="link_underline" @click="cancel()">取消</a>
                </div>
                <div v-show="isAdd&&vm.activeTabName === constTestNumGroup" class="toolbox_control">
                    <el-input placeholder="测试组名称" style="width:118px;" v-model="contactGroupName"></el-input>
                    <el-button type="primary" size="small" @click="doAddContactGroup">保存</el-button>
                    <a class="link_underline" @click="cancel()">取消</a>
                </div>
            </div>
        </div>
        <div class="user_tablelist" v-if="vm.activeTabName === constTestPhoneNum">
            <phone-test :active="vm.activeTabName"></phone-test>
        </div>
        <div class="user_tablelist" v-else-if="vm.activeTabName === constTestNumGroup">
            <phone-group-test :active="vm.activeTabName"></phone-group-test>
        </div>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import phoneTest from '../../components/messageTest/phoneTest'
import phoneGroupTest from '../../components/messageTest/phoneGroupTest'
import pagination from '../../misc/pagination'
import utils from '../../misc/utils'
export default {
    data() {
        return {
            vm: {
                activeTabName: ''
            },
            constTestPhoneNum: 'testPhoneNum',
            constTestNumGroup: 'testNumGroup',
            isAdd: false,
            contactName: '',
            contactGroupName: '',
            contactMobile: '',
            contactGroupName: '',
            pagination: pagination,
            utils: utils

        }
    },
    watch: {
        openModalState() {
            if (!this.openModalState.param) {
                return
            } else if (this.openModalState.param.state == "testPhoneNum" || this.openModalState.param.state == "testNumGroup") {
                this.switchTab(this.openModalState.param.state)
            } else {
                this.switchTab(this.constTestPhoneNum)
            }
        },
        subState() {
            if (this.subState === 'testPhoneNumber' && !this.openModalState.param.state) {
                this.switchTab(this.constTestPhoneNum)
            }
        }
    },
    mounted() {
        if (!this.openModalState.param) {
            return
        } else if (this.openModalState.param.state == "testPhoneNum" || this.openModalState.param.state == "testNumGroup") {
            this.switchTab(this.openModalState.param.state)
        } else {
            this.switchTab(this.constTestPhoneNum)
        }
    },
    computed: {
        ...mapGetters(['openModalState', 'subState', 'contactListData', 'contactGroupListData'])
    },
    methods: {
        ...mapActions(['addContact', 'getContactList', 'addContactGroup', 'getContactGroupList']),
        switchTab(name) {
            this.vm.activeTabName = name
            this.isAdd = false
            this.clearSearchParam()
            // 重新获取数据
            if (name === this.constTestNumGroup) {
                // 单个手机号
                this.getContactGroupList(this.pagination)
            } else if (name === this.constTestPhoneNum) {
                // 测试组
                this.getContactList(this.pagination)
            }
        },
        doAddContact() {
            if (!this.contactName) {
                utils.showErrorMsg(this, '名称不能为空')
                return
            }
            // 存在相同名称则返回false
            var notExistName = this.contactListData.every(o => {
                return o.name !== this.contactName
            })
            if (!notExistName) {
                utils.showErrorMsg(this, '该名称已存在')
                return
            }
            if (!this.contactMobile) {
                this.$message({
                    message: '手机号不能为空',
                    customClass: 'message_position',
                    type: 'error'
                })
                return
            }
            if (!utils.phoneRex.test(this.contactMobile)) {
                utils.showErrorMsg(this, '手机号格式不正确')
                return
            }
            // 存在相同号码则返回false
            var notExist = this.contactListData.every(o => {
                return o.mobile !== this.contactMobile
            })
            if (!notExist) {
                utils.showErrorMsg(this, '该手机号已存在')
                return
            }
            this.addContact({
                name: this.contactName,
                mobile: this.contactMobile
            }).then(o => {
                this.getContactList(this.pagination).then(o => {
                    this.clearSearchParam()
                    utils.showSuccessMsg(this, '添加成功')
                })
            })
        },
        doAddContactGroup() {
            if (!this.contactGroupName) {
                utils.showErrorMsg(this, '名称不能为空')
                return
            }
            // 存在相同名称则返回false
            var notExistName = this.contactGroupListData.every(o => {
                return o.group_name !== this.contactGroupName
            })
            if (!notExistName) {
                utils.showErrorMsg(this, '该名称已存在')
                return
            }
            this.addContactGroup(this.contactGroupName).then(o => {
                this.getContactGroupList(this.pagination).then(o => {
                    this.clearSearchParam()
                    utils.showSuccessMsg(this, '添加成功')
                })

            })
        },
        clearSearchParam() {
            this.contactName = ''
            this.contactMobile = ''
            this.contactGroupName = ''
        },
        cancel() {
            this.isAdd = false
            this.clearSearchParam()
        },
    },
    components: {
        phoneTest,
        phoneGroupTest
    }
}
</script>
<style lang="scss" scoped>
.addTest {
    padding-right: 16px;
    font-size: 12px;
    .addLink {
        margin: 16px;
        display: block;
    }
}

.addTest i {
    margin-right: 10px;
}

.testPhone_content {
    overflow: auto;
}
</style>

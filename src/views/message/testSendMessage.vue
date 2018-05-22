<template>
    <div class="testsend_content">
        <div class="user_toolbox">
            <div class="toolbox_control">
                <el-button-group>
                    <el-button size="small" :class="vm.activeTabName === 'testPhoneNum' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('testPhoneNum')">单个手机号</el-button>
                    <el-button size="small" class="margin_left_tiny" :class="vm.activeTabName === 'testNumGroup' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('testNumGroup')">测试组</el-button>
                </el-button-group>
            </div>
            <div class="pull-right addTest link">
                <a @click="openModal(gbConst.systemConfig)" v-show="vm.activeTabName === 'testPhoneNum'">编辑短信测试号</a>
                <a @click="openModal(gbConst.systemConfig)" v-show="vm.activeTabName === 'testNumGroup'">编辑短信测试组</a>
            </div>
        </div>
        <div class="user_tablelist" v-loading="loading_p" element-loading-text="数据较多,请耐心等待" v-show="vm.activeTabName === 'testPhoneNum'">
            <el-table :data="contactListData" border max-height="435" @selection-change="selected" style="width: 100%">
                <el-table-column type="selection" align="center" prop="id" width="55">
                </el-table-column>
                <el-table-column prop="name" align="center" min-width='364' label="名称">
                </el-table-column>
                <el-table-column prop="mobile" align="center" min-width='364' label="手机号" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>
        <div class="user_tablelist" v-loading="loading_g" element-loading-text="数据较多,请耐心等待" v-show="vm.activeTabName === 'testNumGroup'">
            <el-table :data="contactGroupListData" border @selection-change="selected" max-height="435" style="width: 100%">
                <el-table-column type="selection" align="center" width="55">
                </el-table-column>
                <el-table-column prop="group_name" align="center" min-width="162" label="测试组名称">
                </el-table-column>
                <el-table-column align="center" prop="testNumber" min-width="566" label="人数">
                    <template scope="scope">
                        <span v-for="data in scope.row.contacts" slot="reference" class="name-wrapper MR" :key="data.name">
                            <el-tag>{{ data.name }}</el-tag>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pull-right send-test">
            <el-button type="primary" size="small" :loading="sendDisabled" @click="send">{{ btnSendText }}</el-button>
            <el-button size="small" @click="close">关闭</el-button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import utils from '../../misc/utils'
import pagination from '../../misc/pagination'
export default {
    data() {
        return {
            sendDisabled: false,
            btnSendText: '发送测试',
            pagination: pagination,
            multipleSelection: [],
            k_word: globalConstant.keyword_danger, //非法字符
            utils: utils,
            loading_p: false,
            loading_g: false,
            vm: {
                activeTabName: 'testPhoneNum'
            },
            isActived: false, // 组件是否被激活
            testMessage: '',
            _road: ''
        }
    },
    // 组件被激活
    activated() {
        this.isActived = true
        this.init()
    },
    // 组件转为非激活状态
    deactivated() {
        this.isActived = false
    },
    mounted() {
        this.isActived = true
        this.init()
    },
    computed: {
        ...mapGetters([
            'contactListData',
            'contactGroupListData',
            'baseMConfigData',
            'repeatClickState',
            'baseMCommonData',
            'openModalState',
            'userData',
            'maergeMessage',
            'quickSendMsgState',
            'marketJson'
        ]),
        gbConst() {
            return globalConstant.openModalCodes
        }
    },
    watch: {
        openModalState() {
            if (this.isActived) {
                if (this.openModalState.name === this.gbConst.testSendMessage) {
                    this.init()
                }
            }
        },
        contactListData() {
            if (this.isActived) {
                this.loading_p = false
            }
        },
        contactGroupListData() {
            if (this.isActived) {
                this.loading_g = false
            }
        },
    },
    methods: {
        ...mapActions([
            'updateOpenModal',
            'getContactGroupList',
            'getContactList',
            'closeModal',
            'testSend',
            'repeatClick'
        ]),
        init() {
            // 初始化，避免请求失败后一直是发送中，不能再次发送
            this.sendDisabled = false
            this.btnSendText = '发送测试'
            this.switchTab('testPhoneNum')
            var that =this
            if (this.openModalState.param.state == 'messageTemplate') {
                this.testMessage = that.baseMConfigData.message ? that.baseMConfigData.message : that.marketJson.message
            } else if (this.openModalState.param.state == 'messageTemplateT') {
               this.testMessage = that.baseMConfigData.send_message_user ? that.baseMConfigData.send_message_user : that.marketJson.send_message_user
            } else if (this.openModalState.param.state == 'messageTemplateP') {
                this.testMessage = that.baseMConfigData.sencod_remind_pay.msg_content ? that.baseMConfigData.sencod_remind_pay.msg_content : that.marketJson.sencod_remind_pay.msg_content
            } else if (this.openModalState.param.state == 'messageTemplateN') {
                this.testMessage = that.baseMConfigData.near_close_reminder.send_content ? that.baseMConfigData.near_close_reminder.send_content : that.marketJson.near_close_reminder.send_content
            } else if (this.openModalState.param.state == 'messageTemplateSend') {
                this.testMessage = that.maergeMessage
                this._road = this.openModalState.param.road
            }
        },
        openModal(code) {
            this.updateOpenModal({
                name: code,
                param: {
                    state: this.vm.activeTabName
                }
            })
        },
        switchTab(name) {
            this.vm.activeTabName = name
            if (name === 'testPhoneNum') {
                this.loading_p = true
                this.getContactList(this.pagination)
                // 清空选中的手机号
                this.multipleSelection = []
            } else if (name === 'testNumGroup') {
                this.loading_g = true
                this.getContactGroupList(this.pagination)
                // 清空选中的手机号（分组）
                this.multipleSelection = []
            }
        },
        close() {
            this.closeModal('testSendMessage');
        },
        // 发送测试短信
        send() {
            var phoneNum = []
            var that = this
            // 短信中不能存在非法字符（比如网站链接）
            var _error
            if(this.openModalState.param.state == 'messageTemplateSend') {
                _error = utils.hasKeywordDanger(that.maergeMessage, that.k_word, that)
            }else {
                _error = !utils.checkSendMsg(this.baseMConfigData, that)
            }
            if(_error) {
                return
            }
            // if (!utils.checkSendMsg(this.baseMConfigData, that)) {
            //     return
            // }
            // 必须选择手机号
            if (this.multipleSelection.length === 0) {
                utils.showErrorMsg(that, '请选择要发送的手机号!')
                return
            }
            if (this.multipleSelection.length > 0) {
                if (this.multipleSelection[0].hasOwnProperty("contactIds")) {
                    for (var i = 0; i < that.multipleSelection.length; i++) {
                        for (var j = 0; j < that.multipleSelection[i].contacts.length; j++) {
                            //判断已存在号码就不加入
                            //if(phoneNum.indexOf(that.multipleSelection[i].contacts[j].mobile) == -1) {
                            phoneNum = phoneNum.concat({
                                name: that.multipleSelection[i].contacts[j].name,
                                mobile: that.multipleSelection[i].contacts[j].mobile,
                            })
                            //   }
                        }
                    }
                    phoneNum = that.utils.arrayUnique(phoneNum, 'mobile')
                } else if (this.multipleSelection[0].hasOwnProperty("mobile")) {
                    for (i = 0; i < this.multipleSelection.length; i++) {
                        phoneNum.push({
                            name: that.multipleSelection[i].name,
                            mobile: that.multipleSelection[i].mobile,
                        })
                    }
                }
                var num = Math.ceil(this.testMessage.length / 70)
                this.sendDisabled = true
                this.btnSendText = '发送中...'
                this.testSend({
                    mobiles: phoneNum,
                    message: this.testMessage,
                    char_count: num,
                    job_id: this.quickSendMsgState.isOpen ? 0 : this.baseMCommonData.id,
                    message_road: this._road
                }).then(o => {
                    this.sendDisabled = false
                    this.btnSendText = '发送测试'
                    this.$message({
                        message: '短信发送成功',
                        customClass: 'message_position',
                        type: 'success'
                    })
                    this.close()
                })
            }
        },
        selected(val) {
            this.multipleSelection = val;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/variable.scss';

.el-table {
    font-size: $menuFontSize;
}

.addTest {
    font-size: $menuFontSize;
    a {
        color: $primary;
        text-decoration: underline;
    }
    margin: 16px;
}

.addTest i {
    margin-right: 10px;
}

.Edit {
    text-decoration: underline;
    color: #365964;
}

.Delet {
    text-decoration: underline;
    color: #FF9900;
}

.MR {
    margin-right: 5px;
}

.send-test {
    margin: 40px 20px 20px 0px;
}

.testsend_content {
    overflow: hidden;
}
</style>

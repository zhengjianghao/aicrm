<template>
    <div class="form-control" style="margin-left:10px;">
        <div class="form-group form_edit">
            {{typeWord ? typeWord : '短信内容'}}&nbsp;&nbsp;&nbsp;
            <span class="serif" style="color: #B0B7BF; font-size: 10px;">{{ tip ? tip : '' }}</span>
            <br>
            <div class="edit-box">
                <div class='head_phone'v-if="msgType === 'messageTemplateT'">
                    <el-form-item prop='send_mobile_user'>
                        <el-row :gutter='20' class="row_phone">
                                <el-col :span='3'><p>接收号码：</p></el-col>
                                <el-col :span='21'><el-tooltip
                                    class="item"
                                    effect="dark"
                                    :manual="true"
                                    :value='send_mobile_user_invalid'
                                    :content="send_mobile_user_invalid_msg"
                                    placement="top"
                                    >
                                    <el-input v-model="send_mobile_user"></el-input>
                                </el-tooltip></el-col>
                        </el-row>
                    </el-form-item>
                </div>
                <el-row :gutter='1' type="flex" class="var-list list-unstyled var-msg">
                    <el-col :span="msgType != 'messageTemplateSend' ? 4 : 6">
                        <li @click="openSendTestMsg(gbConst.testSendMessage, msgType)">测试发送</li>
                    </el-col>
                    <el-col :span='4' v-if="msgType != 'messageTemplateSend'">
                        <li @click="openRefTemplate(gbConst.messageTemplate, msgType)">参考模板</li>
                    </el-col>
                    <el-col :span='item.length+2' v-for="(item,index) in allLine" v-if="index < getAllLine(allLine)" :key="item">
                        <li @click="secondInsert(item, msgType)">插入{{ item }}</li>
                    </el-col>
                    <el-col :span='5' v-if="isShowMore(allLine)">
                        <li @click.stop="showMsg()">
                            更多变量
                            <span class="iconfont" style="font-size: 12px;" :class="{'icon-zhengsanjiao': showMsgVarSecondFlag, 'icon-daosanjiao': !showMsgVarSecondFlag}"></span>
                        </li>
                    </el-col>
                </el-row>
                <el-row :gutter='1' type="flex" justify="end" :class="msgType == 'messageTemplateT' ? 'msgT' : ''" class="var-list list-unstyled var-msg second" v-if="showMsgVarSecondFlag">
                    <el-col :span='item.length' v-for="(item,index) in allLine" v-if="index >= getAllLine(allLine)" :key="item">
                        <li @click="secondInsert(item, msgType)">插入{{ item }}</li>
                    </el-col>
                </el-row>

                <div class="textarea-box">
                    <span class="qianming">【签名】</span>
                    <textarea :id="msgType" style="text-indent: 4em" v-textarea-delete="msgContentData" v-model="msgContentData">
                    </textarea>
                </div>
                <div class="bottom">
                    <div class="pull-left cap_sm">
                        签名：{{ userData.sign }}
                        <span class="link primary" @click="openGlobalSetting()">修改</span>
                        <el-tooltip popper-class='tool_notes' placement="top">
                            <div slot="content">
                                1.签名长度限制为1-10字
                                <br/> 2.请勿使用'淘宝'、'天猫'等淘系签名
                                <br/> 3.建议使用店铺名称或品牌名作为店铺签名
                                <br/> 4.签名会自动根据运营商要求放在最前或最后
                            </div>
                            <span class="iconfont icon-help"></span>
                        </el-tooltip>
                    </div>
                    <div class="pull-right cap">
                        计费标准
                        <el-tooltip popper-class='tool_notes' placement="top">
                            <div slot="content">
                                1.不超过70个字的以一条短信计算
                                <br/> 2.超出70个字将按照67个字每条计算
                                <br/> 3.一个汉字、数字、字母、符号、空格都算一个字
                                <br/> 4.含自变量的短信按实际发出的长度计算
                            </div>
                            <span class="iconfont icon-help"></span>
                        </el-tooltip>
                    </div>
                    <div class="pull-right active_msg_coumt">
                        包含变量与签名，预计消耗短信{{ messageCount }}条(
                        <span class="cur_count">{{ wordSize }}</span>/70)
                    </div>
                </div>
            </div>
            <div class="content_bottom remind">
                <slot name="remind_text">
                    <div>
                        提醒：1、链接前后须有空格分格，请勿删除前后空格，删除后会在手机端无法直接点击打开，影响顾客回顾
                    </div>
                    <div>
                        <span class="lucency">提醒：</span>2、如果存在变量，为避免超出1条短信，请预留一部分字符
                    </div>
                </slot>
            </div>

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
            g_const: globalConstant,
            showMsgVarSecondFlag: false,
            unlimited: true,
            msgContentData: '',
            utils: utils,
            currentUser: {
                signName: ''
            },
            messageCount: '',
            wordSize: '',
            isFirstLoad: false,
            send_mobile_user: '', //提醒短信用到
            send_mobile_user_invalid: false,
            send_mobile_user_invalid_msg: '',
            //二次催付，临近催付用到的字段
            open: '',
            unpay_time: '',
            multi_order_pay: '',
            send_type: '',
            unmod_remind_pay: ''
        }
    },
    computed: {
        ...mapGetters([
            'msgState',
            'userData',
            'verificationData'
        ]),
        gbConst() {
            return globalConstant.openModalCodes
        },
    },
    mounted() {
        this.isFirstLoad = true
        if(this.msgContent) {
            if(this.msgType == 'messageTemplate') {
                this.msgContentData = '' + this.msgContent.replace('【签名】', '')
            } else if (this.msgType == 'messageTemplateN') {
                this.msgContentData = '' + this.msgContent.send_content.replace('【签名】', '')
            } else if (this.msgType == 'messageTemplateP') {
                this.msgContentData = '' + this.msgContent.msg_content.replace('【签名】', '')
            } else if (this.msgType == 'messageTemplateSend') {
                this.msgContentData = '' + this.msgContent.replace('【签名】', '')
            } else if (this.msgType == 'messageTemplateT') {
                this.msgContentData = '' + this.msgContent.replace('【签名】','')
                this.send_mobile_user = this.sendMobile
            }
        }
    },
    watch: {
        msgContentData() {
            this.msgContentData = this.changeWords(this.msgContentData)
            if(this.msgType == 'messageTemplate') {
                this.updataBaseMConfig({
                    message: '【签名】' + this.msgContentData.replace(/回TD退订/g, "")
                })
            } else if (this.msgType == 'messageTemplateN') {
                //发出通知 near_close_reminder 在其他组件中的其他字段同步更新
                this.verification({
                    near_send_content: '【签名】' + this.msgContentData.replace(/回TD退订/g, "")
                })
                this.updataBaseMConfig({
                    near_close_reminder: {
                        open: this.open,
                        unpay_time: this.unpay_time,
                        multi_order_pay: this.multi_order_pay,
                        send_type: this.send_type,
                        unmod_remind_pay: this.unmod_remind_pay,
                        send_content: '【签名】' + this.msgContentData.replace(/回TD退订/g, "")
                    }
                })
            } else if (this.msgType == 'messageTemplateP') {
                //发出通知 sencod_remind_pay 在其他组件中的其他字段同步更新
                this.verification({
                    second_msg_content: '【签名】' + this.msgContentData.replace(/回TD退订/g, "")
                })
                this.updataBaseMConfig({
                    sencod_remind_pay: {
                        open: this.open,
                        unpay_time: this.unpay_time,
                        multi_order_pay: this.multi_order_pay,
                        unmod_remind_pay: this.unmod_remind_pay,
                        send_type: this.send_type,
                        msg_content: '【签名】' + this.msgContentData.replace(/回TD退订/g, "")
                    }
                })
            } else if (this.msgType == 'messageTemplateSend') {
                this.getMaergeMessage('【签名】' + this.msgContentData.replace(/回TD退订/g, ""))
            } else if (this.msgType == 'messageTemplateT') {
                this.updataBaseMConfig({
                    send_message_user: '【签名】'+this.msgContentData.replace(/回TD退订/g,"")
                })
            }
        },
        msgContent() {
            if(this.msgType == 'messageTemplate') {
                this.msgContentData = '' + this.msgContent.replace('【签名】', '')
            } else if (this.msgType == 'messageTemplateN') {
                this.msgContentData = '' + this.msgContent.send_content.replace('【签名】', '')
                this.open = this.msgContent.open
                this.unpay_time = this.msgContent.unpay_time
                this.multi_order_pay = this.msgContent.multi_order_pay
                this.send_type = this.msgContent.send_type
                this.unmod_remind_pay = this.msgContent.unmod_remind_pay
            } else if (this.msgType == 'messageTemplateP') {
                this.msgContentData = '' + this.msgContent.msg_content.replace('【签名】', '')
                this.open = this.msgContent.open
                this.unpay_time = this.msgContent.unpay_time
                this.multi_order_pay = this.msgContent.multi_order_pay
                this.send_type = this.msgContent.send_type
                this.unmod_remind_pay = this.msgContent.unmod_remind_pay
            } else if (this.msgType == 'messageTemplateSend') {
                this.msgContentData = '' + this.msgContent.replace('【签名】', '')
            } else if (this.msgType == 'messageTemplateT') {
                this.msgContentData = '' + this.msgContent.replace('【签名】','')
            }
        },
        msgState() {
            if(this.msgState.type == this.msgType) {
                this.msgContentData = this.msgState.msg
            }
            this.wordSize = this.msgState.msg.length + 4
            this.messageCount = Math.ceil((this.msgState.msg.length + 4) / 70)
        },
        // 更多变量
        showMsgVarSecondFlag() {
            var that = this
            // 点击body时隐藏更多变量
            if (this.showMsgVarSecondFlag) {
                document.querySelector('body').addEventListener('click', function (e) {
                    that.showMsgVarSecondFlag = false
                })
            }
        },
        //提醒模板中的
        send_mobile_user() {
            this.updataBaseMConfig({
                send_mobile_user: this.send_mobile_user
            })
            this.verification({
                send_mobile_user: this.send_mobile_user
            })
        },
        sendMobile() {
            this.send_mobile_user=this.sendMobile
        },
        //验证和二次临近催付相关
        verificationData() {
            if(this.msgType === 'messageTemplateT') {
                if(this.verificationData.hasOwnProperty('send_mobile_user_invalid')) {
                    this.send_mobile_user_invalid=this.verificationData.send_mobile_user_invalid
                }
                if(this.verificationData.hasOwnProperty('send_mobile_user_invalid_msg')) {
                    this.send_mobile_user_invalid_msg=this.verificationData.send_mobile_user_invalid_msg
                }
            }else if(this.msgType === 'messageTemplateN') {
                if (this.verificationData.hasOwnProperty('near_open')) {
                    this.open = this.verificationData.near_open
                }
                if (this.verificationData.hasOwnProperty('near_unpay_time')) {
                    this.unpay_time = this.verificationData.near_unpay_time
                }
                if (this.verificationData.hasOwnProperty('near_multi_order_pay')) {
                    this.multi_order_pay = this.verificationData.near_multi_order_pay
                }
                if (this.verificationData.hasOwnProperty('near_send_type')) {
                    this.send_type = this.verificationData.near_send_type
                }
                if (this.verificationData.hasOwnProperty('near_unmod_remind_pay')) {
                    this.unmod_remind_pay = this.verificationData.near_unmod_remind_pay
                }
            }else if(this.msgType === 'messageTemplateP') {
                if (this.verificationData.hasOwnProperty('second_open')) {
                    this.open = this.verificationData.second_open
                }
                if (this.verificationData.hasOwnProperty('second_unpay_time')) {
                    this.unpay_time = this.verificationData.second_unpay_time
                }
                if (this.verificationData.hasOwnProperty('second_multi_order_pay')) {
                    this.multi_order_pay = this.verificationData.second_multi_order_pay
                }
                if (this.verificationData.hasOwnProperty('second_unmod_remind_pay')) {
                    this.unmod_remind_pay = this.verificationData.second_unmod_remind_pay
                }
                if (this.verificationData.hasOwnProperty('second_send_type')) {
                    this.send_type = this.verificationData.second_send_type
                }
            }
        },
    },
    methods: {
        ...mapActions([
            'updateOpenModal',
            'updataBaseMConfig',
            'updateMesContent',
            'getMaergeMessage',
            'verification'
        ]),
        /**
         * 显示更多变量
         */
        showMsg() {
            this.showMsgVarSecondFlag = !this.showMsgVarSecondFlag
        },
        /**
         * 分行更多变量
         * @param {Array} 插入关键字数组
         * @return {Number}
         */
        getAllLine(value) {
            var indexLength = 0
            for (var i in value) {
                indexLength = value[i].length + indexLength
                if (indexLength >= 36) {
                    return i
                }
            }
            if (indexLength < 36) {
                return 100
            }
        },
        /**
         * 判断是否显示'更多变量'按钮
         * @param {Array} 插入关键字数组
         * @return {Boolean}
         */
        isShowMore(value) {
            var indexLength = 0
            for (var i in value) {
                indexLength = value[i].length + indexLength
            }
            if (indexLength < 36) {
                return false
            } else {
                return true
            }
        },
        /**
         * 打开修改签名弹框
         */
        openGlobalSetting() {
            this.updateOpenModal({
                name: this.g_const.openModalCodes.systemConfig,
                param: {
                    state: 'globalSetting'
                }
            })
        },
        /**
         * 打开测试发送的方法
         * @param {String} 弹框名称
         */
        openSendTestMsg(code, type) {
            var that = this
            this.updateOpenModal({
                name: code,
                param: {
                    state: type,
                    road: that.messageRoad
                }
            });
        },
        /**
         * 打开参考模板的弹窗的方法
         * @param {String} 弹框名称
         */
        openRefTemplate(code, type) {
            this.updateOpenModal({
                name: code,
                param: {
                    state: type
                }
            });
        },
        /**
         * 快捷插入
         * @param {String} 插入关键字
         */
        insert(content, type) {
            content = '<' + content + '>'
            var val = content
            var domElement = document.getElementById(this.msgType)
            if (document.selection) {
                domElement.focus()
                var sel = document.selection.createRange()
                sel.text = val
                domElement.focus()
            } else if (domElement.selectionStart || domElement.selectionStart === 0) {
                // 获取当前光标位置
                var startPos = domElement.selectionStart
                var endPos = domElement.selectionEnd
                var scrollTop = domElement.scrollTop
                // 将光标选中位置替换成插入关键字
                domElement.value = domElement.value.substring(0, startPos) + val + domElement.value.substring(endPos, domElement.value.length)
                this.msgContentData = domElement.value
                domElement.focus()
                // 定位光标至插入关键字后
                domElement.selectionStart = startPos + val.length
                domElement.selectionEnd = startPos + val.length
                domElement.scrollTop = scrollTop
            } else {
                domElement.value += val
                domElement.focus()
            }
        },
        /**
         * 在点击更多变量时使用
         * @param {String} 插入关键字
         */
        secondInsert(content, type) {
            // 快捷插入
            this.insert(content, type)
            // 隐藏更多变量
            this.showMsgVarSecondFlag = false
        },
        changeWords(value) {
            // 插入关键字后将'回TD退订'移动至短信最后
            if (value.indexOf('回TD退订') < value.length - 5 || value.indexOf('回TD退订') < 0) {
                value = value.replace(/回TD退订/g, "")
                value = value + '回TD退订'
            }
            // 计算签名长度
            this.wordSize = value.length + this.userData.sign.length + 2
            // 估算短信长度
            this.wordSize = this.utils.calculateMsgLen(value, this.allLine, this.wordSize)
            // 计算短信条数
            this.messageCount = Math.ceil(this.wordSize / 70)
            if (!this.isFirstLoad) {
                this.updateMesContent(true)
            } else {
                this.isFirstLoad = false
            }
            return value
        }
    },
    props: [
        'msgContent',
        'tip',
        'allLine',
        'typeWord',
        'msgType',
        'messageRoad',
        'sendMobile',//提醒客服的号码
    ]
}
</script>
<style lang="scss" scoped>
@import '../../style/variable.scss';
$border-main: 1px solid #DCE1E4;
.edit-box {
    display: inline-block;
    border: $border-main;
    margin-top: 10px;
    width: 950px;
    background-color: #fff;
    position: relative;
    .var-list {
        .title_block {
            background-color: $bottom-bg;
            color: $menuColor;
            &:hover {
                cursor: default;
            }
        }
        li {
            padding: 10px 9px;
            background-color: $primary;
            color: #fff;
            float: left;
            margin-left: 1px;
            text-align: center;
            width: 100%;
            cursor: pointer;

            &:first-child {
                margin-left: 0;
            }
        }
        &.var-msg li {
            padding: 3px 0px;
        }
        &.var-msg.second {
            position: absolute;
            width: 100%;
            left: 0;
            top: 40px;
            z-index: 3;
            li {
                border-top: $border-main;
                float: right;
                margin-left: 1px;
            }
        }
        &.var-msg.second.msgT {
            position: absolute;
            width: 100%;
            left: 0;
            top: 80px;
            z-index: 3;
            li {
                border-top: $border-main;
                float: right;
                margin-left: 1px;
            }
        }
    }
    .textarea-box {
        padding: 20px;
        line-height: 20px;
        border-bottom: $border-main;
        textarea {
            font-size: $titleFontSize;
            width: 100%;
            height: 113px;
            border: none;
            outline: none;
        }
    }
    .bottom {
        background-color: $bottom-bg;
        overflow: hidden;
        width: 100%;
        .cap {
            padding: 5px 16px;
            color: #999999;
        }
        .cap_sm {
            padding: 5px 16px;
            color: #999999;
        }
    }
    .config-box {
        padding: 20px;
        padding-bottom: 10px;
        background-color: #F4F5F9;
    }

    .bottom-gray {
        clear: both;
        border-top: $border-main;
        padding: 10px;
        background-color: #F4F5F9;
    }
    .cur_count {
        font-size: 22px;
        color: $primary;
    }
    .active_msg_coumt {
        padding-bottom: 0px;
        position: absolute;
        right: 172px;
        bottom: 5px;
        color: #999999;
    }
}
.content_bottom {
    margin-left: 35px;
    line-height: 24px;
    .lucency {
        opacity: 0;
    }
}
.qianming {
    position: absolute;
    font-size: 14px;
    z-index: 2;
}
.head_phone {
    background-color: $bottom-bg;
    height: 40px;
    .row_phone {
        padding-top: 6px;
    }
}
.form_edit {
    padding-left: 18px;
}
textarea {
    resize: none;
}
</style>

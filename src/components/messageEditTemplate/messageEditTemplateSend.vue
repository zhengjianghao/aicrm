<template>
    <div class="form-control" style="margin-left:10px;">
        <div class="form-group form_edit">
            {{typeWord ? typeWord : '短信内容'}}&nbsp;&nbsp;&nbsp;
            <span class="serif" style="color: #B0B7BF; font-size: 10px;">{{ tip ? tip : '' }}</span>
            <br>
            <div class="edit-box">
                <el-row :gutter='1' type="flex" class="var-list list-unstyled var-msg">
                    <el-col :span='6'>
                        <li @click="openSendTestMsg(gbConst.testSendMessage)">测试发送</li>
                    </el-col>
                    <!--<el-col :span='4'>
                                <li @click="openRefTemplate(gbConst.messageTemplate)">参考模板</li>
                            </el-col>-->
                    <el-col :span='item.length+2' v-for="(item,index) in allLine" v-if="index < getAllLine(allLine)" :key="item">
                        <li @click="secondInsert(item)">插入{{ item }}</li>
                    </el-col>
                    <el-col :span='5' v-if="isShowMore(allLine)">
                        <li @click.stop="showMsg()">
                            更多变量
                            <span class="iconfont" style="font-size: 12px;" :class="{'icon-zhengsanjiao': showMsgVarSecondFlag, 'icon-daosanjiao': !showMsgVarSecondFlag}"></span>
                        </li>
                    </el-col>
                </el-row>
                <el-row :gutter='1' type="flex" justify="end" class="var-list list-unstyled var-msg second" v-if="showMsgVarSecondFlag">
                    <el-col :span='item.length' v-for="(item,index) in allLine" v-if="index >= getAllLine(allLine)" :key="item">
                        <li @click="secondInsert(item)">插入{{ item }}</li>
                    </el-col>
                </el-row>

                <div class="textarea-box">
                    <span class="qianming">【签名】</span>
                    <textarea id="msgEditContentSend" style="text-indent: 4em" v-textarea-delete="msgContentData" v-model="msgContentData">
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
            isFirstLoad: false
        }
    },
    computed: {
        ...mapGetters([
            'msgState',
            'userData'
        ]),
        gbConst() {
            return globalConstant.openModalCodes
        }
    },
    mounted() {
        this.isFirstLoad = true
    },
    watch: {
        msgContentData() {
            if (this.msgContentData.indexOf('回TD退订') < this.msgContentData.length - 5 || this.msgContentData.indexOf('回TD退订') < 0) {
                this.msgContentData = this.msgContentData.replace(/回TD退订/g, "")
                this.msgContentData = this.msgContentData + '回TD退订'
            }
            // 计算签名长度
            this.wordSize = this.msgContentData.length + this.userData.sign.length + 2
            // 估算短信长度
            this.wordSize = this.utils.calculateMsgLen(this.msgContentData, this.allLine, this.wordSize)
            // 计算短信条数
            this.messageCount = Math.ceil(this.wordSize / 70)
            if (!this.isFirstLoad) {
                this.updateMesContent(true)
            } else {
                this.isFirstLoad = false
            }
            this.getMaergeMessage('【签名】' + this.msgContentData.replace(/回TD退订/g, ""))
        },
        msgContent() {
            this.msgContentData = '' + this.msgContent.replace('【签名】', '')
        },
        msgState() {
            if (this.msgState.type == 'messageTemplateSend') {
                this.msgContentData = this.msgState.msg
                this.wordSize = this.msgState.msg.length + 4
                this.messageCount = Math.ceil((this.msgState.msg.length + 4) / 70)
            }
        },
        showMsgVarSecondFlag() {
            var that = this
            if (this.showMsgVarSecondFlag) {
                document.querySelector('body').addEventListener('click', function(e) {
                    that.showMsgVarSecondFlag = false
                })
            }
        }
    },
    methods: {
        ...mapActions([
            'updateOpenModal',
            'updateMarket',
            'updateMesContent',
            'getMaergeMessage'
        ]),
        showMsg() {
            this.showMsgVarSecondFlag = !this.showMsgVarSecondFlag
        },
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
        openGlobalSetting() {
            this.updateOpenModal({
                name: this.g_const.openModalCodes.systemConfig,
                param: {
                    state: 'globalSetting'
                }
            })
        },
        // 打开测试发送的方法
        openSendTestMsg(code) {
            var that = this
            this.updateOpenModal({
                name: code,
                param: {
                    state: 'messageTemplateSend',
                    road: that.messageRoad
                }
            });
        },
        // 打开参考模板的弹窗的方法
        openRefTemplate(code) {
            this.updateOpenModal({
                name: code,
                param: {
                    state: 'messageTemplate'
                }
            });
        },
        // 快捷插入
        insert(content) {
            content = '<' + content + '>';
            var val = content;
            var domElement = document.getElementById('msgEditContentSend');
            if (document.selection) {
                domElement.focus();
                var sel = document.selection.createRange();
                sel.text = val;
                domElement.focus();
            } else if (domElement.selectionStart || domElement.selectionStart === 0) {
                var startPos = domElement.selectionStart;
                var endPos = domElement.selectionEnd;
                var scrollTop = domElement.scrollTop;
                domElement.value = domElement.value.substring(0, startPos) + val + domElement.value.substring(endPos, domElement.value.length);
                this.msgContentData = domElement.value;
                domElement.focus();
                domElement.selectionStart = startPos + val.length;
                domElement.selectionEnd = startPos + val.length;
                domElement.scrollTop = scrollTop;
            } else {
                domElement.value += val;
                domElement.focus();
            }
        },
        // 在点击更多变量时使用
        secondInsert(content) {
            this.insert(content);
            this.showMsgVarSecondFlag = false;
        }
    },
    props: [
        'msgContent',
        'tip',
        'allLine',
        'typeWord',
        'messageRoad'
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

.form_edit {
    padding-left: 18px;
}

textarea {
    resize: none;
}
</style>

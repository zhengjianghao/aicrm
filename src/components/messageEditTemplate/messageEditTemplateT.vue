<template>
  <div class="form-control" style="margin-left:10px;">
    <el-row :gutter="20">
        <el-col :span="3"><p>提醒形式：</p></el-col>
        <el-col :span="2" v-if="isRemind == 'noRemind' ? false : true"><el-radio v-model="send_type_user" label="">不提醒</el-radio></el-col>
        <el-col :span="2"><el-radio v-model="send_type_user" label="sms">仅短信</el-radio></el-col>
        <el-col :span="2" v-show="jurisdictionData.allShow"><el-radio v-model="send_type_user" label="qianniu">仅千牛</el-radio></el-col>
        <el-col :span="3" v-show="jurisdictionData.allShow"><el-radio v-model="send_type_user" label="all">短信+千牛同时</el-radio></el-col>
        <el-col :span="3" v-show="jurisdictionData.allShow"><el-radio v-model="send_type_user" label="server">仅客服中心</el-radio></el-col>
        <el-col :span="8" v-show="jurisdictionData.allShow"><el-radio v-model="send_type_user" label="serverSms">短信+客服中心</el-radio></el-col>
    </el-row>
    <!--<div class="form-group form_edit" v-if="send_type_user != ''">
      短信内容
      &nbsp;&nbsp;&nbsp;
      <span class="serif" style="color: #B0B7BF; font-size: 10px;">{{ tip ? tip : '' }}</span>
      <br>
      <div class="edit-box">
          <div class='head_phone'>
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
                <el-col :span='4'><li @click="openSendTestMsg(gbConst.testSendMessage)">测试发送</li></el-col>
                <el-col :span='4'><li @click="openRefTemplate(gbConst.messageTemplate)">参考模板</li></el-col>
                <el-col :span='item.length+2' v-for="(item,index) in allLine" v-if="index < getAllLine(allLine)" :key="item">
                <li

                    @click="secondInsert(item)"
                >插入{{ item }}</li>
                </el-col>
                <el-col :span='5' v-if="isShowMore(allLine)">
                    <li @click.stop="showMsg()">
                        更多变量
                        <span
                            class="iconfont" style="font-size: 12px;"
                            :class="{'icon-zhengsanjiao': showMsgVarSecondFlag, 'icon-daosanjiao': !showMsgVarSecondFlag}"></span>
                    </li>
                </el-col>
          </el-row>
          <el-row :gutter='1' type="flex" justify="end" class="var-list list-unstyled var-msg second" v-if="showMsgVarSecondFlag">
              <el-col :span='item.length' v-for="(item,index) in allLine" v-if="index >= getAllLine(allLine)" :key="item">
                    <li
                        @click="secondInsert(item)"
                    >插入{{ item }}</li>
              </el-col>
          </el-row>
          <div class="textarea-box">
            <span class="qianming">【签名】</span>
            <textarea
                id="msgEditContentT"
                style="text-indent: 4em"
                v-textarea-delete="msgContentData"
                v-model="msgContentData">
            </textarea>
          </div>
          <div class="bottom">
              <div class="pull-left cap_sm">
                  签名：{{ userData.sign }} <span class="link primary" @click="openGlobalSetting()">修改</span>
                <el-tooltip
                popper-class='tool_notes'
                placement="top"
                >
                    <div slot="content">
                        1.签名长度限制为1-10字<br/>
                        2.请勿使用'淘宝'、'天猫'等淘系签名<br/>
                        3.建议使用店铺名称或品牌名作为店铺签名<br/>
                        4.签名会自动根据运营商要求放在最前或最后
                    </div>
                    <span class="iconfont icon-help"></span>
                </el-tooltip>
              </div>
              <div class="pull-right cap">
                  计费标准
                  <el-tooltip
                    popper-class='tool_notes'
                    placement="top"
                  >
                  <div slot="content">
                    1.不超过70个字的以一条短信计算<br/>
                    2.超出70个字将按照67个字每条计算<br/>
                    3.一个汉字、数字、字母、符号、空格都算一个字<br/>
                    4.含自变量的短信按实际发出的长度计算
                  </div>
                  <span class="iconfont icon-help"></span>
                  </el-tooltip>
              </div>
              <div class="pull-right active_msg_coumt">
                  包含变量与签名，预计消耗短信{{ messageCount }}条(<span class="cur_count">{{ wordSize }}</span>/70)
              </div>
          </div>
      </div>
      <div class="content_bottom remind">
        <div>
            提醒：1、链接前后须有空格分格，请勿删除前后空格，删除后会在手机端无法直接点击打开，影响顾客回顾
        </div>
        <div>
            <span class="lucency">提醒：</span>2、如果存在变量，为避免超出1条短信，请预留一部分字符
        </div>
      </div>

    </div>-->
    <msg-edit-temp v-if="send_type_user != ''" :msgContent='msgContent' :tip='tip' :allLine='allLine' msgType='messageTemplateT' :sendMobile='sendMobile'>
    </msg-edit-temp>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        send_type_user: '',
      }
    },
    computed: {
        ...mapGetters([
            'jurisdictionData'
        ]),
    },
    watch: {
      send_type_user() {
        // 更新营销配置基本量
        this.updataBaseMConfig({
          send_type_user: this.send_type_user
        })
      },
      sendTypeUser() {
        this.send_type_user = this.sendTypeUser
      }
    },
    methods: {
      ...mapActions([
          'updataBaseMConfig',
        ]),
    },
    props: [
        'msgContent',
        'tip',
        'sendMobile',
        'allLine',
        'sendTypeUser',
        'isRemind'
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
        background-color: #fff;
        width: 950px;
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
                cursor: pointer;
                width: 100%;
                text-align: center;
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

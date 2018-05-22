<template>
    <div class="login grid-middle showBgAnimate">
        <div class="col">
            <div class="content">
                <div class="img-wrapper">
                    <div class="wrapper">
                        <img src="../../assets/images/login_logo.png">
                        <a class="el-button el-button--primary btn-block" href="https://oauth.taobao.com/authorize?response_type=code&client_id=23497488&redirect_uri=http://www.mofangqiang.cn/login.html&state=1212&view=web">
                            点击去淘宝授权
                        </a>

                        <div class="btn_bottom">
                            <p class="pull-left">
                                <i class="iconfont icon-phone" style="font-size:12px"></i> 0571-28121900</p>
                            <p class="pull-right">
                                <a target="_blank" href="http://amos.alicdn.com/getcid.aw?v=2&uid=%E6%9D%AD%E5%B7%9E%E8%81%9A%E6%95%88%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&site=cntaobao&s=2&groupid=0&charset=utf-8">
                                    <span class="iconfont icon-wangwang"></span> 联系旺旺</a>
                            </p>
                        </div>
                        <div class="mssage">
                            <div class="mainMsg" v-show="message">
                                <i class="el-icon-information"></i> {{fetchMessag}}
                                <a class="goToBuy" href="https://fuwu.taobao.com/ser/detail.htm?spm=0.0.0.0.p5FypM&service_code=FW_GOODS-1000327190">
                                    订阅/续订
                                </a>
                            </div>
                            <!--[if (lte IE 9)]>
                                    <div class="otherMsg">
                                        <i class="el-icon-information"></i> 提示：您所用的浏览器版本过低，建议您使用最新的搜狗浏览器使用本产品已达到更好的显示效果
                                        <div class="download"><a href="http://download.ie.sogou.com/se/sogou_explorer_7.0_0316.exe" class="link">搜狗浏览器官方下载 →</a></div>
                                    </div>
                                    <![endif]-->
                        </div>
                    </div>
                </div>
                <div class="word">
                    <h1>
                        AI&nbsp;&nbsp;CRM&nbsp;
                    </h1>
                    <h2>
                        按成果分成版
                    </h2>
                    <h4>
                        <span style="font-family:'HYGYT'; font-style:normal; font-weight:normal;">“魔方墙”</span>为你而在
                    </h4>
                    <h4>
                        和卖家谈一场白头到老海枯石烂的恋爱吧
                    </h4>
                    <div class="bottom">
                        @2016-2017 杭州聚效科技有限公司 版权所有
                        <br> 增值电信业务经营许可证：
                        <a href="http://www.miitbeian.gov.cn/" class="" target="_blank">浙ICP备14043836号</a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: '',
            unOder: false
        }
    },
    computed: {
        fetchMessag() {
            if (this.$route.query.message) {
                this.message = this.$route.query.message
            } else if (this.$route.query.error_description) {
                var des = this.$route.query.error_description
                if (des.indexOf('need purchase') >= 0) {
                    this.unOder = true
                    this.message = '必须先订购才能使用'
                } else if (des.indexOf('parent account forbid this sub account to access app.' >= 0)) {
                    this.unOder = false
                    this.message = '父账号未授权此子账号访问应用'
                }
            }
            return this.message
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixin.scss';
@font-face {
    font-family: "HYGYT";
    /* 汉仪刚艺体 */
    src: url("../../assets/fonts/HYGYT/HYGYT.eot");
    /* IE9 */
    src: url("../../assets/fonts/HYGYT/HYGYT.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
    url("../../assets/fonts/HYGYT/HYGYT.ttf") format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
    url("../../assets/fonts/HYGYT/HYGYT.svg#HYGYT") format("svg");
}

@font-face {
    font-family: "FZZZH";
    /* 方正正准黑 */
    src: url("../../assets/fonts/FZZZH/FZZZH.eot");
    /* IE9 */
    src: url("../../assets/fonts/FZZZH/FZZZH.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
    url("../../assets/fonts/FZZZH/FZZZH.ttf") format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */
    url("../../assets/fonts/FZZZH/FZZZH.svg#FZZZH") format("svg");
}

.icon-wangwang {
    font-size: 13px;
}

.el-button+.el-button {
    margin-left: 0;
}

.download {
    a {
        color: rgba(154, 154, 154, 0.69);
    }
    display: block;
    text-decoration: underline;
    text-align: right;
}

.mssage {
    position: absolute;
    top: 220px;
    color: #ffff00;
    font-size: $formFontSize;
    width: 100%;
}

.otherMsg,
.mainMsg {
    background: rgba(92, 109, 125, 0.18);
    padding: 9px;
    border-radius: 3px;
    margin-bottom: 10px;
    margin-top: 10px;
    min-height: 34px;
}

.charge {
    color: rgba(154, 154, 154, 0.69);
    position: absolute;
    top: 203px;
    right: 0;
    font-size: $menuFontSize;
    text-decoration: underline;
}

.showBgAnimate {
    transition: all 5s ease;
    &:hover {
        background-size: 103% 103%;
    }
}

.login {
    background-image: url(../../assets/images/login_bg.png);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .col {
        @include center;
    }
    .content {
        width: 650px;
        margin: 0 auto;
        position: relative;
        height: 200px;
        bottom: 40px;
        .img-wrapper {
            position: absolute;
            margin-top: 10px;
            .wrapper {
                position: relative;
                width: 250px;
                img {
                    width: 250px;
                    padding: 0;
                    position: absolute;
                    top: 0;
                }
                .btn_bottom {
                    position: absolute;
                    top: 205px;
                    overflow: hidden;
                    width: 100%;
                    font-size: 13px;
                    color: $menuColor;
                    img {
                        position: relative;
                    }
                }
                .btn-block {
                    position: absolute;
                    top: 160px;
                    z-index: 2;
                    width: 100%;
                    color: $white;
                    font-weight: bold;
                    text-decoration: none;
                }
            }
        }
        .word {
            color: #fff;
            position: absolute;
            top: 50px;
            left: 350px;
            h1 {
                margin: 0;
                font-size: 45px;
                font-family: 'FZZZH';
                font-weight: normal;
                font-style: normal;
            }
            h4 {
                margin-top: 15px;
            }
            .bottom {
                font-size: 13px;
                color: $menuColor;
                margin-top: 40px;
                a {
                    color: inherit;
                    &:hover {
                        color: inherit;
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}

.goToBuy {
    font-size: 13px;
    position: absolute;
    right: 13px;
    bottom: 20px;
}
</style>

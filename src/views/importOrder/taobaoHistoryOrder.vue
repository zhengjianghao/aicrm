<template>
    <div class="box" id='box'>
        <ul class="ul_box">
            <li>
                <div class="num">1</div>
                <h4>下载三个月前的订单</h4>
                <ul>
                    <li>1、近三个月订单无需导入，魔方墙AI CRM可以自动获取</li>
                    <li>2、同时下载“下载订单报表”和“下载宝贝报表”</li>
                    <li>3、下载后的文件，请勿修改或者改变存储格式，如需用excel浏览，关闭时请选择“否”</li>
                    <li>4、因历史订单只能导入宝贝标题，不能导入宝贝ID，故如果期间发生标题修改行为会影响AI引擎分析结果准确度</li>

                </ul>
                <div class="bottom">
                    <img src="../../assets/images/import-step.png"/>
                    <el-button type="primary" @click="goDownload()" href="https://tradearchive.taobao.com/trade/itemlist/list_export_order.htm?spm=a1z09.1.0.0.7yYfrK">点击去选择下载</el-button>
                </div>
            </li>
            <li class="num2_li">
                <div class="num">2</div>
                <h4>上传订单报表</h4>
                <ul>
                    <li>1、因淘宝导出的信息限制，所以后期筛选分类时部分选项无法使用，crm自动获取的最近3个月订单不受影响</li>
                    <li>2、宝贝报表可以选择性导入，不导入会导致3个月以前的用户没有历史详细购买宝贝记录，影响数据准确性</li>
                </ul>
                <div class="bottom">
                    <img src="../../assets/images/import-end.png"/>
                    <el-select v-show="!isAddGroup" placeholder="请选择" v-model="activeImportGroup">
                         <el-option
                            v-for="item in importGroupList"
                            :label="item.name"
                            :value="item.name"
                            :key="item.value"
                            >
                        </el-option>
                    </el-select>
                    <el-input class="add" v-model="groupName" v-show="isAddGroup"></el-input>
                    <a v-show="isAddGroup" @click="doAddGroup">添加</a><a @click="isAddGroup=false" v-show="isAddGroup">取消</a>
                    <a v-show="!isAddGroup" @click="isAddGroup=true"><i class="el-icon-plus"></i>添加分组</a>
                    <div class="danger form_msg">{{this.errorMsg}}</div>
                </div>
            </li>
        </ul>
        <div class="table_box user_tablelist">
           <el-table
                :data="tableData"
                stripe
                border>
                <el-table-column
                type="index"
                align="center"
                width='48px'
                label="序号">
                </el-table-column>
                <el-table-column
                align="center"
                min-width='368'
                label="订单报表">
                <template scope="scope">
                    <file-upload
                        class="link_underline primary"
                        :title="scope.row.orderFile.name"
                        name="file"
                        :data="{index:scope.$index}"
                        accept="accept"
                        :events="events"
                        ref="orderFile">
                    </file-upload>
                </template>
                </el-table-column>
                <el-table-column
                align="center"
                min-width='368'
                label="宝贝报表">
                <template scope="scope">
                    <file-upload
                        class="link_underline primary"
                        :title="scope.row.goodsFile.name"
                        :events="goodsEvents"
                        name="file"
                        :data="{index:scope.$index}"
                        ref="goodsFile">
                    </file-upload>
                </template>
                </el-table-column>
                <!--<el-table-column
                align="center"
                class="hide"
                label="操作">
                <template scope="scope">
                    <a class="add_rows link" @click="addRow(scope)" v-show="tableData.length === scope.$index + 1">添加行</a>
                    <a class="delet_rows link" v-show="tableData.length > 1" @click="removeRow(scope)">删除</a>
                </template>
                </el-table-column>-->
            </el-table>

            <div class="pull-right">
                <el-button type="primary" :disabled='saveDisabled' @click="submitUpload">点击导入历史数据</el-button>
                <el-button class="skip" v-show="userData.is_first" @click="skip('first')">跳过</el-button>
                <el-button class="skip" v-show="!userData.is_first" @click="skip()">完成</el-button>
            </div>
        </div>
    </div>

</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../misc/global.constant'
  import FileUpload from 'vue-upload-component'
  import * as TYPE from '../../vuex/type.constant'
  import store from '../../vuex/store'
  import moment from 'moment'
  export default {
    data() {
      return {
        groupName: '',
        addError: false,
        isAddGroup: false,
        activeImportGroup: '',
        errorMsg: '',
        rowCount: 1,
        orderFile:{},
        currentImportOrder: '',
        saveDisabled: false,
        importGroupList: [],
        p:'api/import_upload',
        fullLoading: '',
        tableData: [{
            id: moment().valueOf(),
            orderFile: {
                name: '上传订单报表'
            },
            goodsFile: {
                name: '上传宝贝报表'
            }
          }],
        events: {
            add(file, component) {
                if(file.name.substr(file.name.length-3,3) != 'csv') {
                    this.$message({
                    message: '文件格式错误',
                    customClass: 'message_position',
                    type: 'error'
                })
                    return
                }
                if(file.name.indexOf('ExportItemlList') != -1 || file.name.indexOf('ExportOrderDetailList') != -1) {
                    this.$message({
                    message: '这个文件是宝贝文件哦',
                    customClass: 'message_position',
                    type: 'error'
                })
                    return
                }else if(file.name.indexOf('ExportOrderList') < 0) {
                    this.$message({
                    message: '文件名有误请重新下载',
                    customClass: 'message_position',
                    type: 'error'
                })
                    return
                }
                //订单报表和宝贝报表不能重复
                var notSame = false

                notSame = component.$parent.data.every(o => {
                    return o.orderFile.name != file.name
                })
                if(!notSame) {
                    this.$message({
                        message: '订单报表已存在',
                        customClass: 'message_position',
                        type: 'error'
                    })
                    return
                }
                var data = component.$parent.data
                var index = component.data.index
                var tokenObj = JSON.parse(window.localStorage.getItem(store.state.userData.user_id) || '[]')
                file.headers['Authorization'] = 'Bearer ' + tokenObj.data
                file.postAction = '/import/import_upload'
                file.data.id = data[index].id
                file.data.file_type = 'order'
                data[index].orderFile.name = file.name
                data[index].orderFile.file = component
            },
            progress(file, component) {
                // 更新上传进度
                component.$store.commit(TYPE.UPDATE_PROCESS, {
                    show: true,
                    goodsProcess: file.progress
                })
            },
            // 上传完成
            after(file, component) {
                var count = component.$store.getters.uploadSuccessCount
                component.$store.commit(TYPE.UPDATE_UPLOAD_SUCCESS_NUM, count + 1)
            }
        },
        goodsEvents: {
            add(file, component) {
                if(file.name.substr(file.name.length-3,3) != 'csv') {
                    this.$message({
                    message: '文件格式错误',
                    customClass: 'message_position',
                    type: 'error'
                })
                    return
                }
                if(file.name.indexOf('ExportOrderList') != -1) {
                    this.$message({
                    message: '这个文件是订单文件哦',
                    customClass: 'message_position',
                    type: 'error'
                })
                    return
                }else if(file.name.indexOf('ExportItemlList') < 0 && file.name.indexOf('ExportOrderDetailList') < 0) {
                    this.$message({
                    message: '文件名有误请重新下载',
                    customClass: 'message_position',
                    type: 'error'
                })
                    return
                }
                 //订单报表和宝贝报表不能重复
                var notSame = false
                notSame = component.$parent.data.every(o => {
                    return o.goodsFile.name != file.name
                })
                if(!notSame) {
                    this.$message({
                        message: '宝贝报表已存在',
                        customClass: 'message_position',
                        type: 'error'
                    })
                    return
                }
                var data = component.$parent.data
                var index = component.data.index
                var tokenObj = JSON.parse(window.localStorage.getItem(store.state.userData.user_id) || '[]')
                file.headers['Authorization'] = 'Bearer ' + tokenObj.data
                file.postAction = '/import/import_upload'
                file.data.id = data[index].id
                file.data.file_type = 'item'
                data[index].goodsFile.name = file.name
                data[index].goodsFile.file = component
            },
            progress(file, component) {
                // 更新上传进度
                component.$store.commit(TYPE.UPDATE_PROCESS, {
                    show: true,
                    orderProcess: file.progress
                })
            },
            // 上传完成
            after(file, component) {
                var count = component.$store.getters.uploadSuccessCount
                component.$store.commit(TYPE.UPDATE_UPLOAD_SUCCESS_NUM, count + 1)
            }
        }
      }
    },
    computed: {
        ...mapGetters([
            'memberGroupData',
            'callbackMsg',
            'subState',
            'openModalState',
            'newAddGroupData',
            'uploadSuccessCount',
            'importOrderData',
            'repeatClickState',
            'processData',
            'userData'
            ]),
        // 获取导入分组
        getImportGroup() {
            var ret = []
            var _temp = this.memberGroupData
            this._temp.forEach(o => {
                if(o.name === '导入会员批次') {
                    ret = o.submenus['导入会员']
                    if(ret && ret.length > 0) {
                        ret = ret.sort((a, b) => {
                        return b.id - a.id
                    })
                    }

                }
            })
            return ret
        },
        noImportRecord() {
            return this.importOrderData.length === 0
        }
    },
    watch: {
        memberGroupData() {
            var ret = []
            this.memberGroupData.forEach(o => {
                if(o.name === '导入会员批次') {
                    if(o.submenus['导入会员']) {
                        ret = o.submenus['导入会员']
                    }
                    if(ret && ret.length > 0) {
                        ret = ret.sort((a, b) => {
                            return b.id - a.id
                        })
                    }
                }
            })
            this.importGroupList = ret
        },
        //监听导入进度
        processData() {
            var that = this
            if(this.fullLoading == '') {
                if(this.processData && this.processData.show) {
                    var _importBox = document.getElementById('importBox')
                    //点击确认后全屏的遮罩防止用户错误的操作
                    that.fullLoading = that.$loading({
                        customClass: 'fullLoad',
                        target: _importBox,
                        text: that.processData.processText
                    })
                }
            }else {
                if(this.processData && this.processData.show) {
                    that.fullLoading.text = that.processData.processText
                }else {
                    //关闭遮罩
                    that.fullLoading.close()
                    that.fullLoading = ''
                    // 跳转到导入列表页卡
                    this.getSubCode('imporList')
                }
            }
        },
        // 监听是否有回调消息需要显示
        callbackMsg() {
            if(this.isCurPage()) {
                if(this.callbackMsg) {
                    this.$message({
                        message: this.callbackMsg,
                        customClass: 'message_position',
                        type: 'success'
                    });
                }
            }
        },
        // 监控导入进度
        uploadSuccessCount() {
            var c = 0
            // 上传文件数
            this.tableData.forEach(o => {
                if(o.orderFile.file && o.goodsFile.file) {
                    c ++
                    c ++
                }
            })
            // 上传完成
            if(c === this.uploadSuccessCount && c !== 0) {
                if(this.uploadSuccessCount === 2) {
                    // 上传完成 关闭进度层
                    this.updateProcess({
                        show: false,
                        orderProcess: 0,
                        goodsProcess: 0
                    })
                }
                // 导入记录id
                var id = this.currentImportOrder.id
                // 不能随便改，会影响上传完成通知
                this.clearUpload()
                // 导入完成广播
                this.uploadComplete(id)
                // 清空导入文件成功数量
                this.updataUploadSuccessCount(0)
                // 清空导入分组选中项
                this.activeImportGroup = ''
            }

        }
    },
    mounted() {
        this.getMemberGroup()
    },
    methods: {
        ...mapActions([
            'addMemberGroup',
            'getMemberGroup',
            'createImportOrder',
            'getSubCode',
            'updataUploadSuccessCount',
            'uploadComplete',
            'closeModal',
            'updateImportGuide',
            'updateProcess',
            'repeatClick',
            'getMemberCategory',
            'updateOpenModal',
            'getUser'
            ]),
        skip(value) {
            if(value == 'first') {
                this.updateOpenModal({
                    name: 'systemConfig',
                        param: {
                            state: 'projectSetting',
                            first: true
                    }
                })
                // 更新是否第一次登录的信息 is_first = false
                this.getUser()
            } else {
                this.closeModal('importModal')
            }
        },
        // 开始导入历史数据
        submitUpload() {
            var notEmpty = false
            var that = this
            // 订单报表和宝贝报表不能为空
            notEmpty = this.tableData.every(o => {
                return o.orderFile.file && o.goodsFile.file
            })
            if(!notEmpty) {
                this.$message({
                    message: '订单报表和宝贝报表不能为空',
                    customClass: 'message_position',
                    type: 'error'
                })
                return
            }
            // //订单报表和宝贝报表不能重复
            // var notSame = false

            // notSame = this.tableData.every(o => {
            //     var count = 0
            //     this.tableData.forEach(n => {
            //         if(o.orderFile.name === n.orderFile.name && o.goodsFile.name === n.goodsFile.name) {
            //             count++
            //         }
            //     })
            //     if(count > 1) {
            //         return  false
            //     }else {
            //         return true
            //     }
            // })
            // if(!notSame) {
            //     this.$message({
            //         message: '订单报表或宝贝报表不能相同',
            //         type: 'error'
            //     })
            //     return
            // }

            // 导入前友好提示
            this.$confirm('导入需要花费比较长的时间，中途不可中断，确定要导入么？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => { // 用户点击确定
                //上传按钮禁用
                // this.repeatClick()
                that.saveDisabled = true
                // 用户未选中导入分组，自动创建（日期+时分+秒）
                if(!this.activeImportGroup) {
                    this.activeImportGroup = moment().format('YYYY-MM-DD HH:mm:ss')
                    this.getMemberCategory('导入会员批次').then(item => {
                        this.addMemberGroup({
                            category_id: item.id,
                            title: this.activeImportGroup,
                            tag: '导入会员',
                            is_system: 1
                        }).then(() => {
                            this.getMemberGroup()
                        })
                    })
                }
                // 创建导入记录
                this.createImportOrder(this.activeImportGroup).then(importRecord => {
                    var _tarB = document.getElementById('importBox')
                    //点击确认后全屏的遮罩防止用户错误的操作
                    var _fullLoading = this.$loading({
                        customClass: 'fullLoad',
                        target: _tarB,
                    })
                    this.$message({
                        message: '导入计划已经建立，预计30分钟内完成导入，导入过程中请勿关闭浏览器',
                        type: 'success',
                        customClass: 'message_position',
                        onClose: o => {
                            // 建立导入计划
                            // 初始化上传成功文件数
                            this.updataUploadSuccessCount(0)
                            // 获取导入记录
                            this.currentImportOrder = importRecord
                            // 遍历要上传的文件，开始上传
                            this.tableData.forEach(o => {
                                // 导入记录id
                                o.orderFile.file.files[0].data.import_result_id = importRecord.id
                                o.goodsFile.file.files[0].data.import_result_id = importRecord.id
                                // 触发上传事件
                                o.orderFile.file.active = true
                                o.goodsFile.file.active = true
                            })
                            //上传按钮恢复
                            // this.repeatClick()
                            that.saveDisabled = false
                            // //关闭遮罩
                            _fullLoading.close()
                        }
                    })


                })
            })
        },
        // 判断打开的是否是当前弹框
        isCurPage() {
             if(this.subState === 'taobaoHistoryOrder' && this.openModalState.name === globalConstant.openModalCodes.importModal) {
                return true
            }
            return false
        },
        addRow(scope) {
            this.tableData.push({
                id: moment().valueOf(),
                orderFile: {
                    name: '上传订单报表'
                },
                goodsFile: {
                    name: '上传宝贝报表'
                }
          })
        },
        clearUpload() {
            this.tableData = [{
                id: moment().valueOf(),
                orderFile: {
                    name: '上传订单报表'
                },
                goodsFile: {
                    name: '上传宝贝报表'
                }
          }]
        },
        removeRow(scope) {
            this.tableData = this.tableData.filter(o => {
               return o.id != scope.row.id
            })
        },
        // 创建导入分组
        doAddGroup() {
            // 非空
            if(!this.groupName) {
                this.errorMsg = '分组名称不能为空'
                return
            }
            // 已存在
            if(this.groupName) {
                var t = this.importGroupList.filter(o => {
                    return o.name == this.groupName
                })
                if(t.length > 0) {
                    this.errorMsg = '该分组名称已存在'
                    return
                }
            }
            this.errorMsg = ''
            this.getMemberCategory('导入会员批次').then(item => {
                this.addMemberGroup({
                    category_id: item.id,
                    title: this.groupName,
                    tag: '导入会员',
                    is_system: 1
                }).then(() => {
                    // 成功后的消息提示与分组数据刷新
                    this.$store.commit(TYPE.CALLBACK_MSG, globalConstant.callMsg.success_create)
                    this.isAddGroup = false
                    this.groupName = ''
                    this.getMemberGroup()
                    this.activeImportGroup = this.newAddGroupData.title
                })
            })
        },
        // 去淘宝下载历史数据
        goDownload() {
            window.open('https://tradearchive.taobao.com/trade/itemlist/list_export_order.htm?spm=a1z09.1.0.0.5FfpHR','_blank')
        }
    },
    components: {
        FileUpload
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/variable.scss';
.box {
    position: relative;
    margin: 20px;
    font-size: 12px;
    .ul_box {
        padding-left: 20px;
    }
    .ul_box>li {
            padding-left: 35px;
            padding-bottom: 25px;
            margin-left: 17px;
            border-left: 1px solid #0bb8f8;
            position: relative;
            font-size: 12px;
        }
    .ul_box>.num2_li {
            padding-bottom: 0px;
            position: relative;
            top: -15px;

        }
    h4 {
        margin:15px 0px 20px 5px;
        font-size: 16px;

    }
}
.num {
    color: #0bb8f8;
    background-color: #fff;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0px;
    left: -12px;
    border-radius: 100%;
    text-align: center;
    line-height: 20px;
    border: 1px solid #0bb8f8;
    font-size: 12px;
}
.bottom {
    position: relative;
    margin-top: 20px;
    padding-left: 35px;
    img {
        position: absolute;
        left: -46px;
        top: 10px;
        width: 40px
    }
    a {
        margin-left: 10px;
        i {
            margin-right: 10px;
        }
        &:hover {
            cursor: pointer;
        }
    }
    .add {
        width: $inputW;
    }

}
.table_box {
    text-align: center;
    font-size: 12px;
    a {
        text-decoration: underline;
        color: #0bb8f8;
    }
    .delet_rows {
        color: #FF9900;
    }
    .add_rows {
        margin-right: 8px;
    }
}
.pull-right{
    margin: 20px 25px 20px 0px;
}
.form_msg {
    position: absolute;
    top: 32px;
    left: 38px;
}

</style>

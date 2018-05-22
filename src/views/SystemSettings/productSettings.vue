<template>
    <div>
        <base-choose-goods ref="baseChooseGoods" listTableClass="user_tablelist_choosegoods" @cancelAllEdit="cancelAllEdit" :hideCheckbox="true" :hideBottom="true" @getGoods="getGoods" @getGoodsByParam="getGoodsByParam" :goodsData="goodsData" :filterGoodData="filterGoodData">
            <template slot="tableData" scope="props">
                <el-table :data="props.data" class="selectGoods" max-height="775">
                    <el-table-column width="70px" align="center" label="">
                        <template scope="scope">
                            <img :src="scope.row.pic_url" />
                        </template>
                    </el-table-column>
                    <el-table-column min-width="300" header-align="center" label="宝贝名称/ID">
                        <template scope="scope">
                            <div class="goodsName_row introduce">
                                <div>
                                    <p @click="g_const.goTaobaoDetail(scope.row.num_iid)()" class="sub_title link_underline">{{scope.row.title}}</p>
                                    <p>
                                        <span class="des">宝贝ID ：</span>{{scope.row.num_iid}}</p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="salesInventory" align="center" min-width="158px" label="近30天销量与库存">
                        <template scope="scope">
                            <div class="sale">
                                <p>30天销量
                                    <span class="num"> {{scope.row.sold_quantity}} </span>笔</p>
                                <p>库存
                                    <span class="num"> {{scope.row.num}} </span>件</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="110px" align="center" label="原价">
                        <template scope="scope">
                            <span>￥{{scope.row.price}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="138px" align="center" label="商品短名">
                        <template scope="scope">
                            <p v-show="!props.data[scope.$index].isEdit" :class="props.data[scope.$index].isUpdata ? 'is_edit_name' : scope.row.is_subtitle_edited == 1 ? '' : 'no_edit_name'">{{scope.row.sub_title}}</p>
                            <el-input v-show="props.data[scope.$index].isEdit" v-model="scope.row.sub_title"></el-input>
                            <span class="link_underline" @click="edit(scope.row.num_iid, scope, props.data)" v-show="!props.data[scope.$index].isEdit">
                                <a>编辑</a>
                            </span>
                            <span class="link_underline" v-show="props.data[scope.$index].isEdit" @click="saveSubtitle(scope.row.sub_title, scope.row.num_iid, scope.$index, props.data)">
                                <a>编辑完成</a>
                            </span>
                            <span class="link_underline" v-show="props.data[scope.$index].isEdit" @click="cancel(scope.$index, props.data)">
                                <a class="cancel link">取消</a>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </base-choose-goods>
        <div class='_overflow' v-if="first">
            <div class="pull-right send-test">
                <el-button class="skip" @click="skip('first')">跳过</el-button>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from '../../misc/utils'
import globalConstant from '../../misc/global.constant'
import baseChooseGoods from '../../components/list/baseChooseGoods'
export default {
    data() {
        return {
            g_const: globalConstant,
            first: false
        }
    },
    computed: {
        ...mapGetters([
            'subState',
            'openModalState',
            'filterGoodData',
            'goodsData',
        ])
    },
    mounted() {
        if (this.$refs.baseChooseGoods) {
            this.$refs.baseChooseGoods.refCancelAllEdit()
        }
        if(this.openModalState.name === this.g_const.openModalCodes.systemConfig && this.openModalState.param.state === 'projectSetting' && this.openModalState.param.first) {
            this.first = true
        }else {
            this.first = false
        }
    },
    methods: {
        ...mapActions([
            'updateSubTitle',
            'getGoods',
            'getGoodsByParam',
            'closeModal'
        ]),
        edit(id, scope, list) {
            var curObj = list[scope.$index]
            this.$set(curObj, 'isEdit', true)
            curObj.oldName = curObj.sub_title
        },
        cancel(index, list) {
            var curObj = list[index]
            curObj.sub_title = curObj.oldName
            curObj.isEdit = false
        },
        cancelAllEdit(list) {
            if (!list) return
            list.forEach((curObj, index) => {
                if (curObj.isEdit) {
                    curObj.isEdit = false
                    curObj.sub_title = curObj.oldName
                }
            })
        },
        saveSubtitle(subTitle, id, index, list) {
            if (subTitle.length === 0) {
                utils.showErrorMsg(this, '宝贝短名不能为空')
                return
            } else if (subTitle.length > 10) {
                utils.showErrorMsg(this, '宝贝短名不能超过10个字')
                return
            }
            if (list[index].sub_title != list[index].oldName) {
                this.updateSubTitle([subTitle, id]).then(o => {
                    utils.showSuccessMsg(this, '修改成功')
                    list[index].isEdit = false
                    list[index].isUpdata = true
                })
            } else {
                utils.showSuccessMsg(this, '修改成功')
                list[index].isEdit = false
            }
        },
        skip() {
            this.closeModal('systemModal')
        }
    },
    components: {
        baseChooseGoods
    }
}
</script>
<style lang="scss" scoped>
._overflow {
    overflow: hidden;
    border-top: solid 1px #cccccc;
    margin-top: 54px;
    .send-test {
        margin: 15px 10px 15px 0px;
        .el-button {
            padding-left: 20px;
            padding-right: 20px;
        }
    }
}
.no_edit_name {
    color: #ff7900;
}
.is_edit_name {
    color: #009933;
}
</style>

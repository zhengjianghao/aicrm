<template>
    <div>
        <table-list :sortBy="sortBy" :listTableClass="listTableClass" @getBaseList="searchRemote" @cancelAllEdit="cancelAllEdit" @getFilterList="searchLocal" ref="tableList" :filterListData="filterGoodData">
            <template slot="toolbox" scope="scope">
                <div class="user_toolbox user_toolbox_position">
                    <div class="toolbox_control">
                        宝贝状态 ：
                        <el-select style="width:200px;" v-model="activeGoodsState" @change="refsSearchIsAll" size="small">
                            <el-option v-for="(item, index) in goodStates" :label="item.label" :value="item.value" :key="item.value + index">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="toolbox_control">
                        宝贝类型 ：
                        <select-group :goodsCategory="goodsCategory" :activeCategory="activeSelectGoodsCategory"></select-group>
                    </div>
                    <search-input myPlaceholder="简称/名称/宝贝ID" ref="searchInput" :searchByWord="refsSearchIsAll" @sycnSearchWord="sycnSearchWord" :searchWord="searchKeyWord"></search-input>
                </div>
                <div v-show="!hideCheckbox" class="selectGood">
                    <el-checkbox style="padding-top: 3px" v-model="isCurPageCheckedAll" @change="doCheckedCurPage">本页全选</el-checkbox>
                    <el-checkbox v-model="isCurCheckedAll" @change="checkAll">全表全选</el-checkbox>
                    <span @click="clearAll()" class="link_underline">清空已选宝贝</span>
                    <el-checkbox class="pull-right" v-model="viewCheckedGoods" @change="doViewCheckedGoods(scope.pageObj)">查看已选的
                        <span class="chooseNum">{{ selGoodsNum }}</span>件宝贝</el-checkbox>
                </div>
            </template>
            <template slot="tableData" scope="scope">
                <el-checkbox-group v-model="selGoods">
                    <slot name="tableData" :data="scope.data" :selGoods="selGoods">
                        <el-table :data="scope.data" class="selectGoods" style="width:100%;max-height:815px" max-height="775">
                            <el-table-column align="center" width="50px" label="">
                                <template scope="scope">
                                    <el-checkbox :label="scope.row.num_iid" class="ckGroup"></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column width="70px" align="center" label="">
                                <template scope="scope">
                                    <img :src="scope.row.pic_url" />
                                </template>
                            </el-table-column>
                            <el-table-column min-width="300" label="宝贝名称/简称">
                                <template scope="scope">
                                    <div class="introduce">
                                        <div>
                                            <p @click="g_const.goTaobaoDetail(scope.row.num_iid)()" class="sub_title link">{{scope.row.sub_title}}</p>
                                            <span>
                                                <p class="des">{{scope.row.title}}</p>
                                            </span>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="num_iid" min-width="138px" label="宝贝ID">
                            </el-table-column>
                            <el-table-column min-width="158px" label="近30天销量与库存">
                                <template scope="scope">
                                    <div class="sale">
                                        <p>30天销量
                                            <span class="num"> {{scope.row.sold_quantity}} </span>笔</p>
                                        <p>库存
                                            <span class="num"> {{scope.row.num}} </span>件</p>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column width="100px" label="原价">
                                <template scope="scope">
                                    ￥
                                    <span class="price_style">{{scope.row.price}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </slot>
                </el-checkbox-group>
            </template>
        </table-list>
        <div v-if="!hideBottom" class="_overflow">
            <div class="pull-right send-test">
                <el-button type="primary" @click="save()">确定</el-button>
                <el-button @click="close()">关闭</el-button>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import selectGroup from '../../components/selectGroup/selectGroup'
import globalConstant from '../../misc/global.constant'
export default {
    data() {
        return {
            activeCategory: 'all',
            g_const: globalConstant,
            goodStates: globalConstant.goodsStates,
            activeGoodsState: globalConstant.goodsStates[1].value,
            searchKeyWord: '',
            viewCheckedGoods: false,
            selGoods: [],
            eleName: '',
            isCurCheckedAll: false,
            isCurPageCheckedAll: false
        }
    },
    computed: {
        ...mapGetters([
            'goodsCategory',
            'activeSelectGoodsCategory',
            'selectGoodsData',
            'openModalState'
        ]),
        selGoodsNum() {
            return this.selGoods ? this.selGoods.length : 0
        }
    },
    watch: {
        // 宝贝分类查询
        activeSelectGoodsCategory() {
            this.refsSearchLocal(true)
        },
        // 获取选中的宝贝ids
        selectGoodsData() {
            this.init()
            this.selGoods = [].concat(this.selectGoodsData.selectGoods)
            this.eleName = this.selectGoodsData.eleName
        },
        selGoods() {
            // 是否全表全选
            this.isCurCheckedAll = this.checkIsCheckedAll()
            // 是否本页全选
            this.isCurPageCheckedAll = this.checkIsCurPageCheckedAll()
        },
        filterGoodData() {
            // 是否全表全选
            this.isCurCheckedAll = this.checkIsCheckedAll()
            // 是否本页全选
            this.isCurPageCheckedAll = this.checkIsCurPageCheckedAll()
        },
        // 弹框打开时执行
        openModalState() {
            if (this.openModalState.name === this.g_const.openModalCodes.chooseGoods || this.openModalState.name === this.g_const.openModalCodes.chooseGoodsLevel) {
                // 清空查询参数
                this.viewCheckedGoods = false
                // 远程获取数据
                this.$refs.tableList.init()
            }
        }
    },
    mounted() {
        // 用于处理第一次加载的时候，watch为监听到selectGoodsData的改变
        this.eleName = this.selectGoodsData.eleName
        this.selGoods = [].concat(this.selectGoodsData.selectGoods)
        // 加载宝贝分类数据
        //判断为空的时候请求
        if(this.goodsCategory.length <= 1) {
            this.getGoodsCategory()
        }
        // 清空查询参数
        this.clearSearchParam()
        // 远程获取数据
        this.$refs.tableList.init()
    },
    methods: {
        ...mapActions([
            'getGoodsCategory',
            'updateOpenModal',
            'updateSelectGoods',
            'updateActiveGoodsCategory'
        ]),
        refCancelAllEdit() {
            this.$refs.tableList.cancelAllEdit()
        },
        cancelAllEdit(list) {
            this.$emit('cancelAllEdit', list)
        },
        // 查看选中宝贝
        doViewCheckedGoods() {
            this.refsSearchLocal()
        },
        // 关闭弹框
        close() {
            this.updateOpenModal({
                name: this.g_const.openModalCodes.chooseGoods,
                isOpen: false
            })
        },
        // 保存并关闭弹窗
        save() {
            this.updateOpenModal({
                name: this.g_const.openModalCodes.chooseGoods,
                isOpen: false
            })
            this.updateSelectGoods({
                selectGoods: this.selGoods,
                eleName: this.eleName
            })
        },
        // 页面初始化操作
        init() {
            // 清空查询参数
            this.clearSearchParam()
            // this.refsSearchLocal(true)
        },
        // 调用子组件的检索 本地
        refsSearchLocal(isAll) {
            // 不选中‘查看选中的宝贝’
            if (isAll && this.viewCheckedGoods) {
                this.viewCheckedGoods = false
            } else {
                if (this.$refs.tableList) {
                    this.$refs.tableList.resetPageNum()
                    this.$refs.tableList.searchLocal()
                }
            }
        },
        // 调用子组件的检索 远程
        refsSearchRemote() {
            if (this.$refs.tableList) {
                this.$refs.tableList.searchRemote()
            }
        },
        refsSearchIsAll() {
            this.refsSearchLocal(true)
        },
        // 清空页面参数
        clearSearchParam() {
            this.activeGoodsState = this.g_const.goodsStates[1].value
            this.updateActiveGoodsCategory('all')
            this.$refs.searchInput.init()
            this.searchKeyWord = ''
        },
        // 同步检索关键字
        sycnSearchWord(val) {
            this.searchKeyWord = val
        },
        // 加载数据
        search(pagination) {
            this.$emit('getGoodsByParam', [this.activeGoodsState, this.activeSelectGoodsCategory, this.searchKeyWord, false, pagination, this.selectGoodsData.activeItems, this.selectGoodsData.curLevel])
        },
        // 查询已选宝贝
        searchSelGoods(pagination) {
            var tempSelGoods = this.selGoods
            this.$emit('getGoodsByParam', ['all', 'all', '', tempSelGoods, pagination, this.selectGoodsData.activeItems, this.selectGoodsData.curLevel])
        },
        // 子组件回调函数 远程
        searchRemote([pagination, sortBy]) {
            // 不进行潜需排行
            if (!this.selectGoodsData.activeItems) {
                this.$emit('getGoods', [pagination])
            } else { //进行潜需排行
                this.$emit('getGoods', [pagination, this.selectGoodsData.activeItems, this.selectGoodsData.groupId, this.selectGoodsData.curLevel])
            }
        },
        // 子组件回调函数 本地
        searchLocal([pagination, sortBy]) {
            if (!this.selectGoodsData.activeItems) {
                if (this.viewCheckedGoods) {
                    this.searchSelGoods(pagination)
                } else {
                    this.search(pagination)
                }
            } else { //进行潜需排行
                if (this.viewCheckedGoods) {
                    this.searchSelGoods(pagination, this.selectGoodsData.activeItems, this.selectGoodsData.curLevel)
                } else {
                    this.search(pagination, this.selectGoodsData.activeItems, this.selectGoodsData.curLevel)
                }
            }

        },
        // 勾选选中的宝贝
        checkedSelGoods(val) {
            var ret = false
            for (var i = 0; i < this.selGoods.length; i++) {
                if (this.selGoods[i] === val) {
                    ret = true
                    break
                }
            }
            return ret
        },
        // 通用选中
        commonCheck(checked, id) {
            if (checked) {
                if (!this.checkedSelGoods(id)) {
                    this.selGoods.push(id)
                }
            } else {
                if (this.checkedSelGoods(id)) {
                    this.selGoods = this.selGoods.filter(o => {
                        return o !== id
                    })
                }
            }
        },
        // 选中事件
        doChecked(event, id) {
            var checked = event.target.checked
            this.commonCheck(checked, id)
        },
        // 本页全选
        doCheckedCurPage(event) {
            if (this.filterGoodData.curPageData) {
                this.filterGoodData.curPageData.forEach(o => {
                    this.doChecked(event, o.num_iid)
                })
            }
        },
        // 全选
        checkAll(event) {
            if (this.filterGoodData.filterData) {
                this.filterGoodData.filterData.forEach(o => {
                    this.doChecked(event, o.num_iid)
                })
            }
        },
        // 全不选
        clearAll() {
            this.selGoods = []
        },
        // 是否本页全选
        checkIsCurPageCheckedAll() {
            if (!this.filterGoodData.curPageData) return false
            var ret = false
            for (var j = 0; j < this.filterGoodData.curPageData.length; j++) {
                ret = false
                var o = this.filterGoodData.curPageData[j]
                for (var i = 0; i < this.selGoods.length; i++) {
                    if (this.selGoods[i] === o.num_iid) {
                        ret = true
                        break
                    }
                }
                if (!ret) {
                    break
                }
            }
            return ret
        },
        // 是否全选
        checkIsCheckedAll() {
            var retData = this.filterGoodData.filterData
            if (!retData) return false
            var tempObj = {}
            var tempArray = []
            for (var i = 0; i < this.selGoods.length; i++) {
                var id = this.selGoods[i]
                if (!tempObj[id]) {
                    tempArray.push(id)
                }
            }
            if (retData.length === 0) return false
            if (tempArray.length === retData.length) {
                return true
            } else {
                return false
            }
        }
    },
    components: {
        selectGroup
    },
    props: [
        'sortBy',
        'hideCheckbox',
        'hideBottom',
        'listTableClass',
        'filterGoodData',
        'goodsData'
    ]
}
</script>
<style lang="scss" scoped>
@import '../../style/variable.scss';
$commonColor: #365964;
$commonColor_low: #AAAAAA;
.user_toolbox {
    .choosed {
        margin-top: 16px;
    }
}

.user_tablelist {
    overflow: hidden;
    color: $commonColor;
}

.el-table::after {
    width: 0px;
}

.send-test {
    margin: 15px 10px 15px 0px;
    .el-button {
        padding-left: 20px;
        padding-right: 20px;
    }
}

.selectGood {
    height: 38px;
    line-height: 35px;
    font-size: $menuFontSize;
    margin: 0px 18px 0px 18px;
    background: $modal-bg;
    a {
        text-decoration: underline;
        color: #0099ff;
    }
    .link_underline {
        color: #0099ff;
    }
    .el-checkbox {
        margin: 0px 15px;
        .chooseNum {
            font-size: 18px;
            margin: 0 4px;
            color: #0099ff;
        }
    }
}

._overflow {
    overflow: hidden;
    border-top: solid 1px #cccccc;
    margin-top: 54px;
}
</style>

<template>
    <div class="sub_main_content">
        <div>
            <el-row type="flex">
                <!-- 遍历主菜单下的营销列表 -->
                <el-col :span="24" v-for="(item, index) in homeData" v-if="item.name!='自定义' && isShowSiderbar(item.name)" :key="item.name + index">
                    <div class="menu">
                        <div class="header">
                            <div class="line">
                                <div>
                                    <span class="iconfont icon-dengbiansanjiao"></span>
                                </div>
                            </div>
                            <div class="header_name">
                                <!-- 输出营销类型的名称和图标 -->
                                <i class="iconfont icon_header" :class='item.icon'></i>{{item.name}}
                            </div>
                        </div>
                        <div class="menu_body">
                            <ul>
                                <!--遍历指定营销类型下的营销任务-->
                                <template v-for="value in item.submenus">
                                    <!--输出 开发完成的营销任务-->
                                    <li v-if="value.finishState != 0 && value.finishState != 1" :key="value.name" class="menu_bottom" @click="go(value,value.path)">{{value.name}}
                                        <span class="finish_state">{{getfinishState[value.finishState] }}</span>
                                    </li>
                                    <!--输出 尚未开发的营销任务-->
                                    <li v-if="(value.finishState == 0 ?jurisdictionData.secondShow : false) || value.finishState == 1" class="menu_bottom" :key="value.name"  :class="getJurisdictionUser(value.finishState) ? '': 'nocolor'" @click="getJurisdictionUser(value.finishState) ? go(value,value.path) : ''">
                                        {{value.name}}
                                        <span :class="value.finishState == 0 ? 'finish_state_n':'finish_state_r'">{{getfinishState[value.finishState] }}</span>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
export default {
    data() {
        return {
            g_const: globalConstant,
            const_menuCode: globalConstant.activeMenuCodes
        }
    },
    computed: {
        ...mapGetters([
            'jurisdictionData',
            'menuState'
        ]),
        getfinishState() {
            return this.g_const.finishState.map(o => {
                return o
            })
        }
    },
    mounted() {
        // 头部菜单激活
        this.getActiveMenuCode(this.menuCodes)
        this.updateSiderbarActiveNode({
            id: '',
            openName: ''
        })

    },
    methods: {
        ...mapActions([
            'updateSiderbarActiveNode',
            'getActiveMenuCode'
        ]),
        getCustomerTask(list, value) {
            if (!list) return []
            return list.filter(o => {
                return o.type.indexOf(value.types) === 0 && o.type.indexOf('_P4P_CUSTOM') > 0
                //&& (value.finishState == 2 ? true : this.getJurisdictionUser(value.finishState))
            })
        },
        //返回是否有权限查看开发中的营销
        getJurisdictionUser(value) {
            if (((this.jurisdictionData.secondShow) && value == 1) || ((this.jurisdictionData.allShow) && value == 0)) {
                return true
            } else {
                return false
            }
        },
        go(item, path) {
            var group
            this.updateSiderbarActiveNode({
                id: item.id,
                openName: group,
                name: item.name
            })
            this.$router.push({
                path: path,
                query: this.getParam(item)
            })
        },
        getParam(item) {
            var menuCode = this.menuState
            var paramObj = {
                id: item.id
            }
            if (menuCode === this.const_menuCode.dataChart) {
                paramObj['name'] = item.name
                paramObj['group'] = item.group
            }
            return paramObj
        },
        //隐藏正常版本中的一些内容(其他地方也是用这个方法)
        isShowSiderbar(name) {
            var isJur =  this.jurisdictionData.secondShow
            var _name = name === '分布相关'
            return _name ? isJur ? true : false : true
        }
    },
    props: ['homeData', 'menuCodes']
}
</script>
<style lang="scss" scoped>
@import '../../style/variable.scss';
.header {
    background-color: #f7fbfc;
    border-bottom: 1px solid #dce1e4;
    text-align: center;
    font-size: 16px;
    position: relative;
    height: 100px;
    color: #afb3bc;
}

.line {
    height: 5px;
    background-color: #f7fbfc;
    position: absolute;
    width: 100%;
    bottom: 0px;
    span {
        font-size: 10px;
        position: relative;
        top: -12px;
        color: #f7fbfc;
    }
}

.header_name {
    position: relative;
    font-size: 16px;
    top: 30px;
}

.el-col:hover {
    cursor: pointer;
    .line {
        background: $primary;
        span {
            color: $primary;
        }
    }
    .header_name {
        color: $primary;
    }
}

.el-col {
    border-right: 1px solid #dce1e4;
}

.menu_bottom {
    padding: 15px 0px;
    border-bottom: 1px solid #dce1e4;
    text-align: center;
    font-size: 12px;
    color: #333;
}

.menu_bottom_head {
    color: #afb3bc;
    background: #f7f8f9;
    height: 24px;
    line-height: 24px;
    text-align: center;
    padding: 0px;
    &:hover {
        cursor: default;
        color: #afb3bc;
    }
}

li:hover {
    color: $primary;
    cursor: pointer;
}

.nocolor:hover {
    color: #333;
    cursor: not-allowed;
}

.icon_header {
    font-size: 20px;
    padding-right: 10px;
}

.finish_state_n {
    color: #999999;
}

.finish_state_r {
    color: #0BB8F8;
}

.finish_state {
    color: #009933;
}
</style>

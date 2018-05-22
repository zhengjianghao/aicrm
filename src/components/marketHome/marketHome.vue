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
                                <i class="iconfont icon_header" :class='item.icon'></i>
                                <span class="icon_word">{{item.name}}</span>
                            </div>
                        </div>
                        <div class="menu_body">
                            <ul>
                                <!--遍历指定营销类型下的营销任务-->
                                <template v-for="value in item.submenus">
                                    <!--输出 开发完成的营销任务-->
                                    <li :key="value.name" v-if="value.name == '态度流失一览' && jurisdictionData.secondShow" class="menu_bottom" @click="go('态度流失一览', value.path)">
                                        <span :class='value.className'>{{value.name}}</span>
                                        <span :class="value.finishState == 1 ? 'finish_state_r': value.finishState == 2 ? 'finish_state' : 'finish_state_n'">{{getfinishState[value.finishState] }}</span>
                                    </li>
                                    <template v-for="(data, index) in marketJobByParam" v-if="data.type.indexOf(value.type) == 0 && value.finishState != 0 && value.finishState != 1">
                                        <li :key="index" class="menu_bottom" @click="go(data, value.path)">{{value.name}}
                                            <span class="finish_state">{{getfinishState[value.finishState] }}</span>
                                        </li>
                                    </template>
                                    <!--输出 尚未开发的营销任务-->
                                    <!--隐藏未开发的场景-->
                                     <!--<template v-for="data in marketJobByParam" v-if="data.type.indexOf(value.type) == 0 && (value.finishState == 0 || value.finishState == 1)">-->
                                    <!--<template v-for="data in marketJobByParam" v-if="data.type.indexOf(value.type) == 0 && ((value.finishState == 0 ? jurisdictionData.secondShow : false) || value.finishState == 1)">
                                        <li class="menu_bottom" :class="getJurisdictionUser(value.finishState) ? '': 'nocolor'" @click="getJurisdictionUser(value.finishState) ? go(data,value.path) : ''">
                                            {{value.name}}
                                            <span :class="value.finishState == 0 ? 'finish_state_n':'finish_state_r'">{{getfinishState[value.finishState] }}</span>
                                        </li>
                                    </template>-->
                                </template>
                                <!--遍历自定义营销任务-->
                                <!--<template v-for="value in item.submenus">-->
                                <!--输出 开发完成的营销任务(自定义)-->
                                <template v-for="(data, index) in getCustomerTask(marketJobByParam, item.submenus)">
                                    <div :key="index">
                                        <li  v-if="index === 0" class="menu_bottom menu_bottom_head">自定义</li>
                                        <li class="menu_bottom" @click="go(data,data.path)">
                                            {{data.title}}
                                            <span class="finish_state">{{getfinishState[data.finishState] }}</span>
                                        </li>
                                    </div>
                                    
                                </template>
                                <!--</template>-->
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
import utils from '../../misc/utils'
export default {
    data() {
        return {
            g_const: globalConstant,
            coust: 0,
            testF: false,
            utils: utils
        }
    },
    computed: {
        ...mapGetters([
            'marketJobByParam',
            // 'userData',
            'jurisdictionData'
        ]),
        getfinishState() {
            return this.g_const.finishState.map(o => {
                return o
            })
        }
    },
    // 这部分代码应该写错了 先注释掉
    // 第一次加载(页面刷新)
    // mounted() {
    //     this.doActive()
    // },
    // // 组件被激活
    // deactivated() {
    //     this.doActive()
    // },
    // 修改后的代码
    activated() {
        this.doActive()
    },
    methods: {
        ...mapActions([
            'updateSiderbarActiveNode',
            'getActiveMenuCode'
        ]),
        doActive() {
            this.getActiveMenuCode(this.menuCodes)
            this.updateSiderbarActiveNode({
                id: '',
                openName: ''
            })
        },
        getCustomerTask(list, value) {
            if (!list) return []
            return list.filter(o => {
                var count = 0
                for (var i in value) {
                    if (o.type.indexOf(value[i].types) === 0 && o.type.indexOf('_P4P_CUSTOM') > 0) {
                        o.finishState = value[i].finishState
                        o.path = value[i].path
                        count++
                    }
                }
                return count > 0
                //return o.type.indexOf(value.types) === 0 && o.type.indexOf('_P4P_CUSTOM') > 0
                //&& (value.finishState == 2 ? true : this.getJurisdictionUser(value.finishState))
            })
        },
        //返回是否有权限查看开发中的营销
        getJurisdictionUser(value) {
            //var isShow = this.g_const.user_jurisdiction.indexOf(this.userData.user_id) >= 0 ? true : this.g_const.user_jurisdiction_part.indexOf(this.userData.user_id) >= 0 ? 'part' : false
            if (((this.jurisdictionData.secondShow) && value == 1) || ((this.jurisdictionData.allShow) && value == 0)) {
                return true
            } else {
                return false
            }
        },
        go(item, path) {
            var group
            if (item.type === 'PAYED_P4P_SYS') {
                group = '即时营销'
            } else if (item.type === 'POTENTIAL_P4P_SYS') {
                group = '复购营销'
            } else if (item.type === 'PAYED_P4P_CUSTOM' || 'POTENTIAL_P4P_CUSTOM') {
                group = '自定义'
            }
            if(item == '态度流失一览') {
                this.updateSiderbarActiveNode({
                id: '',
                openName: '态度不满流失',
                name: '态度流失一览'
            })
            }else {
                this.updateSiderbarActiveNode({
                    id: item.id,
                    openName: group,
                    name: item.name
                })
            }
            // this.updateSiderbarActiveNode({
            //     id: item.id,
            //     openName: group,
            //     name: item.name
            // })
            this.$router.push({
                path: path,
                query: {
                    id: item.id,
                    type: item.type
                }
            })
        },
        //隐藏正常版本中的一些内容(其他地方也是用这个方法)
        isShowSiderbar(name) {
            var isJur =  this.jurisdictionData.secondShow
            var _name =  name === '新人礼' || name === '店内大力度激活' || name === '分布相关'
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
    font-size: 22px;
    padding-right: 10px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
}

.icon_word {
    font-size: 14px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
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

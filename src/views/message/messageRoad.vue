<template>
    <div style="padding-bottom: 20px;">
        <div class="user_toolbox">
            <div class="toolbox_control">
                <el-button size="small" :disabled="roadConfigure.initValue.state" @click="chooseRoad('LOW')">全选普通短信通道</el-button>
                <el-button size="small" :disabled="roadConfigure.initValue.state" @click="chooseRoad('HIGH')">全选阿里优质短信通道</el-button>
                <div class="otherRoad">
                    <el-checkbox @change='changeAutoRoad' v-model="roadConfigure.roadcheck" true-label="1" false-label="0">当一个通道用光时自动切换到另外一个通道</el-checkbox>
                </div>
            </div>
            <div class="switch_box pull-right">
                <div class="switch_small">
                    <switch-big class="pull-right" :initValue="roadConfigure.initValue" @change="switchState"></switch-big>
                </div>
                <p>
                    <AI></AI> 智慧管理</p>
            </div>
        </div>
        <div class="of_c nice_scroll message-road">
            <!-- 延迟渲染 -->
            <lazy-render minHeight="430px" time="100">
                <el-collapse>
                    <!--短信通道设置（针对各营销任务）start-->
                    <!--遍历父级菜单-->
                    <el-collapse-item v-for="(item, index) in allData" :id="'mark' + index" :key="index">
                        <template slot="title">
                            <!--父菜单名称-->
                            {{item.name}}
                        </template>
                        <el-collapse>
                            <!--遍历子级菜单-->
                            <el-collapse-item v-for="value in item.mainData" :key="value.name">
                                <template slot="title">
                                    <!--子菜单名称-->
                                    {{value.name}}
                                </template>
                                <!--遍历子菜单下的营销任务-->
                                <template v-for="(markerTs, index) in value.submenus">
                                    <!--输出营销任务名称、短信通道选择下拉框、开发状态（后端未添加初始值则不显示‘markerTs.type.indexOf(marketT.type) == 0’）-->
                                    <el-row class="road_select road_position_choose" v-for="(marketT, index) in messageRoad.types" v-if="markerTs.type.indexOf(marketT.type) == 0 && (markerTs.finishState == 0 ? jurisdictionData.secondShow : true)" :key="markerTs.name + index">
                                        <el-col :span='5'>
                                            <span>{{markerTs.name}}</span>
                                        </el-col>
                                        <el-col :span='19'>
                                            <el-select v-model="marketT.state" @visible-change="changeVal(marketT.state, marketT, messageRoad.types, marketT.type, $event)" :disabled="roadConfigure.initValue.state || getJurisdictionUser(markerTs.finishState)">
                                                <el-option v-for="items in options" :label="items.label" :value="items.value" :key="items.value">
                                                </el-option>
                                            </el-select>
                                            <span v-show="markerTs.finishState == 1" style="color: #0BB8F8">测试中</span>
                                            <span v-show="markerTs.finishState == 0" style="color: #999999">待开发</span>
                                        </el-col>
                                    </el-row>
                                </template>
                            </el-collapse-item>
                        </el-collapse>
                    </el-collapse-item>
                    <!--短信通道设置 end-->
                </el-collapse>
            </lazy-render>
        </div>
        <div class="position_quick link">
            <a href="#mark0">
                <span class="el-icon-caret-top" >
                </span>
                回到顶部
            </a>
            <div class="position_icon">
                <span class="iconfont icon-link"></span>快速定位</div>
            <div class="position_ul">
                <ul>
                    <template v-for="(mark,index) in allData">
                        <li :key="index" :class="vm.activeLineName === mark.name ? 'li_checked' : ''" @click="positionQuick(mark.name)">
                            <a :href="'#mark'+index">{{mark.name}}</a>
                        </li>
                    </template>
                </ul>
            </div>
            <div class="last_disc">

            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import moment from 'moment'
export default {
    data() {
        return {
            vm: {
                activeTabName: 'HIGH',
                activeLineName: '流失防御',
                state: '开启',
            },
            allData: globalConstant.allMarket,
            roadConfigure: {
                market_IM: '',
                market_PDM: '',
                roadcheck: '',
                initValue: { type: 'road', state: '' },
            },
            options: [{ label: "阿里优质短信通道", value: "HIGH" }, { label: "普通短信通道", value: "LOW" }]
        }
    },
    watch: {
        messageRoad() {
            this.roadConfigure.roadcheck = this.messageRoad.CHANNEL_AI
            if (this.messageRoad.CHANNEL_SWITCH === '1') {
                this.roadConfigure.initValue.state = true
            } else if (this.messageRoad.CHANNEL_SWITCH === '0') {
                this.roadConfigure.initValue.state = false
            }
        }
    },
    mounted() {
        this.getMessageRoad()
        this.roadConfigure.roadcheck = this.messageRoad.CHANNEL_AI
        this.roadConfigure.market_PDM = this.messageRoad.POTENTIAL
        if (this.messageRoad.CHANNEL_SWITCH === '1') {
            this.roadConfigure.initValue.state = true
        } else if (this.messageRoad.CHANNEL_SWITCH === '0') {
            this.roadConfigure.initValue.state = false
        }
    },
    computed: {
        ...mapGetters([
            'messageRoad',
            'marketJobByParam',
            'messageRoadNoChange',
            'jurisdictionData'
        ])
    },
    methods: {
        ...mapActions([
            'getMessageRoad',
            'updateMessageRoad', //更新需要传给后端的短信通道值
            'updateNochangeRoad',
            'changeRoadData',
        ]),
        collapse(name) {

        },
        //权限
        getJurisdictionUser(value) {
            if (((this.jurisdictionData.secondShow) && value == 1) || ((this.jurisdictionData.allShow) && value == 0) || value == 2) {
                return false
            } else {
                return true
            }
        },
        switchTab(name) {
            this.vm.activeTabName = name
        },
        positionQuick(name) {
            this.vm.activeLineName = name
        },
        // 短信通道切换开关
        switchState(obj) {
            this.roadConfigure.initValue.state = obj.state;
            var state;
            if (this.roadConfigure.initValue.state) {
                state = '1'
            } else {
                state = '0'
            }
            this.updateNochangeRoad({name: 'CHANNEL_SWITCH', value: state})
            this.updateRoad()
        },
        //短信通道点击
        changeVal(value, row, allRoad, type, e) {
            if(e == true) {
                row.oldState = value
            }else if(e == false) {
                if(row.oldState == row.state) {
                }else {
                    this.updateNochangeRoad({name: type, value: row.state})
                    this.updateRoad()
                }
            }
        },
        //是否一个通道用完使用另一个
        changeAutoRoad() {
            this.updateNochangeRoad({name: 'CHANNEL_AI', value: this.roadConfigure.roadcheck})
            this.updateRoad()
        },
        // 更新短信通道
        updateRoad(road) {
            this.updateMessageRoad(this.messageRoadNoChange)
        },
        chooseRoad(road) {
            let that = this
            var _road = this.messageRoadNoChange
            this.$confirm('是否确认修改通道?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.changeRoadData(road)
                this.updateNochangeRoad({name: 'road', value: road})
                this.updateRoad()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    customClass: 'message_position',
                    message: '已取消修改'
                })
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.road_position_choose {
    margin: 10px 0 0 40px;
}

.position_quick {
    position: fixed;
    right: 90px;
    bottom: 60px;
    font-size: 12px;
    .position_icon {
        margin-top: 20px;
        .icon-link {
            font-size: 16px;
            margin: 0px 10px;
        }
    }
}

.position_ul {
    border-left: solid 1px #9a9a9a;
    padding-bottom: 20px;
    position: relative;
    left: 16px;
    ul {
        list-style: disc;
        color: #9a9a9a;
        position: relative;
        li {
            margin-left: 17px;
            font-size: 24px;
            height: 28px;
            line-height: 28px;
            a {
                display: inline-block;
                font-size: 12px;
                color: #9a9a9a;
            }
        }
        li.li_checked {
            color: #00BBFF;
            a {
                color: #00BBFF;
            }
        }
    }
}

.last_disc {
    border: solid 2px #9a9a9a;
    border-radius: 6px;
    width: 6px;
    height: 6px;
    position: relative;
    left: 12px;
}

.el-icon-caret-top {
    font-size: 8px;
    display: inline-block;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: #ffffff;
    background: #cccccc;
    border-radius: 5px;
    margin: 0px 10px 0px 8px;
}

.user_toolbox {
    .toolbox_control {
        padding-top: 8px;
    }
}

.otherRoad {
    margin-top: 5px;
}

.switch_box {
    padding-top: 8px;
    padding-right: 20px;
    overflow: hidden;
    p {
        clear: both;
        margin-top: 5px;
    }
    .switch_small {
        .switch-out {
            height: 30px;
            line-height: 30px;
        }
    }
}

.of_c {
    max-height: 410px;
    min-height: 410px;
    overflow: auto;
    padding-bottom: 20px;
}

.road_select {
    height: 30px;
    line-height: 32px;
}
</style>

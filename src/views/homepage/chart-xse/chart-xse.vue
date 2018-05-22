<template>
    <div class="chartWaper" v-loading="loading" element-loading-text="加载中">
        <div id="chartXseId" class="wrap"></div>
        <div class="img_name">
            <span>产出销售额波谱图</span>
        </div>
        <div class="toolBox">
            <span class='line_ave' @click='showAve'>
                <span v-if='!isShowAve'>显示均值辅助线</span>
                <span v-else>隐藏均值辅助线</span>
            </span>
            <el-select popper-class="chartSel" v-model="selMonthCount" @change="search()" class="w_1" placeholder="请选择">
                <el-option v-for="month in global.monthCounts" :label="month.label" :value="month.value" :key="month.value">
                </el-option>
            </el-select>
        </div>
        <div class="noData" v-show="isEmpty">
            <span>暂无数据</span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6" scoped>
import chartXse from './chart-xse.service'
import globalConstant from '../../../misc/global.constant'
import utils from '../../../misc/utils'
import chartHelper from '../../../misc/chartHelper'
import API_MARKETING from '../../../service/marketing.service'
import echarts from 'echarts'
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            chart: {},
            global: globalConstant,
            selMonthCount: globalConstant.monthCounts[4].value,
            loading: false,
            isEmpty: false,
            chartXseSer: chartXse,
            utils: utils,
            xseData: '',
            isShowAve: false,
            chartHelper: chartHelper,
            allAverage: {} //平均分割线
        }
    },
    computed: {
        ...mapGetters(['subState', 'jurisdictionData'])
    },
    watch: {
        subState() {

        }
    },
    mounted() {
        this.chart = echarts.init(document.getElementById('chartXseId'))
        this.draw()
        this.getchartdata()
    },
    methods: {
        getchartdata() {
            var that = this
            this.loading = true
            //需要修改
            API_MARKETING.getChartCCXseData(this.selMonthCount).then(data => {
                var _data = []
                for (var i in data.data) {
                    _data.push([data.data[i].day, data.data[i].count])
                }
                that.xseData = _data
                that.allAverage = chartHelper.calAverage(_data, that.selMonthCount)
                that.loading = false
                that.draw()
                that.checkIsEmpty()
            })
        },
        checkIsEmpty() {
            if (this.xseData && this.xseData.length > 0) {
                this.isEmpty = false
            } else {
                this.isEmpty = true
            }
        },
        //显示均值辅助线
        showAve() {
            this.isShowAve = !this.isShowAve
            this.loading = true
            var that = this
            // 为了出现遮罩
            setTimeout(o => {
                that.draw()
            }, 100)
            // this.draw()
        },
        draw() {
            var opt = this.chartXseSer.createOption(this.xseData, this.selMonthCount, this.isShowAve, this.allAverage)
            this.chart.setOption(opt)
            this.loading = false
        },
        search() {
            this.getchartdata()
        }
    }
}
</script>
<style lang="scss" scoped>
.chartWaper {
    height: 450px;
    position: relative;
    .wrap {
        height: 100%;
    }
    .img_name {
        position: absolute;
        top: 16px;
        left: 40%;
        color: #5f646a;
        font-size: 14px;
    }
    .toolBox {
        position: absolute;
        top: 7px;
        right: 70px;
        .line_ave {
            font-size: 12px;
            color: #ffffff;
            cursor: pointer;
        }
        .w_1 {
            width: 100px;
        }
        .w_2 {
            width: 130px;
        }
    }
    .noData {
        position: absolute;
        top: 200px;
        width: 100%;
        color: #ffffff;
        text-align: center;
    }
}
</style>

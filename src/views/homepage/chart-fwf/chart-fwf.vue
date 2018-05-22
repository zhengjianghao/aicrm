<template>
    <div class="chartWaper" v-loading="loading" element-loading-text="加载中">
        <div id="chartFwfId" class="wrap"></div>
        <div class="img_name">
            <span>服务费波谱图</span>
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
import chartFwf from './chart-fwf.service'
import globalConstant from '../../../misc/global.constant'
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
            chartFwfSer: chartFwf,
            fwfData: '',
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
            if (this.subState === this.global.activeCode.fwf) {
                this.doActiveChart()
            }
        },
    },
    mounted() {
        this.chart = echarts.init(document.getElementById('chartFwfId'))
        this.draw()
        this.getchartdata()
    },
    methods: {
        getchartdata() {
            var that = this
            this.loading = true
            //需要修改
            API_MARKETING.getChartFwfData(this.selMonthCount).then(data => {
                that.fwfData = data
                that.allAverage = chartHelper.calAverage(data, that.selMonthCount)
                that.loading = false
                that.draw()
                that.checkIsEmpty()
            })
        },
        // 激活图表
        doActiveChart() {
            // 未有复购周期数据,则获取
            if(!this.fwfData || this.fwfData.length === 0) {
                this.getchartdata()
                this.chart.resize()
                chartHelper.autoSize(this.chart);
            } else {
                this.draw()
                this.chart.resize()
                chartHelper.autoSize(this.chart);
            }
        },
        checkIsEmpty() {
            if (this.fwfData && this.fwfData.length > 0) {
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
            var opt = this.chartFwfSer.createOption(this.fwfData, this.selMonthCount, this.isShowAve, this.allAverage)
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

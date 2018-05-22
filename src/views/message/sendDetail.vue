<template>
    <table-list :sortBy="sortBy" :showQuickSearchByDays="true" :showDateRangeSearch="true" :showSearchKey="false" dateRangeSearchPlaceholder="信息推送时间" @getBaseList="searchRemote" @getFilterList="searchLocal" ref="tableList" :filterListData="sendDetailData">
        <template slot="tableData" scope="scope">
            <el-table :data="scope.remotePageData" stripe max-height="580" border>
                <el-table-column min-width="130" align="center" label="买家ID/发送时间">
                    <template scope="scope">
                        <p style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;width: 130px">{{scope.row.buyer_nick}}</p>
                        <p>{{scope.row.send_time}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="channel" align="center" min-width="95" label="短信通道">
                </el-table-column>
                <el-table-column prop="marketing_job" align="center" min-width="110" label="营销任务">
                    <template scope="scope">
                        {{scope.row.marketing_job}}
                    </template>
                </el-table-column>
                <el-table-column prop="price" header-align="center" label="短信单价" min-width="55" align="right">
                    <template scope="scope">
                        {{scope.row.price}}
                    </template>
                </el-table-column>
                <el-table-column prop="sms_count" header-align="center" label="条数" min-width="55" align="right">
                </el-table-column>
                <el-table-column min-width="280" header-align='center' prop="content" label="短信内容">
                </el-table-column>
            </el-table>
        </template>
    </table-list>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
        }
    },
    mounted() {
        this.init()
    },
    computed: {
        ...mapGetters([
            'sendDetailData'
        ])
    },
    watch: {
    },
    methods: {
        ...mapActions([
            'getSendDetail',
        ]),
        init() {
            this.$refs['tableList'].init()
        },
        // 获取远程数据
        searchRemote([pagination, days, startDate, endDate, search_word, sortBy]) {
            if (startDate && endDate) {
                days = ''
            }
            // 主动获取数据
            this.getSendDetail([pagination, days, startDate, endDate, search_word])
        },
        // 处理本地数据
        searchLocal([pagination, search_word, days, startDate, endDate, sortBy]) {
            // 主动获取数据
            this.getSendDetail([pagination, days, startDate, endDate, search_word])
        }
    },
    props: [
        'sortBy'
    ]
}
</script>
<style lang="scss" scoped>

</style>

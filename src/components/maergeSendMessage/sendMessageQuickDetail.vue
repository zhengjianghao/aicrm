<template>
    <table-list :sortBy="sortBy" :showQuickSearchByDays="true" :showDateRangeSearch="true" :showSearchKey="true" dateRangeSearchPlaceholder="信息推送时间" @getBaseList="searchRemote" @getFilterList="searchLocal" ref="tableList" :filterListData="sendQuickDetail">
        <template slot="tableData" scope="scope">
            <el-table :data="scope.remotePageData" stripe max-height="580" border>
                <el-table-column min-width="130" align="center" label="发送号码" prop='phone'>
                  <template scope="scope">
                      <p>{{utils.is_null(scope.row.phone)}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="member_id" align="center" min-width="95" label="买家ID">
                  <template scope="scope">
                      <p>{{utils.is_null(scope.row.member_id)}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="marketing_time" :render-header="utils.appendTip('本次营销信息的实际发送时间')" align="center" min-width="110" label="营销时间">
                    <template scope="scope">
                      <p>{{utils.format_date(scope.row.marketing_time)}}<br/>{{utils.format_time(scope.row.marketing_time)}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="marketing_status" :render-header="utils.appendTip('指营销中的状态变化：已推送（信息已经推送暂未返回是否成功）、已营销（信息已经推送成功）、推送无效（信息推送失败）、营销失败（营销后在有效期内没有产生成果）、营销成功（营销后在有效期内产生成果）')" label="营销状态" min-width="100" align="center">
                    <template scope="scope">
                      <p>{{utils.is_null(scope.row.marketing_status)}}</p>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </table-list>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import utils from '../../misc/utils'
import pagination from '../../misc/pagination'
export default {
    data() {
        return {
          utils: utils,
          pagination: pagination
        }
    },
    mounted() {
        this.init()
    },
    computed: {
        ...mapGetters([
            'sendQuickDetail',
            'openModalState'
        ])
    },
    watch: {
    },
    methods: {
        ...mapActions([
            'getSendQuickDetail',
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
            this.getSendQuickDetail([pagination, days, startDate, endDate, search_word])
        },
        // 处理本地数据
        searchLocal([pagination, search_word, days, startDate, endDate, sortBy]) {
            // 主动获取数据
            this.getSendQuickDetail([pagination, days, startDate, endDate, search_word])
        }
    },
    props: [
        'sortBy'
    ]
}
</script>
<style lang="scss">

</style>

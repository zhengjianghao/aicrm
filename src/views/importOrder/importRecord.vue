<template>
<div>
    <div class="user_tablelist">
         <el-table
            :data="filterImportOrderData.curPageData"
            stripe
            border
            max-height="775"
            width="100%"
            :row-key="setRowKey"
            :expand-row-keys= "getExpandRow()"
            @expand="expandClick"
            >
            <el-table-column
            prop="firstCol"
            width="40px"
            align="center"
            type="expand"
            label="">
            <template scope="props">
              <el-row v-for="(item, index) in props.row.files" :key="index">
                <el-col :span="12"><div>{{item.file_org_name}}</div></el-col>
                <!--<el-col :span="6"><a target="_blank" :href="item.file_download">原始文件下载</a></el-col>
                <el-col :span="6" v-show="false"><a target="_blank" :href="item.error_download">错误文件下载</a></el-col>-->
              </el-row>
              <el-row v-if="props.row.files.length === 0">
                <el-col :span="24" style="text-align:center;">暂无数据</el-col>
              </el-row>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="created_at"
            width="75px"
            label="建立时间">
            <template scope="scope">
                {{formatDate(scope.row.created_at)}}</br>
                {{formatTime(scope.row.created_at)}}
            </template>
            </el-table-column>
            <el-table-column
            prop="customer_group"
            align="center"
            label="导入分组">
            </el-table-column>
            <el-table-column
            align="center"
            prop="result_count"
            width="77px"
            label="总条数">
            </el-table-column>
            <el-table-column
            prop="result_success_count"
            align="center"
            width="77px"
            label="成功条数">
            </el-table-column>
            <el-table-column
            prop="result_fail_count"
            align="center"
            width="63px"
            label="失败数">
            </el-table-column>
            <el-table-column
            prop="result_repeat_count"
            align="center"
            width="63px"
            label="重复数">
            </el-table-column>
            <el-table-column
            prop="status"
            align="center"
            width="80px"
            label="处理进展">
              <template scope="scope">
                <span class="oldSuccess" v-if="scope.row.status === 'JOB_WAIT'">
                  待处理
                </span>
                <span class="oldSuccess" v-else-if="scope.row.status === 'JOB_PROCESS'">
                  处理中
                </span>
                <span class="success" v-else-if="scope.row.status === 'JOB_CUSSESS'">
                  处理成功
                </span>
                <span class="danger" v-else-if="scope.row.status === 'JOB_FAILED'">
                  导入失败
                </span>
                <span class="partFail" v-else-if="scope.row.status === 'JOB_PART'">
                  部分导入
                </span>
              </template>
            </el-table-column>
            <el-table-column
            prop="start_time"
            width="93px"
            align="center"
            label="预计完成时间">
            <template scope="scope">
                {{formatDate(scope.row.start_time)}}</br>
                <template v-if="scope.row.start_time">
                  {{formatTime(scope.row.start_time)}}</br>
                  {{getSpendTime(scope.row.created_at, scope.row.start_time)}}
                </template>
            </template>
            </el-table-column>
            <el-table-column
            prop="realFinishTime"
            align="center"
            width="93px"
            label="实际完成时间">
            <template scope="scope">
                {{formatDate(scope.row.end_time)}}</br>
                <template v-if="scope.row.end_time">
                  {{formatTime(scope.row.end_time)}}</br>
                  {{getSpendTime(scope.row.created_at, scope.row.end_time)}}
                </template>
            </template>
            </el-table-column>
        </el-table>
        <div class="pull-right">
            <el-pagination
                :page-sizes="pagination.pageSizes"
                :page-size="pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="filterImportOrderData.totalNum"
                @current-change="doPageByNum"
                @size-change="doPageBySize"
                :current-page="pageIndex"
                >
            </el-pagination>
        </div>
    </div>
</div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import moment from 'moment'
  import globalConstant from '../../misc/global.constant'
  import pagination from '../../misc/pagination'
  export default {
    data() {
      return {
        refreshTimer: '',
        expandKeys: [],
        pagination: pagination,
        pageIndex:1
      }
    },
    mounted() {
      moment.locale('en', {
          relativeTime : {
              future: "in %s",
              past:   "%s ago",
              s:  "%d秒",
              m:  "%d分",
              mm: "%d分",
              h:  "%d小时",
              hh: "%d小时",
              d:  "%d天",
              dd: "%d天",
              M:  "%d月",
              MM: "%d月",
              y:  "%d年",
              yy: "%d年"
          }
      });

    },
    computed: {
      ...mapGetters(['subState', 'filterImportOrderData','importOrderData'])
    },
    watch: {
      subState() {
        if(this.subState === 'imporList') {
          if(this.importOrderData.id) {
             this.expandKeys = [this.importOrderData.id]
          }else {
             this.expandKeys = [this.importOrderData.length]
          }
          // 进入该页卡先执行一次刷新
          this.updateImportOrder(this.pagination)
          // 定时5秒刷新一次
          if(!this.refreshTimer) {
            var that = this
            this.refreshTimer = setInterval(() => {
              that.updateImportOrder(that.pagination)
            }, 5000)
          }
        } else {
          clearInterval(this.refreshTimer)
          this.refreshTimer = ''
        }
      },
      // importOrderData() {
      //     if(this.importOrderData.id) {
      //        this.expandKeys.push(this.importOrderData.id)
      //     }else {
      //        this.expandKeys.push(this.importOrderData.length)
      //     }

      // }
    },
    methods: {
      ...mapActions(['updateImportOrder', 'getImportOrderByParam']),
      search() {
            this.getImportOrderByParam(this.pagination)
      },
      doPageByNum(val) {
          this.pagination.pageIndex = val
          this.pageIndex = val
          this.search()
      },
      doPageBySize(val) {
          this.pagination.pageSize = val
          this.search()
      },
      formatDate(dateTime) {
        if(!dateTime) return '/'
        var temp = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
        if(!temp) return '/'
        return dateTime.split(' ')[0]
      },
      formatTime(dateTime) {
        if(!dateTime) return ''
        var temp = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
        if(!temp) return '/'
        return dateTime.split(' ')[1]
      },
      getSpendTime(startDateTime, endDateTime) {
        if(!endDateTime) return ''
        var end = moment(endDateTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
        var start = moment(startDateTime, 'YYYY-MM-DD HH:mm:ss').valueOf()
        if(!end || !start) return ''
        var spendTime = moment(start).from(moment(end), true)
        return '(' + spendTime + ')'
      },
      setRowKey(row) {
        return row.id
      },
      expandClick(row, expanded) {
        var index = row.id
        var noExist = this.expandKeys.every(o => {
          return o !== index
        })
        if(!noExist) {
          this.expandKeys = this.expandKeys.filter( o => {
            return o !== index
          })
        } else {
          this.expandKeys.push(index)
        }
      },
      getExpandRow() {
        return [].concat(this.expandKeys)
      }
    },
    components: {
    }
}
</script>
<style lang="scss" scoped>
  .wait {
    color: #999999
  }
  .success {
    color: #009966;
  }
  .fail {
    color: #CC0000
  }
  .partFail {
    color: #FF6600
  }
  .oldSuccess {
    color: rgb(51, 51, 51)
  }
  .oper {
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
</style>

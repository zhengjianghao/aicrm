<template>
  <div>
    <div class="user_toolbox">
        <div class="toolbox_control">
            <el-button-group >
                <el-button  :class="vm.activeTabName === 'wait' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('wait')">待处理</el-button>
                <el-button   class="margin_left_tiny" :class="vm.activeTabName === 'dealt' ? 'toolbox_active' : 'toolbox_default'" @click="switchTab('dealt')">已处理</el-button>
            </el-button-group>
        </div>
    </div>
    <table-list 
      :showQuickSearchByDays="true" 
      :showDateRangeSearch="true" 
      :showSearchKey="true" 
      dateRangeSearchPlaceholder="信息推送时间" 
      @getBaseList="searchRemote" 
      @getFilterList="searchLocal" 
      ref="tableList" 
      :filterListData="serverCenterData">
      <template slot="tableData" scope="props">
        <el-table :data="props.remotePageData" stripe max-height="550" border>
          <el-table-column 
            min-width="130"
            align="center"
            prop="send_time"
            label="推送时间">
            <template scope="scope">
                {{utils.format_All_time(scope.row.send_time)}}
            </template>
          </el-table-column>
          <el-table-column 
            min-width="130"
            align="center"
            prop="marketing_task"
            label="推送场景">
          </el-table-column>
          <el-table-column 
            min-width="130"
            align="center"
            prop="buyer_nick"
            label="买家ID">
          </el-table-column>
          <el-table-column 
            min-width="130"
            align="center"
            prop="content"
            label="推送内容">
          </el-table-column>
          <el-table-column 
            min-width="130"
            align="center"
            prop="user_name"
            label="操作账号">
          </el-table-column>
          <el-table-column 
            min-width="130"
            align="center"
            prop="state"
            label="操作">
            <template scope="scope">
              <!--<span v-if="!scope.row.isClicked && scope.row.state === '待处理'" @click="deal(scope.id, scope.$index, props.remotePageData)">{{scope.row.state}}</span>
              <span v-else>已处理</span>-->
              <div class="deal_message" @click="deal(scope.id, scope.$index, props.remotePageData)">{{scope.row.state}}</div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </table-list>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import {mapGetters, mapActions} from 'vuex'
import utils from '../../misc/utils'
import MSG from '../../service/message.service'
export default {
  data() {
    return {
      vm: {
        activeTabName: 'wait'
      },
      utils: utils
    }
  },
  mounted() {
    this.init()
    this.getActiveMenuCode('/homepage')
  },
  computed: {
    ...mapGetters([
      'serverCenterData'
    ])
  },
  watch: {
  },
  methods: {
    ...mapActions([
      'getActiveMenuCode',
      'getServerCenterData'
    ]),
    init() {
        this.$refs['tableList'].init()
    },
    switchTab(name) {
      // 防止重复点击，重复请求
      if(this.vm.activeTabName != name) {
        this.vm.activeTabName = name;
        this.init()
      }
    },
    // 获取远程数据
    searchRemote([pagination, days, startDate, endDate, search_word, sortBy]) {
        if (startDate && endDate) {
            days = ''
        }
        // 主动获取数据
        this.getServerCenterData([pagination, days, startDate, endDate, search_word, this.vm.activeTabName])
    },
    // 处理本地数据
    searchLocal([pagination, search_word, days, startDate, endDate, sortBy]) {
        // 主动获取数据
        this.getServerCenterData([pagination, days, startDate, endDate, search_word, this.vm.activeTabName])
    },
    deal(id, index, data) {
      var _row = data[index]
      if(this.vm.activeTabName === 'wait' && _row.state === '待处理') {
        MSG.updateServerCenter(id).then(o => {
          // this.$set(_row, 'isClicked', true)
          _row.state = '已处理'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.deal_message {
  cursor: pointer;
}
</style>

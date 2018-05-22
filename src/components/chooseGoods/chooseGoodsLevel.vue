<template>
  <div>
    <base-choose-goods @getGoods="getGoodsLevel" @getGoodsByParam="getGoodsLevelByParam" :goodsData="goodsLevelData" :filterGoodData="filterGoodLevelData">
      <template slot="tableData" scope="scope">
        <el-table :data="scope.data" class="selectGoods" style="width:100%;max-height:815px" max-height="775">
          <el-table-column align="center" width="50px" label="">
            <template scope="scope">
              <el-checkbox :label="scope.row.num_iid" class="ckGroup"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="宝贝名称/简称">
            <template scope="scope">
              <div class="goodsName_row">
                <div class="pull-left pic">
                  <img :src="scope.row.pic_url" />
                </div>
                <div class="pull-left introduce">
                  <p @click="g_const.goTaobaoDetail(scope.row.num_iid)()" class="sub_title link">{{scope.row.sub_title}}</p>
                  <span>
                    <p class="des">{{scope.row.title}}</p>
                  </span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="num_iid" width="138px" label="宝贝ID">
          </el-table-column>
          <el-table-column width="158px" label="近30天销量与库存">
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
          <el-table-column width="100px" label="宝贝状态">
            <template scope="scope">
              <span :class="scope.row.approve_status === 'onsale' ? 'blue' : '' ">{{scope.row.approve_status === 'onsale' ? '出售中' : '仓库中' }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" label="潜需会员数">
            <template scope="scope">
              <p class="sale">
                <span class="num">{{scope.row.potential_times}}</span>个会员</p>
            </template>
          </el-table-column>
          <el-table-column width="100px" label="潜需排行">
            <template scope="scope">
              <span :class="getColor(scope.row.potential_times_num)">{{scope.row.potential_times_num}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </base-choose-goods>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import baseChooseGoods from '../list/baseChooseGoods'
import globalConstant from '../../misc/global.constant'
export default {
  data() {
    return {
      g_const: globalConstant
    }
  },
  computed: {
    ...mapGetters([
      'filterGoodLevelData',
      'goodsLevelData'
    ])
  },
  methods: {
    ...mapActions([
      'getGoodsLevel',
      'getGoodsLevelByParam'
    ]),
    // 潜需排行前三位,显示不同颜色
    getColor(num) {
      if (num === 'No.1') {
        return 'red'
      } else if (num === 'No.2') {
        return 'yellow'
      } else if (num === 'No.3') {
        return 'green'
      } else {
        return 'num'
      }
    }
  },
  components: {
    baseChooseGoods
  }
}
</script>
<style lang="scss" scoped>
.red {
  color: #FF0000;
}

.yellow {
  color: #FFCC00;
}

.green {
  color: #009900;
}

.blue {
  color: #3089DC;
}
</style>

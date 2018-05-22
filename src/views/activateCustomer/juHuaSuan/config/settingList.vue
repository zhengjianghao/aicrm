<template>
  <setting-list-goods ref='settinglistgoods' :settingListData="settingListData" :customUpdate="customUpdate">
    <template slot="toolboxLeft" scope="props">
      <h3 style="color:#5D6D7D;">聚划算宝贝配置</h3>
      <span style="line-height: 30px">选择的宝贝将被用于精准人群，即AI会根据选择的宝贝来寻找潜需买家</span>
    </template>
    <template slot="toolboxRight" scope="props">
      <div style="padding: 23px 0 0;">
        当前已有
        <span class="num">{{props.data.totalNum ? props.data.totalNum : 0}}</span> 件聚划算宝贝
        <el-button style="background-color: #0bb8f8;background-image: linear-gradient(45deg, #0bb8f8 25%, #2AF598 100%);" type="primary" @click="props.openChoTemplate()">添加聚划算宝贝</el-button>
      </div>
    </template>
    <template slot="tableData" scope="props">
      <div style="min-height:75px;max-height: 500px;overflow: auto;">
        <div class="masonry">
          <span class="noData" v-if="!props.data || props.data.length ===0">暂无数据</span>
          <div class="item pull-left" v-for="(obj, index) in props.data" v-bind:key="obj.num_iid">
            <div>
              <!-- 关闭按钮 -->
              <i class="el-icon-delete2 card_delete link" @click="del(props.deleteGoods(obj.num_iid), obj.num_iid)"></i>
              <!-- 聚划算宝贝设置 -->
              <el-card class="card" :body-style="{ padding: '10px' }" v-show="obj.j_is_edit">
                <div>
                  <el-form-item>
                    <p>聚划算宝贝短名：</p>
                    <el-tooltip class="item" effect="dark" :manual="true" :value='goodsnameID.indexOf(obj.num_iid) >=0 ' :content="goodsnameID.length >0 ? goodsnameID.indexOf(obj.num_iid) >=0 ? goodsnameContent[goodsnameID.indexOf(obj.num_iid)] : '' : ''" placement="top">
                      <el-input v-model="obj.j_name"></el-input>
                    </el-tooltip>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item style="display:inline-block;">
                    <p>聚划算价格</p>
                    <el-tooltip class="item" effect="dark" :manual="true" :value='goodspriceID.indexOf(obj.num_iid) >=0 ' :content="goodspriceID.length >0 ? goodspriceID.indexOf(obj.num_iid) >=0 ? goodspriceContent[goodspriceID.indexOf(obj.num_iid)] : '' : ''" placement="top">
                      <el-input class="text-right" style="width:110px" v-model="obj.j_price">
                        <template slot="append">元</template>
                      </el-input>
                    </el-tooltip>
                  </el-form-item>
                  <el-form-item style="display:inline-block;float:right;">
                    <p>聚划算折扣</p>
                    <el-tooltip class="item" effect="dark" :manual="true" :value='goodsdiscountID.indexOf(obj.num_iid) >=0 ' :content="goodsdiscountID.length >0 ? goodsdiscountID.indexOf(obj.num_iid) >=0 ? goodsdiscountContent[goodsdiscountID.indexOf(obj.num_iid)] : '' : ''" placement="top">
                      <el-input style="width:110px" class="text-right" v-model="obj.j_discount">
                        <template slot="append">折</template>
                      </el-input>
                    </el-tooltip>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item class="el-input-sm-normal">
                    <p>聚划算时间：</p>
                    <el-date-picker v-model="obj.j_date[0]" format="yyyy-MM-dd HH:mm" type="datetime" :editable="false" :clearable="false" placeholder="请选择开始时间">
                    </el-date-picker> 至
                    <el-tooltip class="item" effect="dark" :manual="true" :value='goodsDateTimeId.indexOf(obj.num_iid) >=0 ' :content="goodsDateTimeId.length >0 ? goodsDateTimeId.indexOf(obj.num_iid) >=0 ? goodsDateTimeC[goodsDateTimeId.indexOf(obj.num_iid)] : '' : ''" placement="top">
                      <el-date-picker v-model="obj.j_date[1]" format="yyyy-MM-dd HH:mm" type="datetime" :editable="false" :clearable="false" placeholder="请选择结束时间">
                      </el-date-picker>
                    </el-tooltip>
                  </el-form-item>
                </div>
                <div class="bottom">
                  <span class="link link_underline primary" @click="save_card(props, obj)">保存</span>&nbsp;&nbsp;
                  <span class="link link_underline primary" v-show="!obj.j_is_new" @click="cancel(props.cancelEdit(obj.num_iid), obj.num_iid)">取消</span>
                </div>
              </el-card>
              <!-- 聚划算宝贝详情 -->
              <el-card class="card_detail" :body-style="{ padding: '10px' }" style="border-bottom-right-radius: 0;border-bottom-left-radius: 0;" v-show="!obj.j_is_edit">
                <div class="goods">
                  <img :src="obj.pic_url" />
                  <div class="g_des">
                    <span class="c_title">{{obj.j_name}}</span>
                    <span>原价：￥{{obj.price}}</span>
                  </div>
                </div>
                <div class="j_body">
                  <p style="float: left;">
                    聚划算价格： ￥
                    <span class="ju_price">{{obj.j_price}}</span>
                  </p>
                  <p style="margin-top:-2px;text-align: right;">
                    聚划算折扣：
                    <span class="ju_price">{{obj.j_discount}}</span>&nbsp;&nbsp;折
                  </p>
                  <p>
                    聚划算时间：
                    <span>{{obj.j_date[0]}} 至 {{obj.j_date[1]}}</span>
                  </p>
                  <div class="bottom">
                    <span class="link link_underline primary" @click="props.openChooseSubGoods(obj.num_iid)">添加聚划算宝贝相似宝贝选择</span>&nbsp;&nbsp;
                    <span class="link link_underline primary" @click="goEdit(props, obj)">聚划算设置</span>
                  </div>
                </div>
              </el-card>
              <!-- 聚划算宝贝相关宝贝 -->
              <div class="card_about nice_scroll" style="width: 99%;max-height: 300px;background-color: rgba(239, 238, 238, 0.32);box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .12), 0px 0px 6px 1px rgba(0, 0, 0, .04);border-bottom-right-radius: 4px;border-bottom-left-radius: 4px;">
                <p style='padding: 10px' v-show='obj.j_child_tid.length > 0'>聚划算宝贝相似宝贝</p>
                <el-card class="card_detail" v-for="subObj in obj.j_child_tid" v-bind:key="'_'+subObj.num_iid" :body-style="{ padding: '10px' }" style="background-color: initial;box-shadow: none;border-top: 0;border-radius: 0;border: 0px;border-bottom: 1px solid rgb(209, 222, 229);width:100%;" v-show="!obj.j_is_edit">
                  <div class="goods">
                    <img :src="subObj.pic_url" />
                    <div class="g_des">
                      <span class="c_title">{{subObj.sub_title}}</span>
                      <span>价格：￥{{subObj.price}}</span>
                    </div>
                  </div>
                  <div class="bottom bottom_tool">
                    <span class="link link_underline primary" @click="props.deleteSubGoods(obj.num_iid, subObj.num_iid)">删除该宝贝</span>&nbsp;&nbsp;
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </setting-list-goods>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import settingListGoods from '../../../../components/list/settingListGoods'
import globalConstant from '../../../../misc/global.constant'
import moment from 'moment'
export default {
  data() {
    return {
      g_const: globalConstant,
      isEditCard: true,
      goodsnameID: [],
      goodsnameContent: [],
      goodspriceContent: [],
      goodspriceID: [],
      goodsdiscountContent: [],
      goodsdiscountID: [],
      goodsDateTimeId: [],
      goodsDateTimeC: []
    }
  },
  watch: {
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    ...mapActions([
      'updataBaseMConfig'
    ]),
    checkGoodsName(value, id) {
      var that = this
      if (value == '') {
        if (that.goodsnameID.indexOf(id) < 0) {
          that.goodsnameID.push(id)
          that.goodsnameContent.push('请输入聚划算宝贝短名')
        } else {
          that.goodsnameContent.splice(that.goodsnameID.indexOf(id), 1)
          that.goodsnameID.splice(that.goodsnameID.indexOf(id), 1)
          that.goodsnameID.push(id)
          that.goodsnameContent.push('请输入聚划算宝贝短名')
          //that.goodsnameContent[that.goodsnameID.indexOf(id)] = '请输入聚划算宝贝短名'
        }

      } else if (value.length > 10) {
        if (that.goodsnameID.indexOf(id) < 0) {
          that.goodsnameID.push(id)
          that.goodsnameContent.push('输入字符不得超过10个字')
        } else {
          that.goodsnameContent.splice(that.goodsnameID.indexOf(id), 1)
          that.goodsnameID.splice(that.goodsnameID.indexOf(id), 1)
          that.goodsnameID.push(id)
          that.goodsnameContent.push('输入字符不得超过10个字')
          // that.goodsnameContent[that.goodsnameID.indexOf(id)] = '输入字符不得超过10个字'
        }
      } else {
        if (that.goodsnameID.indexOf(id) >= 0) {
          that.goodsnameContent.splice(that.goodsnameID.indexOf(id), 1)
          that.goodsnameID.splice(that.goodsnameID.indexOf(id), 1)
        }
      }
    },
    checkGoodsPrice(value, id) {
      var reg = /^[0-9]+(.[0-9]{1,2})?$/g;
      var that = this;
      if (value == '') {
        if (that.goodspriceID.indexOf(id) < 0) {
          that.goodspriceID.push(id)
          that.goodspriceContent.push('聚划算价格不得为空')
        } else {
          that.goodspriceContent.splice(that.goodspriceID.indexOf(id), 1)
          that.goodspriceID.splice(that.goodspriceID.indexOf(id), 1)
          that.goodspriceID.push(id)
          that.goodspriceContent.push('聚划算价格不得为空')
          //that.goodspriceContent[that.goodspriceID.indexOf(id)] = '聚划算价格不得为空'
        }
      } else if (!reg.test(value)) {
        if (that.goodspriceID.indexOf(id) < 0) {
          that.goodspriceID.push(id)
          that.goodspriceContent.push('聚划算价格输入错误')
        } else {
          that.goodspriceContent.splice(that.goodspriceID.indexOf(id), 1)
          that.goodspriceID.splice(that.goodspriceID.indexOf(id), 1)
          that.goodspriceID.push(id)
          that.goodspriceContent.push('聚划算价格输入错误')
          //that.goodspriceContent[that.goodspriceID.indexOf(id)] = '聚划算价格输入错误'
        }
      } else {
        if (that.goodspriceID.indexOf(id) >= 0) {
          that.goodspriceContent.splice(that.goodspriceID.indexOf(id), 1)
          that.goodspriceID.splice(that.goodspriceID.indexOf(id), 1)
        }
      }
    },
    checkGoodsDis(value, id) {
      // var reg = /^[1-9]([.]{1}[1-9])?$/
      var reg = /^[0-9]([.][1-9]{1,2})?$/
      var that = this
      if(value === 10 || value === '10') {
        if (that.goodsdiscountID.indexOf(id) >= 0) {
          that.goodsdiscountContent.splice(that.goodsdiscountID.indexOf(id), 1)
          that.goodsdiscountID.splice(that.goodsdiscountID.indexOf(id), 1)
        }
      }else if (value == '') {
        if (that.goodsdiscountID.indexOf(id) < 0) {
          that.goodsdiscountID.push(id)
          that.goodsdiscountContent.push('请输入聚划算折扣')
        } else {
          that.goodsdiscountContent.splice(that.goodsdiscountID.indexOf(id), 1)
          that.goodsdiscountID.splice(that.goodsdiscountID.indexOf(id), 1)
          that.goodsdiscountID.push(id)
          that.goodsdiscountContent.push('请输入聚划算折扣')
          //that.goodsdiscountContent[that.goodsdiscountID.indexOf(id)] = '请输入聚划算折扣'
        }
      } else if (!reg.test(value)) {
        if (that.goodsdiscountID.indexOf(id) < 0) {
          that.goodsdiscountID.push(id)
          that.goodsdiscountContent.push('聚划算折扣格式输入错误')
        } else {
          that.goodsdiscountContent.splice(that.goodsdiscountID.indexOf(id), 1)
          that.goodsdiscountID.splice(that.goodsdiscountID.indexOf(id), 1)
          that.goodsdiscountID.push(id)
          that.goodsdiscountContent.push('聚划算折扣格式输入错误')
          //that.goodsdiscountContent[that.goodsdiscountID.indexOf(id)] = '聚划算折扣格式输入错误'
        }
      } else {
        if (that.goodsdiscountID.indexOf(id) >= 0) {
          that.goodsdiscountContent.splice(that.goodsdiscountID.indexOf(id), 1)
          that.goodsdiscountID.splice(that.goodsdiscountID.indexOf(id), 1)
        }
      }
    },
    checkGoodsDate(value, id) {
      var that = this
      if (value[1] == 'Invalid date' || value[1] == '') {
        if (that.goodsDateTimeId.indexOf(id) < 0) {
          that.goodsDateTimeId.push(id)
          that.goodsDateTimeC.push('请选择聚划算结束时间')
        } else {
          that.goodsDateTimeC.splice(that.goodsDateTimeId.indexOf(id), 1)
          that.goodsDateTimeId.splice(that.goodsDateTimeId.indexOf(id), 1)
          that.goodsDateTimeId.push(id)
          that.goodsDateTimeC.push('请选择聚划算结束时间')
          // that.goodsDateTimeC[that.goodsDateTimeId.indexOf(id)] = '请选择聚划算结束时间'
        }
      } else if (moment(value[1]).valueOf() - moment(value[0]).valueOf() <= 60000) {
        if (that.goodsDateTimeId.indexOf(id) < 0) {
          that.goodsDateTimeId.push(id)
          that.goodsDateTimeC.push('结束时间要大于开始时间')
        } else {
          that.goodsDateTimeC.splice(that.goodsDateTimeId.indexOf(id), 1)
          that.goodsDateTimeId.splice(that.goodsDateTimeId.indexOf(id), 1)
          that.goodsDateTimeId.push(id)
          that.goodsDateTimeC.push('结束时间要大于开始时间')
          // that.goodsDateTimeC[that.goodsDateTimeId.indexOf(id)] = '结束时间要大于开始时间'
        }
      } else {
        if (that.goodsDateTimeId.indexOf(id) >= 0) {
          that.goodsDateTimeC.splice(that.goodsDateTimeId.indexOf(id), 1)
          that.goodsDateTimeId.splice(that.goodsDateTimeId.indexOf(id), 1)
        }
      }
    },
    //删除宝贝
    del(cd, id) {
      var that = this
      if (that.goodsnameID.indexOf(id) >= 0) {
        that.goodsnameContent.splice(that.goodsnameID.indexOf(id), 1)
        that.goodsnameID.splice(that.goodsnameID.indexOf(id), 1)
      }
      if (that.goodspriceID.indexOf(id) >= 0) {
        that.goodspriceContent.splice(that.goodspriceID.indexOf(id), 1)
        that.goodspriceID.splice(that.goodspriceID.indexOf(id), 1)
      }
      if (that.goodsdiscountID.indexOf(id) >= 0) {
        that.goodsdiscountContent.splice(that.goodsdiscountID.indexOf(id), 1)
        that.goodsdiscountID.splice(that.goodsdiscountID.indexOf(id), 1)
      }
      if (that.goodsDateTimeId.indexOf(id) >= 0) {
        that.goodsDateTimeC.splice(that.goodsDateTimeId.indexOf(id), 1)
        that.goodsDateTimeId.splice(that.goodsDateTimeId.indexOf(id), 1)
      }
    },
    //取消
    cancel(cd, id) {
      var that = this
      if (that.goodsnameID.indexOf(id) >= 0) {
        that.goodsnameContent.splice(that.goodsnameID.indexOf(id), 1)
        that.goodsnameID.splice(that.goodsnameID.indexOf(id), 1)
      }
      if (that.goodspriceID.indexOf(id) >= 0) {
        that.goodspriceContent.splice(that.goodspriceID.indexOf(id), 1)
        that.goodspriceID.splice(that.goodspriceID.indexOf(id), 1)
      }
      if (that.goodsdiscountID.indexOf(id) >= 0) {
        that.goodsdiscountContent.splice(that.goodsdiscountID.indexOf(id), 1)
        that.goodsdiscountID.splice(that.goodsdiscountID.indexOf(id), 1)
      }
      if (that.goodsDateTimeId.indexOf(id) >= 0) {
        that.goodsDateTimeC.splice(that.goodsDateTimeId.indexOf(id), 1)
        that.goodsDateTimeId.splice(that.goodsDateTimeId.indexOf(id), 1)
      }
    },
    // 确认聚划算宝贝设置
    save_card(props, obj) {
      this.checkGoodsName(obj.j_name, obj.num_iid)
      this.checkGoodsPrice(obj.j_price, obj.num_iid)
      this.checkGoodsDis(obj.j_discount, obj.num_iid)
      this.checkGoodsDate(obj.j_date, obj.num_iid)
      if (this.goodsnameID.indexOf(obj.num_iid) < 0 && this.goodspriceID.indexOf(obj.num_iid) < 0 && this.goodsdiscountID.indexOf(obj.num_iid) < 0 && this.goodsDateTimeId.indexOf(obj.num_iid) < 0) {
        obj.j_is_edit = false
        obj.j_is_new = false
        props.updateValue()
        props.refresh()
      }
    },
    goEdit(props, obj) {
      props.refresh()
      obj.j_is_edit = true
    },
    // 子组件回调函数， 跟新配聚划算宝贝更改
    customUpdate(list) {
      // 存在空数据则不保存（过滤掉用户未保存的宝贝）
      list = list.filter(o => {
        return o.j_name && o.j_discount && o.j_price
      })
      var _data = list.map(o => {
        if (o.j_date) {
          o.j_date[1] = o.j_date[1] ? moment(o.j_date[1]).format('YYYY-MM-DD HH:mm') : ''
          o.j_date[0] = o.j_date[0] ? moment(o.j_date[0]).format('YYYY-MM-DD HH:mm') : ''
        }
        return {
          j_name: o.j_name,
          j_price: o.j_price,
          j_date: o.j_date,
          j_discount: o.j_discount,
          j_tid: o.j_tid,
          num_iid: o.num_iid,
          j_child_tid: o.j_child_tid.map(o => {
            return o.num_iid
          })
        }
      })
      // 更新营销配置基本量
      this.updataBaseMConfig({
        items_data: _data,
      })
      return _data
    },
    checkBuyAll() {
      var goods = this.$refs.settinglistgoods.buyingCycelGoods
      var noEdit = 0
      // if (this.$refs.settinglistgoods.buyingCycelGoods.length <= 0) {
      //   return '请选择聚划算宝贝'
      // }
      for (var i in goods) {
        if (goods[i].j_is_edit) {
          // this.checkGoodsName(goods[i].j_name, goods[i].num_iid)
          // this.checkGoodsPrice(goods[i].j_price, goods[i].num_iid)
          // this.checkGoodsDis(goods[i].j_discount, goods[i].num_iid)
          // this.checkGoodsDate(goods[i].j_date, goods[i].num_iid)
          return '请保存修改的宝贝'
        }else {
          noEdit++
        }
      }
      if(noEdit == goods.length) {
        return true
      }
      //return this.goodsnameID.length == 0 && this.goodspriceID.length == 0 && this.goodsdiscountID.length == 0 && this.goodsDateTimeId.length == 0
    }
  },
  props: [
    'sortBy',
    'settingListData'
  ],
  components: {
    settingListGoods
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../style/variable.scss';
.masonry {
  .item {
    position: relative;
    width: 335px;
    margin: 6px 0 3px 6px;
    .card {
      width: 99%;
      font-size: 12px;
      overflow: initial;
    }
    .card_about {
      overflow: auto;
    }
    .card_detail {
      position: relative;
      @extend .card;
      color: rgb(153, 153, 153);
    }
    .card_delete {
      position: absolute;
      z-index: 2;
      top: 10px;
      right: 7px;
      font-size: 13px;
      color: #999999;
      &:hover {
        color: $danger;
      }
    }
    .goods {
      position: relative;
      .g_des {
        position: absolute;
        top: 7px;
        left: 60px;
        span {
          display: block;
        }
        .c_title {
          color: $coffe;
        }
      }
    }
    .bottom_tool {
      position: absolute;
      bottom: 9px;
      right: 5px;
    }
    .ju_price {
      color: #CC0000;
      font-size: 18px;
    }
    .j_body {
      p {
        line-height: 22px;
      }
    }
    .bottom {
      text-align: right;
      margin: 5px 0 0 0;
    }

    img {
      width: 52px;
      height: 52px;
      border: solid 1px #cccccc;
      margin-top: 5px;
    }
  }
}
</style>

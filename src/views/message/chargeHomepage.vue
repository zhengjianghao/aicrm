<template>
    <div class="charge_box">
      <div class="banner">
        <p class="main_title"><span class="line"></span>双<span>11</span>备战 短信充值限时<span>88</span>折<span class="line"></span></p>
        <p class="sub_title">促销日期：2017/10/16-2017/11/11</p>
      </div>
      <div class="half_box ">
        <div class="passage_way large_num ordinary_color ordinary_border">
          <p>普通通道</p>
        </div>
        <div class="content_box">
          <div class="item_container" v-for="(item, index) in msgList" v-if="item.sms_channel === 'LOW'" :key="index">
            <el-row>
              <el-col :span="6">
                <p>
                  <span class="item_normal pull-right ordinary_color"><span class="large_num">{{item.sms_count | formatPrice}}</span> 条</span>
                </p>
              </el-col>
              <el-col :span="4">
                <p>
                  <span class="item_normal old_price">￥<span class="mid_num">{{item.item_price | formatPrice}}</span></span>
                </p>
              </el-col>
              <el-col :span="3">
                <p>
                  <span class="item_normal normal_color"><span class="mid_num">8.8</span>折</span>
                </p>
              </el-col>
              <el-col :span="4">
                <p>
                  <span class="item_normal normal_color">¥<span class="mid_num">{{doCount(item.sms_unit_price)}}</span>/条</span>
                </p>
              </el-col>
              <el-col :span="7">
                <div class="charge_msg ordinary_border" @click="charge(item.order_url)">
                  <p>
                    <span class="item_normal ordinary_color">充值 <span class="large_num">{{item.item_price | doCount | formatPrice}}</span>元</span>
                  </p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="half_box">
        <div class="passage_way large_num ali_color ali_border">
          <p>阿里通道</p>
        </div>
        <div class="content_box">
          <div class="item_container" v-for="(item, index) in msgList" v-if="item.sms_channel === 'HIGH'" :key="index">
            <el-row>
              <el-col :span="6">
                <p>
                  <span class="item_normal pull-right ali_color"><span class="large_num">{{item.sms_count | formatPrice}}</span> 条</span>
                </p>
              </el-col>
              <el-col :span="4">
                <p>
                  <span class="item_normal old_price">￥<span class="mid_num">{{item.item_price | formatPrice}}</span></span>
                </p>
              </el-col>
              <el-col :span="3">
                <p>
                  <span class="item_normal normal_color"><span class="mid_num">8.8</span>折</span>
                </p>
              </el-col>
              <el-col :span="4">
                <p>
                  <span class="item_normal normal_color">¥<span class="mid_num">{{doCount(item.sms_unit_price)}}</span>/条</span>
                </p>
              </el-col>
              <el-col :span="7">
                <div class="charge_msg ali_border" @click="charge(item.order_url)">
                  <p>
                    <span class="item_normal ali_color">充值 <span class="large_num">{{item.item_price | doCount | formatPrice}}</span>元</span>
                  </p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

    </div>
</template>
<script type="text/ecmascript-6" scoped>
  import {mapGetters, mapActions} from 'vuex'
  import globalConstant from '../../misc/global.constant'
  export default {
    data() {
      return {
        msgList: []
      }
    },
    computed: {
        ...mapGetters([
          'chargeMessagelistData',
          // 'userData'
        ]),
        // user() {
        //     return this.userData
        // }
    },
    mounted() {
        this.getMessageChargeList()
    },
    watch: {
        chargeMessagelistData() {
            this.msgList = this.chargeMessagelistData
        }
    },
    methods: {
        ...mapActions([
          'getMessageChargeList'
        ]),
        charge(url) {
            window.open(url,"_blank")
        },
        toQuartile(num) {
            return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        },
        doCount(num) {
          return (num * 0.88).toFixed(4)
        }
    },
    filters: {
        formatPrice: function (value) {
            if (!value) return 0
            var _value = value == parseInt(value) ? parseInt(value) : value
            return (_value + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        },
        doCount: function (value) {
            let _value = Math.floor(value * 0.88)
            return _value
        }
    },
    components: {
    }
}
</script>
<style lang="scss" scoped>
.charge_box {
  width: 100%;
  margin-top: 10px;
  position: relative;
  .banner {
    width: 100%;
    height: 60px;
    text-align: center;
    background-color: rgb(43, 50, 58);
    border-bottom: 1px solid rgb(206, 209, 212);
    .main_title {
      font-size: 22px;
      font-weight: bold;
      color: #0bb8f8;
      letter-spacing: 4px;
      padding: 2px 0;
      span {
        font-size: 30px;
        font-style: italic;
      }
      .line {
        display: inline-block;
        width: 60px;
        height: 0;
        position: relative;
        top: -7px;
        margin: 0 25px;
        border-bottom: 1px solid #0bb8f8;
      }
    }
    .sub_title {
      font-size: 12px;
      color: #d1d1d1;
      letter-spacing: 1px;
    }
  }
  .half_box {
    float: left;
    width: 50%;
    height: 100%;
    .passage_way {
      position: absolute;
      width: 20px;
      height: 80px;
      text-align: center;
      margin: 20px;
      padding: 80px 3px;
      // border: 1px solid #0bb8f8;
      border-radius: 5px;
    }
    .content_box {
      width: 100%;
      .item_container {
        width: 100%;
        height: 25px;
        line-height: 25px;
        margin: 13px 0;
        .item_normal {
          font-size: 12px;
        }
        .charge_msg {
          text-align: right;
          padding-right: 30px;
          margin-right: 10px;
          // border: 1px solid #0bb8f8;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }
 }
.large_num {
  font-size: 18px;
  font-weight: bold;
}
.mid_num {
  font-size: 15px;
}
.old_price {
    display: inline-block;
    width: 100%;
    color: #999999;
    font-style: italic;
    text-align: center;
    text-decoration: line-through;
}
.normal_color {
  color: #777870;
}
.ali_color {
  color: #ff710f;
}
.ali_border {
  border: 1px solid #ff710f;
  &:hover {
    background-color: #fef7f1;
  }
}
.ordinary_color {
  color: #0bb8f8;
}
.ordinary_border {
  border: 1px solid #0bb8f8;
  &:hover {
    background-color: #f0f8ff;
  }
}

</style>

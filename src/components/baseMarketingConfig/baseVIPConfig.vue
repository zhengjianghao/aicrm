<template>
  <div class="sub_main_content">
    <el-form :model="conf" :rules="baseData.filter_option ? rules : rules2" :show-message="false" ref="conf" class="demo-ruleForm">
      <slot name="baseConfig" :conf="conf" :testRules='baseData.filter_option ? rules : rules2' :refs='this.$refs' :sycnMethod='updateBaseVipConf'>
      </slot>

    </el-form>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
import { mapGetters, mapActions } from 'vuex'
import globalConstant from '../../misc/global.constant'
import utils from '../../misc/utils'
import moment from 'moment'
export default {
  data() {
    var that = this
    // 验证订单金额
    var checkMoney = function(rule, value, callback) {
      var reg = /^[0-9]+(.[0-9]{1,2})?$/g;
      if (value.length == 0 || !that.conf.payment_label) {
        if (that.conf) {
          that.conf = Object.assign({}, that.conf, {
            payment_end_invalid: false,
            payment_start_invalid: false,
          })
        }
        return callback()
      }
      if (!value[0]) {
        if (that.conf) {
          that.conf = Object.assign({}, that.conf, {
            payment_start_invalid: true,
            payment_start_invalid_msg: '不能为空'
          })
        }
        return callback(new Error(''));
      } else if (!reg.test(value[0])) {
        if (that.conf) {
          that.conf = Object.assign({}, that.conf, {
            payment_start_invalid: true,
            payment_start_invalid_msg: '请输入一个数字(小数点后最多有二位)'
          })
        }
        return callback(new Error(''));
      } else {
        reg = /^[0-9]+(.[0-9]{1,2})?$/g;
        if (!value[1]) {
          if (that.conf) {
            that.conf = Object.assign({}, that.conf, {
              payment_start_invalid: false,
              payment_end_invalid: true,
              payment_end_invalid_msg: '不能为空'
            })
          }
          return callback(new Error(''));
        } else if (!reg.test(value[1])) {
          if (that.conf) {
            that.conf = Object.assign({}, that.conf, {
              payment_start_invalid: false,
              payment_end_invalid: true,
              payment_end_invalid_msg: '请输入一个数字(小数点后最多有二位)'
            })
          }
          return callback(new Error(''));
        } else if (parseFloat(value[1]) < parseFloat(value[0])) {
          if (that.conf) {
            that.conf = Object.assign({}, that.conf, {
              payment_start_invalid: false,
              payment_end_invalid: true,
              payment_end_invalid_msg: '要大于等于起始订单金额'
            })
          }
          return callback(new Error(''));
        } else {
          if (that.conf) {
            that.conf = Object.assign({}, that.conf, {
              payment_start_invalid: false,
              payment_end_invalid: false,
            })
          }
          callback();
        }
      }
    };
    // 验证商品件数
    var checkBuys = function(rule, value, callback) {
      var reg = /^[0-9]+$/g;
      if (value.length == 0 || !that.conf.buys_label) {
        that.conf = Object.assign({}, that.conf, {
          buys_start_invalid: false,
          buys_end_invalid: false,
        })
        callback()
        return
      }
      //   可以为空
      if (value[0] == '') {
        that.conf = Object.assign({}, that.conf, {
          buys_start_invalid: false,
        })
        callback()
        return
      } else if (!reg.test(value[0])) {
        that.conf = Object.assign({}, that.conf, {
          buys_start_invalid: true,
          buys_start_invalid_msg: '请输入整数'
        })

        return callback(new Error(''));
      } else {
        reg = /^[0-9]+$/g;
        //   可以为空
        if (!value[1]) {
          that.conf = Object.assign({}, that.conf, {
            buys_start_invalid: false,
            buys_end_invalid: false,
          })

          callback()
          return
        } else if (!reg.test(value[1])) {
          that.conf = Object.assign({}, that.conf, {
            buys_start_invalid: false,
            buys_end_invalid: true,
            buys_end_invalid_msg: '请输入整数'
          })

          return callback(new Error(''));
        }
        else if (parseFloat(value[1]) < parseFloat(value[0])) {
          that.conf = Object.assign({}, that.conf, {
            buys_start_invalid: false,
            buys_end_invalid: true,
            buys_end_invalid_msg: '要大于等于起始商品件数'
          })
          return callback(new Error(''));
        }
        else {
          that.conf = Object.assign({}, that.conf, {
            buys_start_invalid: false,
            buys_end_invalid: false,
          })
          callback();
        }
      }
    }
    // 验证购物次数
    var checkBuyTimes = function(rule, value, callback) {
      var reg = /^[0-9]+$/g;
      if (value.length == 0 || !that.conf.purchase_times_label) {
        that.conf = Object.assign({}, that.conf, {
          count_start_invalid: false,
          count_end_invalid: false,
        })
        callback()
        return
      }
      //   可以为空
      if (value[0] == '') {
        that.conf = Object.assign({}, that.conf, {
          count_start_invalid: false,
        })
        callback()
        return
      } else if (!reg.test(value[0])) {
        that.conf = Object.assign({}, that.conf, {
          count_start_invalid: true,
          count_start_invalid_msg: '请输入整数'
        })

        return callback(new Error(''));
      } else {
        reg = /^[0-9]+$/g;
        //   可以为空
        if (!value[1]) {
          that.conf = Object.assign({}, that.conf, {
            count_start_invalid: false,
            count_end_invalid: false,
          })
          callback()
          return
        } else if (!reg.test(value[1])) {
          that.conf = Object.assign({}, that.conf, {
            count_start_invalid: false,
            count_end_invalid: true,
            count_end_invalid_msg: '请输入整数'
          })

          return callback(new Error(''));
        } else if (parseFloat(value[1]) < parseFloat(value[0])) {
          that.conf = Object.assign({}, that.conf, {
            count_start_invalid: false,
            count_end_invalid: true,
            count_end_invalid_msg: '要大于等于购物次数'
          })
          return callback(new Error(''));
        } else {
          that.conf = Object.assign({}, that.conf, {
            count_start_invalid: false,
            count_end_invalid: false,
          })
          callback();
        }
      }
    }
    //验证下单时间
    var checkOrderTime = function(rule, value, callback) {
      if (value.length == 0) {
        that.conf = Object.assign({}, that.conf, {
          ordertime_start_invalid: false,
          ordertime_end_invalid: false,
        })
        callback()
        return
      }
      if (value[0] == '' || value[0] == undefined) {
        that.conf = Object.assign({}, that.conf, {
          ordertime_start_invalid: true,
          ordertime_start_invalid_msg: '开始时间不能为空'
        })
        return callback(new Error(''));
      } else if (value[1] == '' || value[1] == undefined) {
        that.conf = Object.assign({}, that.conf, {
          ordertime_start_invalid: false,
          ordertime_end_invalid: false
        })
        callback()
        return
      } else if (moment(value[1]).valueOf() - moment(value[0]).valueOf() <= 60000) {
        that.conf = Object.assign({}, that.conf, {
          ordertime_end_invalid: true,
          ordertime_end_invalid_msg: '结束时间要大于开始时间'
        })
        return callback(new Error(''));
      } else {
        that.conf = Object.assign({}, that.conf, {
          ordertime_start_invalid: false,
          ordertime_end_invalid: false
        })
        callback()
      }
    }
    // 验证商品种类
    var checkOrderTypes = function(rule, value, callback) {
      var reg = /^[0-9]+$/g;
      if (value.length == 0 || !that.conf.order_num_label) {
        that.conf = Object.assign({}, that.conf, {
          order_start_invalid: false,
          order_end_invalid: false,
        })
        callback()
        return
      }
      //   可以为空
      if (value[0] == '') {
        that.conf = Object.assign({}, that.conf, {
          order_start_invalid: false,
        })
        callback()
        return
      } else if (!reg.test(value[0])) {
        that.conf = Object.assign({}, that.conf, {
          order_start_invalid: true,
          order_start_invalid_msg: '请输入整数'
        })

        return callback(new Error(''));
      } else {
        reg = /^[0-9]+$/g;
        //   可以为空
        if (!value[1] || value == 0) {
          that.conf = Object.assign({}, that.conf, {
            order_start_invalid: false,
            order_end_invalid: false,
          })

          callback()
          return
        } else if (!reg.test(value[1])) {
          that.conf = Object.assign({}, that.conf, {
            order_start_invalid: false,
            order_end_invalid: true,
            order_end_invalid_msg: '请输入整数'
          })

          return callback(new Error(''));
        }
        else if (parseFloat(value[1]) < parseFloat(value[0])) {
          that.conf = Object.assign({}, that.conf, {
            order_start_invalid: false,
            order_end_invalid: true,
            order_end_invalid_msg: '要大于等于起始商品种类'
          })
          return callback(new Error(''));
        }
        else {
          that.conf = Object.assign({}, that.conf, {
            order_start_invalid: false,
            order_end_invalid: false,
          })
          callback();
        }
      }
    };

    return {
      showMoreBlock: false,
      g_const: globalConstant,
      g_utils: utils,
      conf: {
        items: [],
        items_range: { include: [], exclude: [] },
        reminder: {
          time: ''
        },
        activity_type: [],
        seller_flag: [],
        exclude_check: [],
        interval_invalid: true
      },
      rules: {
        payment_value: [{
          validator: checkMoney, trigger: 'blur',
        }],
        buys_num: [{
          validator: checkBuys, trigger: 'blur'
        }],
        buy_count: [{
          validator: checkBuyTimes, trigger: 'blur'
        }],
        order_types: [{
          validator: checkOrderTypes, trigger: 'blur'
        }],
        order_time: [{
          validator: checkOrderTime, trigger: 'change'
        }]
      },
      rules2: {
        payment_value: [{
          validator: utils.checkMoney(this.verification), trigger: 'blur',
        }],
        buys_num: [{
          validator: utils.checkBuys(this.verification), trigger: 'blur'
        }],
        order_time: [{
          validator: utils.checkOrderTime(this.verification), trigger: 'change'
        }],
        buy_count: [{
          validator: utils.checkBuyTimes(this.verification), trigger: 'blur'
        }],
        order_types: [{
          validator: utils.checkOrderTypes(this.verification), trigger: 'blur'
        }],
      }
    }
  },
  computed: {
    ...mapGetters([
      'verificationData'
    ])
  },
  mounted() {
    this.init()
    // 清空全局组件状态值
    this.emptyBaseMConfig()
  },
  watch: {
    //配置项值得改变
    // verificationData() {
    //   if(!this.baseData.filter_option) {
    //     this.conf = Object.assign({}, this.conf, this.verificationData)
    //   }
    // },
  },
  methods: {
    ...mapActions([
      'verification',
      'emptyBaseMConfig'
    ]),
    // 页面初始化
    init() {
      if (this.baseData.filter_option) {
        this.conf = Object.assign({}, this.conf, this.baseData.filter_option)
      } else {
        this.conf = Object.assign({}, this.conf, this.baseData)
      }
    },
    // 同步 slot 中修改的数据
    // 调用父组件传来的回调函数，并将同步后的数据传入
    updateBaseVipConf(data) {
      if (this.baseData.filter_option) {
        var base_data = Object.assign({}, this.baseData)
        this.conf = Object.assign(this.conf, data)
        base_data.filter_option = this.conf
        this.$emit('updateConf', base_data)
      } else {
        this.conf = Object.assign(this.conf, data)
        // console.log('vipconf')
        // console.log(this.conf)
        this.$emit('updateConf', this.conf)
      }
    },
    clearAll(data) {
      this.conf = Object.assign(this.conf, data)
      // console.log(this.conf)
    }
  },
  props: [
    'baseData'
  ]

}
</script>
<style lang="scss" scoped>
._align {
  margin-left: 76px;
}

.sub_main_content .title_align {
  padding-left: 94px;
}

.el-col {
  height: 34px;
  line-height: 34px;
  font-size: 12px;
  p {
    display: block;
    text-align: right;
    color: #5D6D7D;
  }
  span {
    font-size: 12px;
  }
}

.form_control {
  padding-top: 30px;
}

.validRow {
  .el-form-item {
    display: inline-block;
  }
}
</style>

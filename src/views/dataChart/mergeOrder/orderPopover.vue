<template>
  <div class="container">
      <div class="popover_title">
          <span>订单编号：{{tid}}</span>
          <span>拍下时间：{{created}}</span>
      </div>
      <div class="popover_content">
          <div class="content_left">
              <div class="detail_cell" v-for="(value, index) in orderDetails" :key="index">
                  <img :src="value.pic">
                  <div class="detail_left">
                      <ul>
                          <li>{{value.name}}</li>
                          <li :class="value.desc ? '' : 'unshow'">
                              <span v-for="(describe, index) in value.desc" :key="index">{{describe}}</span>
                          </li>
                          <li>商家编码：{{value.code}}</li>
                      </ul>
                  </div>
                  <div class="detail_right">
                      <span>￥{{value.order_money}}</span>
                      <span>{{value.num}}</span>
                  </div>
              </div>
          </div>
          <div class="content_right">
              <p>￥{{money}}</p>
              <span><p :class="expressMoney ? '' : 'unshow'">(含快递：￥{{expressMoney}})</p></span>
          </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
export default {
  props: [
    'tid',
    'created',
    'orderDetails',
    'url',
    'money',
    'expressMoney'
  ]
}
</script>

<style lang="scss" scoped>
.el-popover {
    .container {
        border: 1px solid #ccc;
        .popover_title {
            width: 600px;
            height: 35px;
            line-height: 35px;
            background-color: rgba(120, 186, 255, 0.55);
            border-bottom: 1px solid #ccc;
            span {
                padding: 0 20px;
            }
        }
        .popover_content {
            width: 600px;
            min-height: 96px;
            max-height: 250px;
            .content_left {
                float: left;
                width: 480px;
                min-height: 96px;
                max-height: 250px;
                overflow: scroll;
                border-right: 1px solid #ccc;
                .detail_cell {
                    float: left;
                    width: 100%;
                    height: 96px;
                    &:not(:last-child) {
                        border-bottom: 1px solid #ccc;
                    }
                    img {
                        display: block;
                        width: 45px;
                        height: 45px;
                        float: left;
                        margin: 10px 5px;
                    }
                    .detail_left {
                        float: left;
                        width: 250px;
                        margin: 10px 0;
                        li {
                            font-size: 12px;
                            padding-bottom: 5px;
                        }
                        li:nth-child(2) {
                            color: #6c6c6c;
                            span {
                                padding-right: 20px;
                            }
                        }
                    }
                    .detail_right {
                        float: left;
                        margin: 10px 0;
                        span {
                            padding: 0 20px;
                        }
                    }
                }
            }
            .content_right {
                float: left;
                width: 117px;
                min-height: 86px;
                text-align: center;
                padding-top: 10px;
                & > p {
                    font-weight: bold;
                }
                span {
                    display: block;
                    color: #6c6c6c;
                }
            }
        }
    }
}
.unshow {
    display: none;
}
</style>

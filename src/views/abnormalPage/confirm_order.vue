<template>
  <div class="content">
    <div class="order_result">
      <div class="msg_row">
        <div class="msg_error">
          <s class="iconfont icon-confirm-error msg_icon"></s>
          校验错误，您好，您订购的该商品的订购周期超过了所依赖商品,请重新选择订购周期,谢谢
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
export default {
}
</script>
<style lang="scss" scoped>
.content {
  width: 1200px;
  margin: 0 auto;
  .order_result {
    margin-top: 40px;
    min-height: 50px;
    .msg_row {
      width: 1138px;
      position: relative;
      display: inline-block;
      border: 1px solid #e1e1e1;
      border-radius: 2px;
      background: #f5f5f5;
      padding-left: 58px;
      box-shadow: 1px 1px 1px #f5f5f5;
      .msg_error {
        line-height: 20px;
        padding: 18px 28px 18px 12px;
        font-weight: bold;
        font-size: 14px;
        color: #666;
        background: #fbfbfb;
        border: 1px solid #efefef;
        border-left: 1px solid #e7e7e7;
        margin: -1px;
        .msg_icon {
          position: absolute;
          display: block;
          left: 0;
          top: 0;
          width: 58px;
          height: 58px;
          line-height: 58px;
          text-align: center;
          font-size: 40px;
          color: rgb(178,0,0);
          text-decoration: none;
        }
      }
    }
  }
}
</style>

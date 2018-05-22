<template>
  <div class="login-form">
      <button class="btn btn-block">点击使用淘宝授权登陆</button>
      <button
          class="btn btn-block"
          style="margin-top: 20px;"
          ui-sref="login.account">
          输入账号密码登陆
      </button>
      <a class="forget" ui-sref="login.forget">
          忘记密码?
      </a>
      <p>
          没有账号?
      </p>
      <a class="forget">
          开通服务，创建账号?
      </a>
      <p>
          杭州聚效科技有限公司&nbsp;© 2016
      </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '我是登陆页'
    }
  }
}
</script>

<style lang="scss" scoped>


</style>

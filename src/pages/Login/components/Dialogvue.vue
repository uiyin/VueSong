<template>
  <div>
    <h1 class="headertitle">对不起，您输入的用户名或者密码不正确</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '登陆'
    }
  }
}
</script>

<style scoped lang="less">
.headertitle {
  color: white;
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  line-height: 40px;
}
</style>

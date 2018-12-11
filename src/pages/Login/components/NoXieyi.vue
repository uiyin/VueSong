<template>
  <div>
    <h1 class="headertitle">对不起，请先同意协议认可，方可进入</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '协议'
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

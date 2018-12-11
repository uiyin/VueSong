<template>
  <div>
    {{message}}
    <div class="iconfont icon-guanbi1 styles"></div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      message: '首页'
    }
  }
}
</script>

<style scoped lang="less">
.styles {
  background: #ccc;
  font-size: 14px;
}
</style>

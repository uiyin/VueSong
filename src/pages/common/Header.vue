<template>
  <div class="header">
    <div class="logo">
      <img :src="imgsrc"
           alt=""
           class="imgcontent">
      老七音乐
    </div>
    <div class="iconfont icon-geren person"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      message: '头部',
      imgsrc: require('@/assets/images/avaster.jpg')
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.header {
  width: 100%;
  height: 0.88rem;
  background: @bgcolor;
  color: @fontcolor;
  position: relative;
  .logo {
    font-size: 18px;
    line-height: 0.88rem;
    position: absolute;
    left: 50%;
    top: 0px;
    transform: translate(-50%, 0);
    .imgcontent {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 6px;
      margin-right: 5px;
    }
  }
  .person {
    width: 32px;
    height: 32px;
    position: absolute;
    right: 10px;
    top: 6px;
    font-size: 32px;
    color: @fontcolor;
    line-height: 42px;
  }
}
</style>

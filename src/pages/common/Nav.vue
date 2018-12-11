<template>
  <div class="nav">
    <router-link to="/index"
                 tag="div"
                 class="navitem">
      <span>推荐</span>
    </router-link>
    <router-link to="/singer"
                 tag="div"
                 class="navitem">
      <span>歌手</span>
    </router-link>
    <router-link to="/paihang"
                 tag="div"
                 class="navitem">
      <span>排行</span>
    </router-link>
    <router-link to="/search"
                 tag="div"
                 class="navitem">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '导航'
    }
  }
}
</script>

<style scoped lang='less'>
@import "~styles/common.less";
.nav {
  width: 100%;
  height: 0.88rem;
  background: @bgcolor;
  color: @fontcolor2;
  display: flex;
  flex-flow: row nowrap;
  .navitem {
    flex: 1;
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 14px;
    color: @fontcolor2;
    text-align: center;
    &.router-link-active {
      color: @fontcolor;
      span {
        padding-bottom: 5px;
        border-bottom: 1px solid @fontcolor;
      }
    }
  }
}
</style>

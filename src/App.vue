<template>
  <div id="app">
    <transition :name="transitionName">
      <navigation>
        <router-view class="allcontent" />
      </navigation>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: ''
    }
  },
  created () {
    // bind event ， 更多参数移步vue-navigation
    this.$navigation.on('forward', (to, from) => {
      // this.transitionName = 'slide-left'
      this.transitionName = 'show'
    })
    this.$navigation.on('back', (to, from) => {
      // this.transitionName = 'slide-right'
      this.transitionName = 'show'
    })
  }
}
</script>

<style lang="less" scoped>
@import "~styles/common.less";
* {
  font-family: "Microsoft YaHei";
}
.allcontent {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  background: @bgcolor;
}
//起点
.slide-left-enter,
.slide-right-leave-active {
  -webkit-transform: translate(7.5rem, 0);
  transform: translate(7.5rem, 0);
}
//终点
.slide-left-leave-active,
.slide-right-enter {
  -webkit-transform: translate(-7.5rem, 0);
  transform: translate(-7.5rem, 0);
}
//淡入淡出
.show-enter-active,
.show-leave-active {
  transition: all 0.1s;
}
.show-enter,
.show-leave-to {
  opacity: 0;
}
.show-enter-to,
.show-leave {
  opacity: 1;
}
</style>

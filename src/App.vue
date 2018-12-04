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
      transitionName: 'slide-left'
    }
  },
  created () {
    // bind event ， 更多参数移步vue-navigation
    this.$navigation.on('forward', (to, from) => {
      this.transitionName = 'slide-left'
    })
    this.$navigation.on('back', (to, from) => {
      this.transitionName = 'slide-right'
    })
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: "Microsoft YaHei";
}
.allcontent {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  -webkit-transform: translate(7.5rem, 0);
  transform: translate(7.5rem, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  -webkit-transform: translate(-7.5rem, 0);
  transform: translate(-7.5rem, 0);
}
</style>

<template>
  <div>
    <transition name="gotop">
      <slot name="xieyi"></slot>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '运动'
    }
  }
}
</script>

<style scoped lang="less">
.gotop-enter-active,
.gotop-leave-active {
  transition: all 0.4s linear;
}
.gotop-enter,
.gotop-leave-to {
  transform: translate(0, 100%);
}
.gotop-leave,
.gotop-enter-to {
  transform: translate(0, 0);
}
</style>

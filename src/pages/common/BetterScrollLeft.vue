<template>
  <div class="betterscrollleft"
       ref="bscrollleft">
    <slot name="slotcontent"></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      message: '向左边滑动'
    }
  },
  created () {
    let _this = this
    this.$nextTick(() => {
      _this._initbetterscroll()
    })
  },
  methods: {
    _initbetterscroll () {
      let wrapper = this.$refs.bscrollleft
      this.bscroll = new BScroll(wrapper, {
        probeType: 3, // 实时知道位置
        scrollX: true, // 纵向是否滑屏false 就不能滑屏了
        click: true
      })
    }
  }
}
</script>

<style scoped lang="less">
.betterscrollleft {
  width: 100%;
  height: 0.88rem;
  overflow: hidden;
}
</style>

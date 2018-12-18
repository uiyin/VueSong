<template>
  <div class="betterscroll"
       ref="betterscrollall">
    <slot name="betterscrollcontent"></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      message: '封装betterscroll'
    }
  },
  created () {
    let _this = this
    setTimeout(_this._initBetterscroll, 1000) // 等待DOM渲染完毕
  },
  methods: {
    _initBetterscroll () {
      let wrap = this.$refs.betterscrollall
      let _this = this
      this.bscroll = new BScroll(wrap, {
        probeType: 3, // 实时知道位置
        pullUpLoad: {
          threshold: 0 // 当我滑动到底部多少的时候触发
        },
        pullDownRefresh: {
          threshold: 20, // 距离顶部多少触发下拉刷新事件
          stop: 20 // 下拉刷新结束后停在最后的位置
        },
        scrollY: true, // 纵向是否滑屏false 就不能滑屏了
        click: true
      })
      /* 上拉加载事件开始 */
      this.bscroll.on('pullingUp', function () {
        // todo异步操作
        _this.$emit('shangla', true)
        this.bscroll.finishPullUp() // 上拉加载完成
        this.bscroll.refresh() // 重新渲染数据
        // bscroll.closePullUp() // 关闭上拉加载当没有数据的时候执行
      })
      /* 上拉加载事件结束 */
      /* 下拉刷新事件开始 */
      this.bscroll.on('pullingDown', function () {
        // todo异步操作
        console.log('下拉测试')
        this.bscroll.finishPullDown() // 下拉加载完成
        this.bscroll.refresh() // 重新渲染数据
        // bscroll.closePullDown() // 关闭上拉加载当没有数据的时候执行
        _this.$emit('xiala', true)
      })

      /* 下拉刷新事件结束 */
    }
  }

}
</script>

<style scoped lang="less">
.betterscroll {
  position: absolute;
  top: 1.76rem;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
}
</style>

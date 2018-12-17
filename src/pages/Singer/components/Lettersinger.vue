<template>
  <div class="letterwrapper"
       ref="letterul">
    <ul>
      <li v-for="(item,index) in dataall"
          :key="index"
          :class="[activenum===item?'active':'']"
          @touchstart="startmove"
          @touchmove.prevent="move"
          @touchend="end"
          @click="change(item)">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['dataall', 'activenum'],
  data () {
    return {
      message: '歌手',
      status: false,
      timer: null
    }
  },
  methods: {
    change (content) {
      this.$emit('changeletter', content)
    },
    startmove () {
      // 开启滑动
      this.status = true
    },
    move (e) {
      if (this.status) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        let topheight = this.$refs.letterul.offsetTop
        this.timer = setTimeout(() => {
          let start = e.touches[0].clientY - topheight
          let index = Math.floor(start / 16)
          let letters = this.dataall
          let value = letters[index]
          this.$emit('changeletter', value)
        }, 16)
      }
    },
    end () {
      this.status = false
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.letterwrapper {
  position: absolute;
  top: 2.36rem;
  right: 0.3rem;
  width: 20px;
  height: 416px;

  li {
    width: 20px;
    height: 16px;
    line-height: 16px;
    color: @fontcolor2;
    font-size: 14px;
    text-align: center;
    z-index: 999;
    &.active {
      color: @fontcolor;
    }
  }
}
</style>

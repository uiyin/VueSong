<template>
  <div class="player"
       v-if="this.playlist.length>0"
       ref="player">
    <!--全屏下-->
    <transition name="normal"
                @enter="enter"
                @after-enter="afterenter"
                @leave="leave"
                @after-leave="afterleave">
      <div class="normal-player"
           v-show="fullScreen">
        <!--头部开始-->
        <div class="top">
          <div class="back"
               @click="back"><i class="iconfont icon-xiala iconstyles"></i></div>
          <h1 class="title"
              v-html="currentSong.name"></h1>
          <h2 class="subtitle"
              v-html="currentSong.ar[0].name"></h2>
        </div>
        <!--头部结束-->
        <!--中间开始-->
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper"
                 ref="imgwrapper">
              <div class="cd"
                   :class="activaclass">
                <img :src="currentSong.al.picUrl"
                     class="image"
                     alt="">
              </div>
            </div>
          </div>
        </div>
        <!--中间结束-->
        <!--尾巴开始-->
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{setTime(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <div class="progress-bar"
                   ref="progresswrapper"
                   @click="clicksong">
                <div class="bar-inner">
                  <div class="progress"
                       ref="progress"></div>
                  <div class="progress-btn-wrapper"
                       ref="progressbtn"
                       @touchstart="touchstart"
                       @touchmove.prevent="touchmove"
                       @touchend="touchend">
                    <div class="progress-btn"></div>
                  </div>
                </div>
              </div>
            </div>
            <span class="time time-r">{{setTime(currentSong.dt/1000)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left"><i @click="changeicon"
                 :class="modeicon"></i></div>
            <div class="icon i-left"
                 :class="disabledClass"><i @click="prev"
                 class="iconfont icon-shangyishou iconstyles2"></i></div>
            <div class="icon i-center"><i :class="playIcon"
                 @click="togglePlaying"></i></div>
            <div class="icon i-right"
                 :class="disabledClass"><i @click="next"
                 class="iconfont icon-xiayishou iconstyles2"></i></div>
            <div class="icon i-right"><i class="iconfont icon-xihuan iconstyles2"></i></div>
          </div>
        </div>
        <!--尾巴结束-->
        <!--背景图层开始-->
        <div class="background">
          <img :src="currentSong.al.picUrl"
               alt=""
               width="100%"
               height="100%">
        </div>
        <!--背景图层结束-->
      </div>
    </transition>
    <!--收起后固定在底部的播放器-->
    <transition name="mini">
      <div class="mini-player"
           v-show="!fullScreen"
           @click="open">
        <div class="icon">
          <div class="imgWrapper"
               :class="activaclass">
            <img width="40"
                 height="40"
                 :src="currentSong.al.picUrl"></div>
        </div>
        <div class="text">
          <h2 class="name"
              v-html="currentSong.name"></h2>
          <p class="desc"
             v-html="currentSong.ar[0].name"></p>
        </div>
        <div class="control">
          <div class="progress-circle">
            <vm-progress type="circle"
                         :percentage="circlepercent"
                         :width="30"
                         stroke-width="4"
                         track-color="#ffcd32"
                         stroke-color="#0190d4">
              <i :class="playIcon"
                 @click.stop="togglePlaying"
                 style="top:-8px;left:4px;font-size:22px;"></i>
            </vm-progress>
          </div>
        </div>
        <div class="control">
          <div class="progress-circle"><i class="iconfont icon-bianji iconstyles2"></i></div>
        </div>
      </div>
    </transition>
    <audio ref="audio"
           :src="songurl"
           @canplay="ready"
           @error="error"
           @timeupdate="updatetime"
           @ended="endAll"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import animations from 'create-keyframe-animation'
export default {
  data () {
    return {
      message: '播放器',
      flag: false,
      audioflag: false,
      // 正在播放的时间
      currentTime: 0,
      // 存储小滑块滑动的信息
      touch: {},
      // icon改变图标
      modeicon: 'iconfont icon-xunhuanbofang iconstyles2'
    }
  },
  created () {

  },
  components: {

  },
  watch: {
    currentSong (newvalue, oldvalue) {
      if (newvalue.id !== oldvalue.id) {
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      }
    },
    // 监听playing状态要是真就是播放要是假就是暂停
    playing (newvalue) {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        newvalue ? audio.play() : audio.pause()
      })
    },
    // 监听percent变化
    percent (newvalue, oldvalue) {
      if (newvalue >= 0 && !this.touch.enable) {
        this.$nextTick(() => {
          let width = (this.$refs.progresswrapper.clientWidth - this.$refs.progressbtn.clientWidth - 4) * newvalue
          this.$refs.progress.style.width = width + 'px'
          this.$refs.progressbtn.style['transform'] = `translate3d(${width}px,0,0)`
        })
      }
    }
  },
  computed: {
    // 小圈运行百分比
    circlepercent () {
      let value = Math.floor(this.percent)
      if (value === 1) {
        return 1
      } else {
        return this.percent * 100
      }
    },
    // 滑动轴百分比
    percent () {
      return this.currentTime / (this.currentSong.dt / 1000)
    },
    ...mapGetters(['fullScreen', 'playlist', 'currentSong', 'playing', 'currentIndex', 'mode', 'sequenceList']),
    disabledClass () {
      return this.audioflag ? '' : 'fault'
    },
    activaclass () {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon () {
      return this.playing ? 'iconfont icon-zanting iconstyles2' : 'iconfont icon-bofang iconstyles2'
    },

    songurl () {
      let value = this.currentSong.id
      let url = `https://music.163.com/song/media/outer/url?id=${value}.mp3`
      return url
    }
  },
  methods: {

    // 打乱数组开始
    arrrandom (arr) {
      // 这样就不会修改原数组也就是顺序播放的顺序
      let _arr = arr.slice()
      for (let i = 0; i < _arr.length; i++) {
        let j = this.getRandom(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
      }
      return _arr
    },
    getRandom (min, max) {
      // 因为Math.random是0到1所以他取不到1 max-min+1是为了取得最大值MAX
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    // 重新更新currentIndex
    resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setcurrentIndex(index)
    },
    // 改变状态开始
    changeicon () {
      // 获取下一次状态
      let value = (this.mode + 1) % 3
      console.log(value)
      if (value === 0) {
        this.modeicon = 'iconfont icon-xunhuanbofang iconstyles2'
      } else if (value === 1) {
        this.modeicon = 'iconfont icon-danquxunhuan iconstyles2'
      } else if (value === 2) {
        this.modeicon = 'iconfont icon-suiji iconstyles2'
        let list = null
        list = this.arrrandom(this.sequenceList)
        this.resetCurrentIndex(list) // 改变currentIndex
        this.setplaylist(list)
        // currentsong不希望改变
      }
      this.setmode(value)
    },
    // 点击开始到固定的位置
    clicksong (e) {
      this.$refs.progress.style.width = e.offsetX + 'px'
      this.$refs.progressbtn.style['transform'] = `translate3d(${e.offsetX}px,0,0)`
      let width = this.$refs.progresswrapper.clientWidth - this.$refs.progressbtn.clientWidth - 4
      let percent = e.offsetX / width
      this.$refs.audio.currentTime = percent * (this.currentSong.dt / 1000)
    },
    // 点击开始滑动
    touchstart (e) {
      // 允许滑动,这样为了防止监听percent会出现跳点
      this.touch.enable = true
      // 获取点击的起点(为了测量偏移的距离)
      this.touch.start = e.touches[0].pageX
      // 获取初始的位置
      this.touch.first = this.$refs.progress.clientWidth
    },
    // 允许滑动
    touchmove (e) {
      if (!this.touch.enable) {
        return
      }
      // 算出来偏移量 可能是正值也可能是负值
      let result = e.touches[0].pageX - this.touch.start
      // 获取最大的距离
      let width = this.$refs.progresswrapper.clientWidth - this.$refs.progressbtn.clientWidth - 4
      // 最后的位置 this.touch.first + result获取到最终的位置
      const offsetWidth = Math.min(width, Math.max(0, (this.touch.first + result)))
      this.$refs.progress.style.width = offsetWidth + 'px'
      this.$refs.progressbtn.style['transform'] = `translate3d(${offsetWidth}px,0,0)`
    },
    // 结束滑动
    touchend () {
      this.touch.enable = false
      // 获取最大的距离
      let width = this.$refs.progresswrapper.clientWidth - this.$refs.progressbtn.clientWidth - 4
      let progresswidth = this.$refs.progress.clientWidth // 获取到进度条的宽度
      let percent = progresswidth / width
      this.$refs.audio.currentTime = percent * (this.currentSong.dt / 1000)
    },
    ...mapMutations(['setfullScreen', 'setplaying', 'setcurrentIndex', 'setmode', 'setplaylist']),
    // 更新播放时间的方法
    updatetime (e) {
      this.currentTime = e.target.currentTime
    },
    // 把时间变成时间戳
    setTime (time) {
      time = Math.floor(time)
      const minute = Math.floor(time / 60)
      const second = (time % 60) > 9 ? (time % 60) : '0' + (time % 60)
      return `${minute}:${second}`
    },
    // 结束的时候
    endAll () {
      let value = this.mode // 获取到播放状态
      // 单曲循环
      // 随机播放或者顺寻播放就是下一首播放
      if (value === 1) {
        console.log('单曲循环')
        this.$refs.audio.currentTime = 0
        console.log(this.percent)
        this.$refs.audio.play()
      } else {
        console.log(value + '||' + '下一首')
        this.next()
      }
    },
    error () {
      // 未加载完或者出现网络错误
      this.audioflag = true
    },
    ready () {
      this.audioflag = true
    },
    prev () {
      if (!this.audioflag) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playlist.length - 1
      }
      this.setcurrentIndex(index)
      // 为了点击上一首或许下一首歌曲的时候切换状态
      if (!this.playing) {
        this.togglePlaying()
      }
      // 改变没准备状态。因为可能没准备好
      this.audioflag = false
    },
    next () {
      if (!this.audioflag) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playlist.length) {
        index = 0
      }
      this.setcurrentIndex(index)
      // 为了点击上一首或许下一首歌曲的时候切换状态
      if (!this.playing) {
        this.togglePlaying()
      }
      // 改变没准备状态。因为可能没准备好
      this.audioflag = false
    },
    togglePlaying () {
      if (!this.audioflag) {
        return
      }
      this.setplaying(!this.playing)
    },
    back () {
      this.$refs.player.style['height'] = '60px'
      this.$refs.player.style['bottom'] = '0px'
      this.setfullScreen(false)
    },
    open () {
      this.$refs.player.style['height'] = window.innerHeight + 'px'
      this.setfullScreen(true)
    },
    /*
     钩子函数
     enter,leave必须要传入两个值 第一个是el表示获取到的元素 第二个是done表示回调函数
     这里的概念就是获取到起点和终点，然后位移。他都是相对于目标最开始的位置
     要是在目标的左边那X就是负，要是在目标的下边那Y就是-.
    */
    enter (el, done) {
      const { x, y, scale } = this.getPosition()
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: 'translate3d(0,0,0) scale(1.2)'
        },
        100: {
          transform: 'translate3d(0,0,0) scale(1)'
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear',
          delay: 300
        }
      })
      this.$nextTick(() => {
        animations.runAnimation(this.$refs.imgwrapper, 'move', done)
      })
    },
    afterenter (el) {
      animations.unregisterAnimation('move')
      this.$refs.imgwrapper.style.animation = ''
    },
    leave (el, done) {
      const { x, y, scale } = this.getPosition()
      let animation = {
        0: {
          transform: 'translate3d(0,0,0) scale(1)'
        },
        60: {
          transform: 'translate3d(0,0,0) scale(0.6)'
        },
        100: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        }
      }
      animations.registerAnimation({
        name: 'leave',
        animation,
        presets: {
          duration: 300,
          easing: 'linear'
        }
      })
      this.$nextTick(() => {
        animations.runAnimation(this.$refs.imgwrapper, 'leave', done)
      })
    },
    afterleave (el) {
      animations.unregisterAnimation('leave')
      this.$refs.imgwrapper.style.animation = ''
    },
    // 获取偏移量
    getPosition () {
      // 起点宽度
      let targetwidth = 40
      // 起点X轴偏移量
      let targetleft = 40
      // 起点Y轴偏移量
      let targetbottom = 30
      // 终点y轴偏移量
      let resulty = 80
      // 终点宽度
      let resultwidth = (window.innerWidth) * 0.8 // 因为宽度是80%
      // 缩放比例
      let scale = targetwidth / resultwidth // 最后的比例
      // 最终的位移X轴
      let x = -(window.innerWidth / 2 - targetleft)
      // 最终的位移y轴
      let y = (window.innerHeight - resulty - resultwidth / 2 - targetbottom)
      // 返回最后的结果
      return {
        x,
        y,
        scale
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.player {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 150;
  .normal-player {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 150;
    background: @bgcolor;
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.4s;
      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
    .background {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: rgba(0, 0, 0, 0.6);
      -webkit-filter: blur(20px);
      filter: blur(20px);
    }
    .top {
      position: relative;
      .back {
        position: absolute;
        top: 0;
        right: 6px;
        z-index: 50;
        .iconstyles {
          display: block;
          padding: 9px;
          color: @fontcolor;
          font-size: 28px;
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 18px;
        color: @fontcolor;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: white;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      color: white;
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        padding: 10px 0;
        .time-l {
          text-align: left;
        }
        .time {
          color: #fff;
          font-size: 12px;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
        }
        .progress-bar-wrapper {
          flex: 1;
          .progress-bar {
            height: 30px;
            .bar-inner {
              position: relative;
              top: 13px;
              height: 4px;
              background: rgba(0, 0, 0, 0.3);
              .progress {
                position: absolute;
                height: 100%;
                background: @color;
              }
              .progress-btn-wrapper {
                position: absolute;
                left: -4px;
                top: -6px;
                width: 16px;
                height: 16px;
                .progress-btn {
                  position: relative;
                  box-sizing: border-box;
                  width: 16px;
                  height: 16px;
                  border: 3px solid #fff;
                  border-radius: 50%;
                  background: @color;
                }
              }
            }
          }
        }
      }
      .operators {
        display: flex;
        .icon {
          flex: 1;
          color: @fontcolor;
        }
        .i-left {
          text-align: right;
          &.fault {
            color: @fontcolor2;
          }
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
        }
        .i-right {
          text-align: left;
          &.fault {
            color: @fontcolor2;
          }
        }
        .iconstyles2 {
          font-size: 32px;
        }
      }
    }
  }
  .mini-player {
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0px;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: #333;
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 0.4s;
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }
    .icon {
      flex: 0 0 40px;
      width: 40px;
      height: 40px;
      padding: 0 10px 0 20px;
      .imgWrapper {
        height: 100%;
        width: 100%;
        &.play {
          animation: rotate 20s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
        img {
          border-radius: 50%;
        }
      }
    }
    .text {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        color: #fff;
      }
      .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 12px;
        color: hsla(0, 0%, 100%, 0.3);
      }
    }
    .control {
      flex: 0 0 30px;
      height: 30px;
      padding: 0 10px;
      .progress-circle {
        position: relative;
        width: 100%;
        height: 100%;
        .iconstyles2 {
          font-size: 28px;
          position: absolute;
          left: 0;
          top: 0;
          color: @fontcolor;
        }
      }
      .iconstyles2 {
        font-size: 28px;
        position: absolute;
        left: 0;
        top: 0;
        color: @fontcolor;
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

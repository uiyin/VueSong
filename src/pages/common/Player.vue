<template>
  <div class="player"
       v-if="playlist.length>0">
    <!--全屏下-->
    <div class="normal-player"
         v-show="fullScreen">
      <!--背景图层开始-->
      <div class="background">
        <img :src="currentSong.al.picUrl"
             alt=""
             width="100%"
             height="100%">
      </div>
      <!--背景图层结束-->
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
          <div class="cd-wrapper">
            <div class="cd">
              <img :src="currentSong.al.picUrl"
                   class="image"
                   alt="">
              {{currentSong}}
            </div>
          </div>
        </div>
      </div>
      <!--中间结束-->
      <!--尾巴开始-->
      <div class="bottom">
        <div class="operators">
          <div class="icon i-left"><i class="iconfont icon-xunhuanbofang iconstyles2"></i></div>
          <div class="icon i-left"><i class="iconfont icon-shangyishou iconstyles2"></i></div>
          <div class="icon i-center"><i class="iconfont icon-bofang iconstyles2"></i></div>
          <div class="icon i-right"><i class="iconfont icon-xiayishou iconstyles2"></i></div>
          <div class="icon i-right"><i class="iconfont icon-xihuan iconstyles2"></i></div>
        </div>
      </div>
      <!--尾巴结束-->
    </div>
    <!--收起后固定在底部的播放器-->
    <div class="mini-player"
         v-if="!fullScreen"
         @click="open">
      <div class="icon">
        <div class="imgWrapper">
          <img width="40"
               height="40"
               class=""
               :src="currentSong.al.picUrl"></div>
      </div>
      <div class="text">
        <h2 class="name"
            v-html="currentSong.name"></h2>
        <p class="desc"
           v-html="currentSong.ar[0].name"></p>
      </div>
      <div class="control">
        <div class="progress-circle"><i class="iconfont icon-bofang ministyles"></i></div>
      </div>
      <div class="control">
        <div class="progress-circle"><i class="iconfont icon-bianji ministyles"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      message: '播放器'
    }
  },
  components: {

  },
  computed: {

    ...mapGetters(['fullScreen', 'playlist', 'currentSong'])
  },
  methods: {
    ...mapMutations(['setfullScreen']),
    back () {
      this.setfullScreen(false)
    },
    open () {
      this.setfullScreen(true)
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.player {
  .normal-player {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 150;
    background: @bgcolor;
    .background {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      -webkit-filter: blur(20px);
      filter: blur(20px);
    }
    .top {
      position: relative;
      margin-bottom: 25px;
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
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid hsla(0, 0%, 100%, 0.1);
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .operators {
        display: flex;
        .icon {
          flex: 1;
          color: @fontcolor;
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
        }
        .i-right {
          text-align: left;
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
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: #333;
    .icon {
      flex: 0 0 40px;
      width: 40px;
      height: 40px;
      padding: 0 10px 0 20px;
      .imgWrapper {
        height: 100%;
        width: 100%;
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
        .ministyles {
          font-size: 28px;
          position: absolute;
          left: 0;
          top: 0;
          color: @fontcolor;
        }
      }
      .ministyles {
        font-size: 28px;
        position: absolute;
        left: 0;
        top: 0;
        color: @fontcolor;
      }
    }
  }
}
</style>

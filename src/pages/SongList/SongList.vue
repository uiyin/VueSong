<template>
  <div class="singerdetail">
    <!--头部开始-->
    <div class="header">
      <div class="iconfont icon-fanhui iconstyle"
           @click="goback"></div>
      {{playlist.name}}
    </div>
    <div class="bgimg"
         ref="bgimg">
      <img :src="playlist.coverImgUrl"
           alt=""
           class="imgcontent"
           ref="imgcontent">
    </div>
    <!--滚动开始的时候遮罩开始-->
    <div class="zhezhao"
         ref="zhezhao"></div>
    <!--滚动结束的时候遮罩结束-->
    <div class="listwrapper"
         ref="listwrapper"
         v-show="singerflag">
      <ul class="listul">
        <li v-for="(item,index) in hotsong"
            class="listitem"
            :key="index"
            @click="gotourl(item.id,index)">
          <p class="title1">{{item.name}}</p>
          <p class="title2">{{item.ar[0].name}}--{{item.al.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import getData from '@/axios/api.js'
import url from '@/axios/url.js'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      message: '歌单详情',
      id: this.$route.query.id,
      hotsong: [],
      singerflag: false,
      heightresult: 0,
      scrollY: 0,
      playlist: {}
    }
  },
  watch: {
    heightresult () {
      this.$nextTick(() => {
        this._initbetterscroll()
      })
    },
    scrollY (newvalue) {
      if (newvalue <= 0) {
        let value = Math.abs(newvalue)
        let resultHeight = this.heightresult
        let result = resultHeight - value
        if (result > 44) {
          this.$refs.zhezhao.style.top = result + 'px'
          this.$refs.bgimg.style.height = resultHeight + 'px'
          this.$refs.bgimg.style['zIndex'] = 0
        } else {
          this.$refs.zhezhao.style.top = '44px'
          this.$refs.bgimg.style.height = '44px'
          this.$refs.bgimg.style['zIndex'] = 11
        }
      } else {
        let value = Math.abs(newvalue) < 20 ? Math.abs(newvalue) : 20
        let heightall = this.heightresult
        let percent = value / heightall
        let resultpercent = 1 + percent
        this.$refs.imgcontent.style['transformOrigin'] = `top`
        this.$refs.imgcontent.style['transition'] = `all 0.5s`
        this.$refs.imgcontent.style['transform'] = `scale(${resultpercent})`
      }
    }
  },
  mounted () {
    this.getSingerDetail()
    setTimeout(() => {
      this.$nextTick(() => {
        this.singerflag = true
        this.$refs.listwrapper.style.top = 375 + 'px'
        this.heightresult = 375
        // 遮罩部分
        this.$refs.zhezhao.style.height = (375 - 44) + 'px'
        this.$refs.zhezhao.style.top = 375 + 'px'
      })
    }, 500)
  },
  computed: {
    ...mapState({
      singerId: 'singer',
      playlist2: 'playlist'
    })
  },
  methods: {
    ...mapMutations(['setfullScreen']),
    ...mapActions(['selectPlay']),
    _initbetterscroll () {
      let _this = this
      let wrapper = this.$refs.listwrapper
      this.bscroll = new BScroll(wrapper, {
        probeType: 3, // 实时知道位置
        scrollY: true, // 纵向是否滑屏false 就不能滑屏了
        click: true
      })
      this.bscroll.on('scroll', function (res) {
        _this.scrollY = res.y
      })
    },
    gotourl (id, index) {
      console.log(id)
      console.log(index)
      this.selectPlay({
        list: this.hotsong,
        index
      })
      console.log(this.playlist2)
      this.setfullScreen(true)
    },
    goback () {
      this.$router.go(-1)
    },
    getSingerDetail () {
      let _this = this
      let id = this.id
      let obj = {
        method: 'get',
        url: url.gedanlist,
        data: {
          id
        }
      }
      getData(obj).then((res) => {
        if (res.code === 200) {
          _this.playlist = res.playlist
          _this.hotsong = res.playlist.tracks
          console.log(_this.playlist)
          console.log(_this.hotsong)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.singerdetail {
  .header {
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    color: @fontcolor;
    text-align: center;
    position: relative;
    z-index: 12;

    .iconstyle {
      position: absolute;
      left: 0.2rem;
      top: 0rem;
      font-size: 24px;
      line-height: 1rem;
    }
  }
  .bgimg {
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 7.5rem;
    z-index: 0;
    overflow: hidden;
  }
  // 遮罩层开始
  .zhezhao {
    position: absolute;
    width: 100%;
    background: @bgcolor;
  }
  //遮罩层结束
  .listwrapper {
    position: absolute;
    width: 100%;
    z-index: 1;
    bottom: 0px;
    &.active {
    }
    .listul {
      margin-top: 0.4rem;
      .listitem {
        width: 100%;
        height: 0.88rem;
        margin-bottom: 0.4rem;
        text-indent: 0.4rem;
        overflow: hidden;
        z-index: 10;
        .title1,
        .title2 {
          width: 100%;
          height: 0.44rem;
          line-height: 0.44rem;
          color: @fontcolor;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .title2 {
          color: @fontcolor2;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

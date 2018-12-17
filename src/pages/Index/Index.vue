<template>
  <div class="index">
    <Header></Header>
    <Nav></Nav>
    <BScroll @shangla="changeshangla"
             @xiala="changexiala">
      <div slot="betterscrollcontent">
        <div class="shanglajiazai"
             v-if="xialaflag">正在刷新中请稍后</div>
        <Banner :bannerdata="banner"></Banner>
        <HotSong :playlist="playlist"></HotSong>
        <div class="shanglajiazai"
             v-if="shanglaflag">正在加载中请稍后</div>
        <div class="shanglajiazai"
             v-if="closeflag">对不起,暂无数据</div>
      </div>

    </BScroll>
  </div>
</template>

<script>
import Header from '@/pages/common/Header'
import Nav from '@/pages/common/Nav'
import getData from '@/axios/api.js'
import Banner from '@/pages/Index/components/BannerSwiper'
import url from '@/axios/url.js'
import HotSong from '@/pages/Index/components/Hotsonglist'
import BScroll from '@/pages/common/BetterScroll'
export default {
  name: 'Index',
  data () {
    return {
      message: '首页',
      banner: [],
      playlist: [],
      page: 10,
      shanglaflag: false,
      xialaflag: false,
      closeflag: false
    }
  },
  components: {
    Header,
    Nav,
    Banner,
    HotSong,
    BScroll
  },
  created () {
    this.getBanner()
    this.getList(this.page)
  },
  methods: {
    // 用户下拉加载
    changexiala (content) {
      let _this = this
      if (content) {
        this.xialaflag = true
        setTimeout(() => {
          _this.page = 10
          _this.getList(_this.page)
        }, 1000)
      }
    },
    // 用户上拉加载
    changeshangla (content) {
      if (content) {
        this.page += 10
        this.getList(this.page)
      }
    },
    // 获取到banner数据
    getBanner () {
      let obj = {
        url: url.banner,
        method: 'get',
        data: ''
      }
      getData(obj).then((value) => {
        if (value.code === 200) {
          let content = value.banners
          console.log(content)
          let result = content.filter((item, index) => {
            if (item.targetType === '10') { return item } else if (item.targetType === '1') { return item }
          })
          this.banner = result
          console.log(this.banner)
        }
      })
    },
    // 获取到歌单数据
    getList (page) {
      let obj = {
        url: url.songlist,
        method: 'get',
        data: {
          limit: page
        }
      }
      let _this = this
      if (_this.playlist.length >= 100) {
        _this.closeflag = true
      } else {
        _this.shanglaflag = true
      }

      getData(obj).then((value) => {
        if (value.code === 200) {
          this.playlist = value.playlists
          _this.$nextTick(() => {
            _this.shanglaflag = false
            _this.xialaflag = false
            _this.closeflag = false
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.index {
  .shanglajiazai {
    text-align: center;
    color: @fontcolor2;
  }
}
</style>

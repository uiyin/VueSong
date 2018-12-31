<template>
  <div class="singer">
    <Header></Header>
    <Nav></Nav>
    <div class="searchcontent">
      <input type="text"
             v-model="searchcontent"
             placeholder="请输入要搜索的内容"
             class="searchbox"
             @keypress="searchpress">
    </div>
    <h1 class="hotheader">热门搜索</h1>
    <div class="hotsearch"
         ref="hotsearch">
      <ul class="hotsearchcontent">
        <li v-for="(item,index) in hotresult"
            :key="index"
            @click="change(item.first)">{{item.first}}</li>
      </ul>
    </div>
    <!--搜索内容开始-->
    <h1 class="resultheader">搜索结果</h1>
    <div class="searchall"
         ref="betterscrollall">
      <ul class="searchul"
          v-if="searchresult.length>0">
        <li v-for="(item,index) in searchresult"
            :key="index"
            @click="gotourl(item.id,index)">{{item.name}}</li>
      </ul>
      <ul class="searchul"
          v-if="searchresult.length==0">
        <li style="text-align:center;">对不起暂无数据请重新输入</li>
      </ul>
    </div>
    <!--搜索内容结束-->
  </div>
</template>

<script>
import Header from '@/pages/common/Header'
import Nav from '@/pages/common/Nav'
import BScroll from 'better-scroll'
import getData from '@/axios/api.js'
import url from '@/axios/url.js'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      message: '搜索',
      searchcontent: '',
      hotresult: [],
      searchresult: [],
      pagenow: 0,
      flag: true
    }
  },
  components: {
    Header,
    Nav
  },
  created () {
    this.getHot()
    setTimeout(() => {
      this.computedHeight()
    }, 600)
  },
  watch: {
    searchcontent (newval) {
      console.log(newval)
    }
  },
  computed: {
    ...mapGetters(['playlist', 'sequenceList', 'currentIndex', 'currentSong'])
  },
  methods: {
    ...mapMutations(['setfullScreen']),
    ...mapActions(['selectPlay']),
    // 跳转
    gotourl (id, index) {
      console.log(id)
      console.log(index)
      console.log(this.searchresult)
      let value = this.searchresult
      this.selectPlay({
        list: value,
        index
      })
      console.log(this.playlist)
      console.log('当前序号' + this.currentIndex)
      console.log(this.currentSong)
      console.log(this.currentSong.artists[0].img1v1Url)
      console.log(this.currentSong.artists[0].name)
      console.log(this.currentSong.duration)
      this.setfullScreen(true)
    },
    // 搜索框按下回车键
    searchpress (e) {
      let _this = this
      if (e.charCode === 13) {
        _this.flag = true
        _this.pagenow = 0
        _this.searchresult = []
        _this.getsearchcontent()
        console.log('用户按下了回车键')
      }
    },
    // 获取数据
    getsearchcontent () {
      console.log(this.searchcontent)
      let _this = this
      let value = _this.searchcontent
      let obj = {
        url: url.search,
        method: 'get',
        data: {
          keywords: value,
          offset: _this.pagenow * 30 // 默认一页分了30网易云自己规定的
        }
      }
      getData(obj).then((res) => {
        console.log(res)
        if (res.code === 200) {
          if (res.result.songs) {
            for (let i = 0; i < res.result.songs.length; i++) {
              _this.searchresult.push(res.result.songs[i])
            }
          } else {
            _this.flag = false // 没有数据了
          }
        }
      })
    },
    // 点击热选后执行
    change (content) {
      console.log(content)
      let _this = this
      if (content !== _this.searchcontent) {
        _this.flag = true
        _this.pagenow = 0
        _this.searchcontent = content
        _this.searchresult = []
        console.log('执行了')
        _this.getsearchcontent()
      } else {
        _this.searchcontent = content
      }
    },
    computedHeight () {
      // 除去不能确定的热搜高度
      this.$nextTick(() => {
        let firstHeight = 44 * 2 + 40 + 44 * 2
        let hotHeight = this.$refs.hotsearch.clientHeight
        let top = firstHeight + hotHeight
        this.$refs.betterscrollall.style.top = top + 'px'
        this.$refs.betterscrollall.style.bottom = 0 + 'px'
        this._initBetterscroll() // 注册beterscroll
      })
    },
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
        if (_this.flag) {
          _this.pagenow++
          _this.getsearchcontent() // 执行异步
        }
        _this.bscroll.finishPullUp() // 上拉加载完成
        _this.bscroll.refresh() // 重新渲染数据
        // bscroll.closePullUp() // 关闭上拉加载当没有数据的时候执行
      })
      /* 上拉加载事件结束 */
      /* 下拉刷新事件开始 */
      this.bscroll.on('pullingDown', function () {
        // todo异步操作
        console.log('下拉测试')
        _this.getHot()
        _this.searchcontent = ''
        _this.searchresult = []
        _this.pagenow = 0
        setTimeout(() => {
          _this.computedHeight()
        }, 600)
        _this.bscroll.finishPullDown() // 下拉加载完成
        _this.bscroll.refresh() // 重新渲染数据
        // bscroll.closePullDown() // 关闭上拉加载当没有数据的时候执行
      })

      /* 下拉刷新事件结束 */
    },
    getHot () {
      let _this = this
      let obj = {
        url: url.hotsearch,
        method: 'get',
        data: {}
      }
      getData(obj).then((res) => {
        if (res.code === 200) {
          if (res.result.hots.length > 0) {
            _this.hotresult = res.result.hots
          } else {
            _this.hotresult = []
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.searchcontent {
  overflow: hidden;
  .searchbox {
    width: 90%;
    height: 0.6rem;
    font-size: 14px;
    line-height: 0.6rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    border-radius: 10px;
    display: block;
    text-align: center;
    border: none;
    padding: 0px 5px;
  }
}
.hotheader {
  color: @fontcolor;
  font-size: 16px;
  text-indent: 0.4rem;
  height: 0.88rem;
  line-height: 0.88rem;
}
.hotsearch {
  margin-top: 0.2rem;
  overflow: hidden;
  .hotsearchcontent {
    padding-left: 0.2rem;
    overflow: hidden;
    li {
      padding: 5px 10px;
      color: @fontcolor2;
      border: 1px solid @fontcolor2;
      float: left;
      margin-left: 0.2rem;
      margin-bottom: 0.2rem;
      border-radius: 10px;
    }
  }
}
.resultheader {
  color: @fontcolor;
  font-size: 16px;
  text-indent: 0.4rem;
  height: 0.88rem;
  line-height: 0.88rem;
}
.searchall {
  position: fixed;
  bottom: 100%;
  width: 100%;
  overflow: hidden;
  .searchul {
    width: 90%;
    margin: 0 auto;
    li {
      height: 1rem;
      color: @fontcolor2;
      line-height: 1rem;
      border-bottom: 1px solid #ccc;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

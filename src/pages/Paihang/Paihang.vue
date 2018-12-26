<template>
  <div class="singer">
    <Header></Header>
    <Nav></Nav>
    <div class="paihanglist"
         ref="betterscrollall3">
      <ul class="listwrapper">
        <li class="listli"
            @click="gourl(0)">
          <div class="iconli">1</div>
          云音乐新歌榜
        </li>
        <li class="listli"
            @click="gourl(1)">
          <div class="iconli">2</div>
          云音乐热歌榜
        </li>
        <li class="listli"
            @click="gourl(2)">
          <div class="iconli">3</div>
          网易原创歌曲榜
        </li>
        <li class="listli"
            @click="gourl(3)">
          <div class="iconli">4</div>
          云音乐飙升榜
        </li>
        <li class="listli"
            @click="gourl(4)">
          <div class="iconli">5</div>
          云音乐电音榜
        </li>
        <li class="listli"
            @click="gourl(5)">
          <div class="iconli">6</div>
          UK排行榜周榜
        </li>
        <li class="listli"
            @click="gourl(6)">
          <div class="iconli">7</div>
          美国Billboard周榜
        </li>
        <li class="listli"
            @click="gourl(7)">
          <div class="iconli">8</div>
          KTV嗨榜
        </li>
        <li class="listli"
            @click="gourl(8)">
          <div class="iconli">9</div>
          iTunes榜
        </li>
        <li class="listli"
            @click="gourl(9)">
          <div class="iconli">10</div>
          Hit FM Top榜
        </li>
        <li class="listli"
            @click="gourl(10)">
          <div class="iconli">11</div>
          日本Oricon周榜
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '@/pages/common/Header'
import Nav from '@/pages/common/Nav'
import BScroll from 'better-scroll'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Paihang',
  data () {
    return {
      message: '排行'
    }
  },
  components: {
    Header,
    Nav
  },
  computed: {
    ...mapGetters({
      fullflag: 'playlist'
    })
  },
  watch: {
    fullflag () {
      if (this.fullflag.length > 0) {
        this.$refs.betterscrollall3.style.bottom = 60 + 'px'
      } else {
        this.$refs.betterscrollall3.style.bottom = 0 + 'px'
      }
      this.bscroll.destroy()
    }
  },
  activated () {
    this.$nextTick(() => {
      if (this.fullflag.length > 0) {
        this.$refs.betterscrollall3.style.bottom = 60 + 'px'
      } else {
        this.$refs.betterscrollall3.style.bottom = 0 + 'px'
      }
      this._initBetterscroll()
    })
  },
  methods: {
    ...mapMutations(['setfullScreen']),
    _initBetterscroll () {
      let wrap = this.$refs.betterscrollall3
      this.bscroll = new BScroll(wrap, {
        probeType: 3, // 实时知道位置
        scrollY: true, // 纵向是否滑屏false 就不能滑屏了
        click: true
      })
    },
    gourl (id) {
      this.$router.push({
        path: '/paihangdetail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.paihanglist {
  position: fixed;
  width: 100%;
  top: 1.76rem;
  bottom: 0px;
  overflow: hidden;
  .listli {
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 24px;
    color: white;
    padding: 0.6rem 0.6rem;
    .iconli {
      width: 0.6rem;
      height: 0.6rem;
      text-align: center;
      line-height: 0.6rem;
      background: @fontcolor;
      color: @color;
      float: left;
      font-size: 16px;
      margin-right: 0.5rem;
    }
  }
}
</style>

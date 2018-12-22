<template>
  <div class="singer">
    <Header></Header>
    <Nav></Nav>
    <div class="contentall"
         ref="singercontentall">
      <div>
        <ChooseSinger @xuhao="change"></ChooseSinger>
        <SingerAll :dataall='singerresult'
                   :showflag="xuhao"
                   ref="singerall"></SingerAll>
      </div>
    </div>
    <Letter :dataall="letter"
            v-if="showletter"
            @changeletter="updateletter"
            :activenum="letteractive"></Letter>
    <!--滚动标题开始-->
    <p class="title2"
       v-if="showletter"
       ref="fixedtitle">{{lettercontent}}</p>
  </div>
</template>

<script>
import Header from '@/pages/common/Header'
import Nav from '@/pages/common/Nav'
import ChooseSinger from '@/pages/Singer/components/choosesinger'
import SingerAll from '@/pages/Singer/components/Singerall'
import Letter from '@/pages/Singer/components/Lettersinger'
import BScroll from 'better-scroll'
import getData from '@/axios/api.js'
import url from '@/axios/url.js'
export default {
  name: 'Singer',
  data () {
    return {
      message: '歌手',
      xuhao: '1001',
      letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      allsinger: [],
      showflag: false,
      showletter: false,
      letteractive: 'A',
      Heightresult: [],
      scrollY: 0, // 滚动的实时距离
      diff: 0, // 偏移量
      oldLetter: 0 // 节约性能老字母
    }
  },
  components: {
    Header,
    Nav,
    ChooseSinger,
    SingerAll,
    Letter

  },
  created () {
    let _this = this
    let letterall = _this.letter
    for (let i = 0; i < letterall.length; i++) {
      _this.getSinger(letterall[i])
    }
  },
  mounted () {
    let _this = this
    setTimeout(() => {
      _this.$nextTick(() => {
        _this.getHeight()
        _this._initBetterscroll()
      })
    }, 3000)
  },
  methods: {
    // 创建Betterscroll开始
    _initBetterscroll () {
      let _this = this
      let wrapper = this.$refs.singercontentall
      this.bscroll = new BScroll(wrapper, {
        probeType: 3, // 实时知道位置
        scrollY: true, // 纵向是否滑屏false 就不能滑屏了
        click: true
      })
      this.bscroll.on('scroll', function (content) {
        let value = Math.abs(content.y)
        _this.scrollY = value
        // 因为滚动的距离距离顶部就是138
        if (value > 138) {
          _this.showletter = true
        } else {
          _this.showletter = false
        }
      })
    },
    change (result) {
      this.xuhao = result
    },
    getSinger (letter) {
      let _this = this
      let id = this.xuhao
      let allresult = _this.allsinger // 获取到所有的数据
      let obj = {
        url: url.singer,
        method: 'get',
        data: {
          cat: id,
          limit: 30,
          initial: letter
        }
      }
      getData(obj).then((res) => {
        let result = {
          title: letter,
          content: res.artists
        }
        allresult.push(result)
        _this.allsinger = allresult
      })
    },
    updateletter (content) {
      console.log(content)
      this.$nextTick(() => {
        let wrapper = this.$refs.singerall.$refs.singercontentall.childNodes[0].children // 找到节点合集
        let value = this.letter
        let index = 0
        for (let i = 0; i < value.length; i++) {
          if (content === value[i]) {
            index = i
          }
        }
        this.bscroll.scrollToElement(wrapper[index], 300)
      })
    },
    // 获取高度
    getHeight () {
      // let marginheight = 44 * 5 // 因为前面一共5行每一行都是44px，换算成rem就是0.88
      let topHeight = 144 // 获取到高度
      let HeightAll = [] // 用来存储所有高度
      HeightAll.push(topHeight) // 存储开始位置
      let wrapper = this.$refs.singerall.$el.children[0].children[0].children// 找到节点合集
      for (let i = 0; i < wrapper.length; i++) {
        topHeight += wrapper[i].clientHeight
        HeightAll.push(topHeight)
      }
      this.Heightresult = HeightAll
    }
  },
  computed: {
    lettercontent () {
      return this.letteractive
    },
    singerresult () {
      let letter = this.letter
      let data = this.allsinger
      let result = []
      for (let i = 0; i < letter.length; i++) {
        for (let n = 0; n < data.length; n++) {
          if (data[n].title === letter[i]) {
            result.push(data[n])
          }
        }
      }
      return result
    }
  },
  watch: {
    xuhao (newvalue, oldvalue) {
      let _this = this
      _this.allsinger = []
      let letterall = _this.letter
      for (let i = 0; i < letterall.length; i++) {
        _this.getSinger(letterall[i])
      }
    },
    scrollY (newvalue, oldvalue) {
      let scrolljuli = newvalue + 2 // 差了2PX
      let height = this.Heightresult
      let Letter = this.letter
      for (let i = 0; i < height.length; i++) {
        let height1 = height[i]
        let height2 = height[i + 1]
        if (scrolljuli <= height2 && scrolljuli >= height1) {
          if (this.oldLetter !== Letter[i]) {
            this.letteractive = Letter[i]
            console.log(this.letteractive)
            this.diff = height2 - scrolljuli // 获取下一个滚动到标题的位置
            this.oldLetter = Letter[i]
          }
        } else if (scrolljuli < height[0]) {
          if (this.oldLetter !== Letter[0]) {
            this.letteractive = Letter[0]
            this.oldLetter = Letter[0]
            console.log(this.letteractive)
          }
        } else if (scrolljuli > height[height.length - 1]) {
          console.log(newvalue)
          if (this.oldLetter !== Letter[height.length - 1]) {
            this.letteractive = Letter[height.length - 1]
            this.oldLetter = Letter[height.length - 1]
            console.log(this.letteractive)
          }
        }
      }
    },
    diff (newvalue) {
      setTimeout(() => {
        let box = this.$refs.fixedtitle
        // 应为标题的高度就是30
        if (newvalue < 10) {
          box.style['transition-duration'] = '0.2s'
          box.style.transform = 'translate(0px,-' + '10' + 'px)'
          box.style.zIndex = '-1'
        } else {
          box.style.transform = 'translate(0px,-' + '0' + 'px)'
          box.style.zIndex = '0'
        }
      }, 10)
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.contentall {
  width: 100%;
  top: 1.76rem;
  bottom: 0rem;
  position: absolute;
  overflow: hidden;
}
.title2 {
  position: fixed;
  top: 1.76rem;
  left: 0px;
  font-size: 14px;
  color: @fontcolor2;
  padding-left: 0.2rem;
  background: #333;
  height: 30px;
  line-height: 30px;
  width: 100%;
}
</style>

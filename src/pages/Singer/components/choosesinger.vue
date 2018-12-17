<template>
  <div class="choosesinger"
       ref="allchangesinger">
    <BSleft>
      <ul class="contentul"
          slot="slotcontent">
        <li class="active">男</li>
        <li class="active"
            @click="fashe(1001,$event)">华语</li>
        <li @click="fashe(2001,$event)">欧美</li>
        <li @click="fashe(6001,$event)">日本</li>
        <li @click="fashe(7001,$event)">韩国</li>
        <li @click="fashe(4001,$event)">其他</li>
      </ul>
    </BSleft>
    <BSleft>
      <ul class="contentul"
          slot="slotcontent">
        <li>女</li>
        <li @click="fashe(1002,$event)">华语</li>
        <li @click="fashe(2002,$event)">欧美</li>
        <li @click="fashe(6002,$event)">日本</li>
        <li @click="fashe(7002,$event)">韩国</li>
        <li @click="fashe(4002,$event)">其他</li>
      </ul>
    </BSleft>
    <BSleft>
      <ul class="contentul"
          slot="slotcontent">
        <li>乐队</li>
        <li @click="fashe(1003,$event)">华语</li>
        <li @click="fashe(2003,$event)">欧美</li>
        <li @click="fashe(6003,$event)">日本</li>
        <li @click="fashe(7003,$event)">韩国</li>
        <li @click="fashe(4003,$event)">其他</li>
      </ul>
    </BSleft>
  </div>
</template>

<script>
import BSleft from '@/pages/common/BetterScrollLeft'
export default {
  data () {
    return {
      message: '歌手分类'
    }
  },
  components: {
    BSleft
  },
  methods: {
    fashe (content, value) {
      let wrapper = this.$refs.allchangesinger.getElementsByTagName('li')
      for (let i = 0; i < wrapper.length; i++) {
        wrapper[i].className = ''
      }
      let allchildren = value.target.parentNode.children

      value.target.classList.value = 'active'
      allchildren[0].className = 'active'
      this.$emit('xuhao', content)
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.choosesinger {
  margin-top: 0.2rem;
  .contentul {
    height: 0.88rem;
    overflow: hidden;
    width: 9rem;
    li {
      font-size: 14px;
      color: @fontcolor2;
      float: left;
      margin-left: 0.8rem;
      line-height: 0.88rem;
    }
    & .active {
      color: @fontcolor;
    }
  }
}
</style>

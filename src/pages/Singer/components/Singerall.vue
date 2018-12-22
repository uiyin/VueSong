<template>
  <div class="wrapper">
    <div class="contentall"
         ref="singercontentall"
         v-show="showflag2">
      <ul class="contentul">
        <li v-for="(item,index) in dataall"
            :key="index">
          <p class="title">{{item.title}}</p>
          <div class="listitem"
               v-for="(content,index2) in item.content"
               :key="index2"
               @click="gotourl(content.id)">

            <div class="imgwrapper">
              <img v-lazy="content.picUrl"
                   alt="">
            </div>

            <p>{{content.name}}</p>

          </div>
        </li>

      </ul>
    </div>
    <div class="container"
         v-show="!showflag2">
      <p>正在加载中请稍后</p>
    </div>

  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['dataall', 'showflag'],
  mounted () {
    setTimeout(() => {
      this.showflag2 = true
    }, 2000)
  },
  computed: {
    ...mapState({
      singerId: 'singer'
    })
  },
  data () {
    return {
      message: '歌手汇总',
      showflag2: false
    }
  },
  watch: {
    showflag () {
      this.showflag2 = false
    },
    showflag2 (newvalue, oldvalue) {
      if (!newvalue) {
        setTimeout(() => {
          this.showflag2 = true
        }, 2000)
      }
    }
  },
  methods: {
    ...mapMutations({
      setsinger: 'setsinger'
    }),
    // 点击方法
    gotourl (content) {
      this.setsinger(content)
      this.$router.push({
        path: '/singer/' + content
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.wrapper {
  .contentul {
    li {
      .title {
        font-size: 14px;
        color: @fontcolor2;
        padding-left: 0.2rem;
        background: #333;
        height: 30px;
        line-height: 30px;
        width: 100%;
      }
      .listitem {
        font-size: 14px;
        color: @fontcolor2;
        padding-left: 0.2rem;
        height: 1.5rem;
        line-height: 1.5rem;
        .imgwrapper {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          overflow: hidden;
          float: left;
          margin: 0.25rem 0.3rem;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
  }
  .container {
    overflow: hidden;
    text-align: center;
    color: @fontcolor2;
    font-size: 16px;
    line-height: 8rem;
  }
}
</style>

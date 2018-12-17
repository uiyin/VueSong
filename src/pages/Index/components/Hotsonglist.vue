<template>
  <div class="songlist">
    <h1 class="hotheader">网友热门歌单推荐</h1>

    <ul ref="bettercontent"
        v-if="playlist.length>0"
        class="contentall">
      <li class="contentli"
          v-for="(item,index) in playlist"
          :key="index"
          @click='gotourl(item.id)'>
        <div class="left">
          <img v-lazy="item.coverImgUrl"
               alt="">
        </div>
        <div class="right">
          <p class="listname"> <span>{{item.name}} </span></p>
          <p class="name">作者 <span style="color:white">{{item.creator.nickname}}</span> </p>

          <!-- <p class="description">{{item.description}}</p> -->
        </div>
      </li>
    </ul>

  </div>
</template>

<script>

export default {
  props: ['playlist'],
  data () {
    return {
      message: '热门歌单推荐'
    }
  },
  methods: {
    gotourl (id) {
      console.log(id)
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.songlist {
  background: @bgcolor;
  overflow: hidden;
  .hotheader {
    width: 100%;
    height: 1.3rem;
    color: @fontcolor;
    font-size: 14px;
    line-height: 1.3rem;
    text-align: center;
  }
  .contentall {
    .contentli {
      width: 100%;
      height: 1.66rem;
      display: flex;
      flex-flow: row nowrap;
      padding: 0.1rem 0.4rem;

      .left {
        flex: 0 0 1.2rem;
        height: 1.2rem;
        margin-top: 0.44rem;
        margin-right: 0.3rem;
      }
      .right {
        flex: 1;
        height: 1.66rem;
        font-size: 12px;
        display: flex;
        flex-flow: column nowrap;
        .name,
        .listname {
          flex: 1;
          width: 100%;
          font-size: 14px;
          color: @fontcolor2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 0.44rem;
          span {
            color: @fontcolor;
          }
        }
      }
    }
  }
}
</style>

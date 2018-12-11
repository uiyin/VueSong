<template>
  <div class="banner">
    <swiper :options="swiperOption"
            ref="mySwiper"
            v-if="bannerdata.length>1">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in bannerdata"
                    :key="index"
                    @click.native="gotourl(item.targetId)">
        <img :src="item.picUrl"
             alt=""
             class="imgcontent">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"
           slot="pagination"></div>
    </swiper>

  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: ['bannerdata'],
  data () {
    return {
      message: '轮播图',
      swiperOption: {
        effect: 'slide',
        speed: 300,
        autoplay: {
          delay: 3000,
          // 主要是为了解决滑动之后，自动滑动失效问题
          disableOnInteraction: false
        },
        // 循环的时候必须要加上下面3个属性要不然loop不生效,还得在最外层加上v-if判断个数
        loop: true,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        // 循环结束
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        }
      }
    }
  },
  methods: {
    gotourl (id) {
      console.log(id)
    }
  },
  mounter () {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log('this is current swiper instance object', this.swiper)
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    banner () {
      return this.bannerdata
    },
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.banner {
  width: 100%;
  height: 0;
  background: @bgcolor;
  overflow: hidden;
  padding-bottom: 3.45rem;
  .swiper-slide {
    width: 100%;
    height: 3.45rem;
    .imgcontent {
      width: 100%;
      height: 100%;
    }
  }
  /deep/.swiper-pagination {
    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background: white;
      opacity: 1;
      &.swiper-pagination-bullet-active {
        background: red;
      }
    }
  }
}
</style>

<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <Banner :bannerdata="banner"></Banner>
    text
  </div>
</template>

<script>
import Header from '@/pages/common/Header'
import Nav from '@/pages/common/Nav'
import getData from '@/axios/api.js'
import Banner from '@/pages/Index/components/BannerSwiper'
import url from '@/axios/url.js'
export default {
  name: 'Index',
  data () {
    return {
      message: '首页',
      banner: []
    }
  },
  components: {
    Header,
    Nav,
    Banner
  },
  created () {
    this.getBanner()
  },
  methods: {
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
            if (item.targetType === '10') {
              return item
            }
          })
          this.banner = result
          console.log(this.banner)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.styles {
  background: #ccc;
  font-size: 14px;
}
</style>

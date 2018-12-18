<template>
  <div class="login"
       ref="login">
    <!--背景层开始-->
    <div :class="[xieyiflag||userflag||agreeflag?'bg active':'bg']"
         ref="bg">
      <img :src="bgsrc"
           alt=""
           class="imgcontent">
    </div>
    <!--背景层结束-->
    <!--登录框组件开始-->
    <LoginInput @showrulesflag="showrule"
                @shebei="changeshebei"></LoginInput>
    <!--登录框组件结束-->
    <!--协议遮罩层开始-->
    <GoTop>
      <Xieyi v-if="xieyiflag"
             @closeflag="closeflag"
             slot="xieyi">
        <Loginvalue slot="logincontent"></Loginvalue>
      </Xieyi>
    </GoTop>
    <!--协议遮罩层结束-->
    <!--用户名和密码开始-->
    <GoTop>
      <Xieyi v-if="userflag"
             @closeflag="closeflag"
             slot="xieyi">
        <Dialogvue slot="dialogcontent"></Dialogvue>
      </Xieyi>
    </GoTop>
    <!--用户名和密码结束-->
    <!--协议同意开始-->
    <GoTop>
      <Xieyi v-if="agreeflag"
             @closeflag="closeflag"
             slot="xieyi">
        <NoXieyi slot="xieyicontent"></NoXieyi>
      </Xieyi>
    </GoTop>
    <!--协议不同意结束-->

  </div>
</template>

<script>
import GoTop from '@/pages/common/TransitonTop'
import LoginInput from '@/pages/Login/components/Denglu'
import Xieyi from '@/pages/Login/components/Xieyi'
import Loginvalue from '@/pages/Login/components/Loginvalue'
import Dialogvue from '@/pages/Login/components/Dialogvue'
import NoXieyi from '@/pages/Login/components/NoXieyi'
export default {
  name: 'Login',
  data () {
    return {
      message: '登陆',
      bgsrc: require('@/assets/images/b.png'),
      xieyiflag: false,
      userflag: false,
      agreeflag: false
    }
  },
  created () {
    this.$nextTick(() => {
      this.initwrapper()
    })
  },
  components: {
    LoginInput,
    Xieyi,
    GoTop,
    Loginvalue,
    Dialogvue,
    NoXieyi
  },
  methods: {
    changeshebei (content) {
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      if (isAndroid) {
        if (content) {
          this.$refs.bg.style['top'] = '-250px'
        } else {
          this.$refs.bg.style['top'] = '0px'
        }
      }
    },
    closeflag (content) {
      this.xieyiflag = content
      this.userflag = content
      this.agreeflag = content
    },
    showrule (content) {
      // 1 就是用户名密码不对 2 就是协议没有同意  0 就是协议出现
      if (content.id === 1) {
        this.userflag = content.flag
        console.log(this.userflag)
      } else if (content.id === 2) {
        this.agreeflag = content.flag
        console.log(this.agreeflag)
      } else {
        this.xieyiflag = content.flag
        console.log(this.xieyiflag)
      }
    },
    initwrapper () {
      let width = this.$refs.login.offsetWidth
      let height = this.$refs.login.offsetHeight
      let percent = (640 / 960)
      let resultwidth = height * percent // 获取到最后的宽度
      let resultleft = (width - resultwidth) / 2
      this.$refs.bg.style.width = resultwidth + 'px'
      this.$refs.bg.style.height = height + 'px'
      this.$refs.bg.style.left = resultleft + 'px'
      console.log(width)
      console.log(height)
      console.log(resultwidth)
    }
  }

}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.login {
  overflow: hidden;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    &.active {
      filter: blur(10px);
      z-index: -1;
    }
    .imgcontent {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

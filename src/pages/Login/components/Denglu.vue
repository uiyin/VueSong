<template>
  <div class="denglu">
    <div class="name">
      <span>用户名 ：</span>
      <input type="text"
             class="nameinput"
             v-model="name">
    </div>
    <div class="name">
      <span>密码 ：</span>
      <input type="text"
             class="nameinput"
             v-model="password">
    </div>
    <div class="rules"
         @click="changecheckbox(index)"
         v-for="(item,index) in checkboxall"
         :key="index">
      <input type="checkbox"
             class="checkboxitem"
             :checked="item.checked">
      <span>我同意此协议</span>
      <span @click.stop="showrules(0)"
            class="xieyi">
        用户协议和隐私政策
      </span>
    </div>
    <div class="dengluinfo">默认用户名:admin 密码:123</div>
    <div class="submitbutton">
      <button class="denglubutton"
              @click="showrules(1)">登陆</button>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'DentLu',
  data () {
    return {
      message: '登录框',
      name: '',
      password: '',
      checkboxall: [
        {
          checked: false,
          content: ' 用户协议和隐私政策'
        }
      ]
    }
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    ...mapMutations(['changetoken']),
    showrules (content) {
      let value = this.checkboxall[0].checked
      let name = this.name
      let password = this.password
      if (content) {
        if (value) {
          if (name === 'admin' && password === '123') {
            // 这里应该向后台发送数据后后台给你返回一个TOKEN，我这里就直接把admin利用MD5加密了
            this.changetoken('21232f297a57a5a743894a0e4a801fc3')
            this.$router.push('/')
          } else {
            this.$emit('shorulesflag', { id: 1, flag: true })
          }
        } else {
          this.$emit('shorulesflag', { id: 2, flag: true })
        }
      } else {
        this.$emit('shorulesflag', { id: 0, flag: true })
      }
    },
    changecheckbox (index) {
      this.checkboxall[index].checked = !this.checkboxall[index].checked
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/common.less";
.denglu {
  position: absolute;
  bottom: 5%;
  left: 0px;
  width: 100%;
  overflow: hidden;
  .name {
    font-size: 18px;
    color: white;
    line-height: 36px;
    text-align: center;
    font-weight: 600;
    span {
      width: 1.56rem;
      height: 0.48rem;
      display: inline-block;
      text-align: right;
    }
    .nameinput {
      border: none;
      border-radius: 5px;
      padding: 0px 10px;
      width: 2rem;
    }
  }
  .rules {
    margin-top: 0.2rem;
    text-align: center;
    color: white;
    overflow: hidden;
    span {
      font-size: 14px;
      line-height: 0.4rem;
    }
    .checkboxitem {
      border: none;
      width: 0.3rem;
      height: 0.3rem;
      vertical-align: middle;
    }
    .xieyi {
      color: @color;
    }
  }
  .dengluinfo {
    font-size: 14px;
    color: white;
    text-align: center;
  }
  .submitbutton {
    text-align: center;
    margin-top: 0.2rem;
    .denglubutton {
      width: 1.3rem;
      height: 0.8rem;
      text-align: center;
      background: @color;
      color: white;
      font-size: 14px;
      line-height: 0.8rem;
      border-radius: 5px;
      border: none;
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>

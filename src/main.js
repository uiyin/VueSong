// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import Navigation from 'vue-navigation'
import VueLazyload from 'vue-lazyload'
import storgeMemery from '@/store/localstorge'
import Progress from 'vue-multiple-progress'
import '@/assets/css/base.css'
import '@/assets/css/border.css'
import '@/assets/css/iconfont.css'

Vue.use(Navigation, {
  router
})
Vue.use(Progress)
Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  loading: '../static/images/avaster.jpg'
})
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 设置延时器让created先执行在进行路由跳转
  // 取出token值
  let value = storgeMemery.getvalue('token') // 取出来token
  setTimeout((res) => {
    // 判断该路由是否需要登录权限
    if (to.name === 'Login') {
      next()
    } else {
      if (value) {
        next()
      } else {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
  }, 100)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

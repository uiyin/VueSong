import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index/Index'
import Login from '@/pages/Login/Login'
import Search from '@/pages/Search/Search'
import Singer from '@/pages/Singer/Singer'
import Paihang from '@/pages/Paihang/Paihang'
import SingerDetail from '@/pages/SingerDetail/SingerDetail'
import SongList from '@/pages/SongList/SongList'
import PaiHangDetail from '@/pages/PaiHangDetail/PaiHangDetail'
Vue.use(Router)
/* eslint-disable */
export default new Router({
  routes: [{
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/singer/:id',
      name: 'SingerDetail',
      component: SingerDetail
    }, {
      path: '/paihang',
      name: 'Paihang',
      component: Paihang
    },
    {
      path: '/songlist',
      name: 'songlist',
      component: SongList
    },
    {
      path: '/paihangdetail',
      name: 'PaiHangDetail',
      component: PaiHangDetail
    }

  ],
  // 自定义路由切换时页面如何滚动
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

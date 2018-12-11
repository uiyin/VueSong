import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index/Index'
import Login from '@/pages/Login/Login'
import Search from '@/pages/Search/Search'
import Singer from '@/pages/Singer/Singer'
import Paihang from '@/pages/Paihang/Paihang'
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
      path: '/paihang',
      name: 'Paihang',
      component: Paihang
    }
  ]
})

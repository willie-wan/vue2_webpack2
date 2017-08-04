import Vue from 'vue'
import Router from 'vue-router'
import lhbIndex from '@/views/lhb/index'
import login from '@/views/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lhbIndex',
      component: lhbIndex
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

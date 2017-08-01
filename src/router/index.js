import Vue from 'vue'
import Router from 'vue-router'
import lhbIndex from '@/components/lhb/index'
import demon1 from '@/components/demo/demo1'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lhbIndex',
      component: lhbIndex
    },
    {
      path: '/demo1',
      name: 'demon1',
      component: demon1
    }
  ]
})

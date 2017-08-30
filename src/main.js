// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/user'
import './assets/styles/sm.min.css'
import './assets/styles/main.css'

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.user) {
    store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.user));
}
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

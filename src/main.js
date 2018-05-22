import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastClick'
import 'common/stylus/index.styl'
import 'babel-polyfill'
import axios from 'axios'
Vue.prototype.$ajax = axios
Vue.config.productionTip = false
fastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

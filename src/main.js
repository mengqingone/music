import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastClick'
import 'common/stylus/index.styl'
import 'babel-polyfill'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

Vue.prototype.$ajax = axios
Vue.config.productionTip = false
fastClick.attach(document.body)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/static/img/error.png',
  loading: 'dist/static/loading.gif',
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

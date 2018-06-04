import Vuex from 'vuex'
import mutations from './mutation'
import getters from './getters'
import createLogger from 'vuex/dist/logger'
import state from './state'
import Vue from 'vue'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
export default store

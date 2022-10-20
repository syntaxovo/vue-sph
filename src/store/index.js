import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/Home/index.js'
import search from '@/store/Search/index.js'
import detail from '@/store/Detail/index.js'
import cart from '@/store/cart/index.js'
import register from '@/store/register/index.js'
import login from '@/store/login/index.js'
import trade from '@/store/trade/index.js'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    search,
    detail,
    cart,
    register,
    login,
    trade
  }
})

import { userTologinAPI, getuserlogininfoAPI, outloginAPI } from '../../../API/index.js'
import { setToken, gettoken, removetoken } from '@/utils/token.js'
const loginModel = {
  state: {
    token: gettoken(), // 存储token令牌
    userinfo: {} // 存储登录时的信息
  },
  mutations: {
    USERTOLOGIN (state, token) {
      state.token = token
    },
    GETUSERLOGININFO (state, userinfo) {
      state.userinfo = userinfo
    },
    CLEAR (state) {
      // 退出登录清除所有信息
      state.token = ''
      state.userinfo = ''
      removetoken()
    }
  },
  actions: {
    // 用户请求登录
    async  userTologin ({ commit }, data) {
      const res = await userTologinAPI(data)
      console.log(res)
      if (res.code === 200) {
        commit('USERTOLOGIN', res.data.token)
        // 本地持久化存储
        setToken(res.data.token)
        return 'OK'
      } else {
        return Promise.reject(new Error('false'))
      }
    },
    // 获取用户登录时的信息
    async getuserlogininfo ({ commit }) {
      const res = await getuserlogininfoAPI()
      console.log(res)
      if (res.code === 200) {
        commit('GETUSERLOGININFO', res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('false'))
      }
    },
    // 用户退出登录
    async quitlogin ({ commit }) {
      const res = await outloginAPI()
      if (res.code === 200) {
        // 请求成功，清除用户信息以及token，
        commit('CLEAR')
      } else {
        return Promise.reject(new Error('false'))
      }
    }
  },
  getters: {}
}
export default loginModel

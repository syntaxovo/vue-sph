import { getregistercodeAPI, userregisterAPI } from '../../../API/index.js'
const registerModule = {
  state: {
    code: '' // 用于存储收到的验证码
  },
  mutations: {
    GETRESGISTERCODE (store, code) {
      store.code = code
    }
  },
  actions: {
    // 获取注册验证码
    async getregisterAPI ({ commit }, phone) {
      const res = await getregistercodeAPI(phone)
      console.log(res)
      if (res.code === 200) {
        commit('GETRESGISTERCODE', res.data)
      } else {
        return Promise.reject(new Error('false'))
      }
    },
    // 实现用户登录的派发
    async useregister ({ commit }, user) {
      const res = await userregisterAPI(user)
      // console.log(res)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('注册失败'))
      }
    }
  },
  getters: {}
}
export default registerModule

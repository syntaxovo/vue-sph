import { getAddresslistAPI, getorderinfoAPI } from '../../../API/index.js'
const TradeModel = {
  state: {
    address: [
      {
        id: 1,
        userAddress: '北京市昌平区2',
        userId: 1,
        consignee: 'admin',
        phoneNum: '15011111111',
        isDefault: '0'
      },
      {
        id: 2,
        userAddress: '上海市虹桥机场',
        userId: 2,
        consignee: '张三',
        phoneNum: '15011111222',
        isDefault: '0'
      },
      {
        id: 3,
        userAddress: '河北省保定市',
        userId: 3,
        consignee: 'yqj',
        phoneNum: '1501123211111',
        isDefault: '1'
      }

    ], // 用于存储用于地址信息
    orderinfo: {}
  },
  mutations: {
    GETORDERINFO (state, orderinfo) {
      state.orderinfo = orderinfo
    }
  },
  actions: {

    // 派发获取用户订单信息
    async getdorderinfo ({ commit }) {
      const res = await getorderinfoAPI()
      console.log(res)
      if (res.code === 200) {
        commit('GETORDERINFO', res.data)
      } else {
        return Promise.reject(new Error('false'))
      }
    }
  },
  getters: {}
}
export default TradeModel

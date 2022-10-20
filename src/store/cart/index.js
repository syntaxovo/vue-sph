import { getpersonalcarAPI, delcartbyIdAPI, changegoodsischeckedAPI } from '../../../API/index.js'
const CartModel = {
  state: {
    cartList: []
  },
  mutations: {
    GETCARTDATA (store, cartList) {
      store.cartList = cartList
    }
  },
  actions: {
    // 派发请求获取购物车信息
    async getcartdata ({ commit }) {
      const res = await getpersonalcarAPI()
      if (res.code === 200) {
        commit('GETCARTDATA', res.data)
      }
    },
    // 删除一个商品信息
    async delttecartinfoByid ({ commit }, skuId) {
      const res = await delcartbyIdAPI(skuId)
      if (res.code === 200) {
        return 'true'
      } else {
        return Promise.reject(new Error('删除购物车信息失败'))
      }
    },
    // 删除全部的商品
    async delcartgoodsall ({ getters, dispatch }) {
      // console.log(context)
      // context :小仓库  commit:[提交mutation修改state] getters[计算属性] dispatch[派发action] state[当前仓库]
      const goods = getters.cartList.cartInfoList
      // 获取购物车的商品列表，在循环派发删除单个信息的方法，实现删除全部
      //  console.log(goods)
      // 定义一个空数组来存储每次删除返回的promise对象
      const promiseAll = []
      goods.forEach(item => {
        // eslint-disable-next-line no-unused-expressions
        const res = item.isChecked === 1 ? dispatch('delttecartinfoByid', item.skuId) : ''
        // console.log(res)
        promiseAll.push(res)
      })

      return Promise.all(promiseAll)
      // promise.all([p1,p2,p3])
      // 只有p1,p2,p3返回值全为真，返回真
    },
    // 改变商品选中的状态
    async changegoodsischeckedinfo ({ commit }, { skuId, isChecked }) {
      const res = await changegoodsischeckedAPI(skuId, isChecked)
      if (res.code === 200) {
        return 'OK'
      } else {
        return Promise.reject(new Error('false'))
      }
    },
    // 改变全选按钮的状态
    ischangeall ({ state, dispatch }, isChecked) {
      // 定义一个空数组来存储每次循环后的promise对象
      // console.log(state)
      // console.log(isChecked)
      const promiseAll = []
      state.cartList[0].cartInfoList.forEach(item => {
        const promise = dispatch('changegoodsischeckedinfo', { skuId: item.skuId, isChecked })
        promiseAll.push(promise)
      })
      // 最终的返回结果
      return Promise.all(promiseAll)
    }
  },
  getters: {
    cartList (state) {
      return state.cartList[0] || {}
    }

  }
}
export default CartModel

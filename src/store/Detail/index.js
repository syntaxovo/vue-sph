
import { reqgetgoodsAPI, addorupdateCarsAPI } from '../../../API/index.js'
import { getuuid } from '@/utils/UUid_token.js'
const DetailMoudle = {
  state: {
    goodsinfo: {}, // 商品信息
    UUidtoken: getuuid() // 定义游客身份id
  },
  mutations: {
    // 修改商品信息详情
    GETGOODSAPI (state, goodsinfo) {
      state.goodsinfo = goodsinfo
    }
  },
  actions: {
    // 异步获取商品详情信息
    async getgoodsAPI ({ commit }, skuid) {
      const res = await reqgetgoodsAPI(skuid)
      if (res.code === 200) {
        console.log(res)
        commit('GETGOODSAPI', res.data)
      }
    },
    // 异步获取添加到购物车的信息
    // 加入到购物车的解构(发请求)，前台将参数带给服务器
    // 服务器写入数据成功，并没有返回其他的数据，只是返回code==200,代表操作成功
    // 所以没必要仓库三连环来存储数据
    async getcarsinfo ({ commit }, { skuId, skuNum }) {
      const res = await addorupdateCarsAPI(skuId, skuNum)
      // 代表加入购物车成功
      if (res.code === 200) {
        // console.log(res)
        return '加入购物车成功'
      } else {
        // 代表加入购物车失败
        return Promise.reject(new Error('加入购物车失败'))
      }
    }

  },
  getters: {
    // 商品信息
    categoryView (state) {
      /*
  state.goodsinfo 初始值的空对象，空对象的categoryView属性值为undef
      当奇拿计算出的 categoryView的属性值至少是一个空对象
      */
      return state.goodsinfo.categoryView || {}
    },
    // 商品信息
    skuInfo (state) {
      return state.goodsinfo.skuInfo || {}
    },
    // 商品详情数据 [颜色、规格]
    spuSaleAttrList (state) {
      return state.goodsinfo.spuSaleAttrList || {}
    }
  }
}
export default DetailMoudle

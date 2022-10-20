import { reqgetsearchAPI } from '../../../API/index'
const SearchModule = {
  state: {
    searchlist: {}
  },
  mutations: {
    GETSEARCHLIST (store, searchlist) {
      store.searchlist = searchlist
    }
  },
  actions: {
    // 派发获取search商品数据
    async getsearchlist ({ commit }, params = {}) {
      const data = await reqgetsearchAPI(params)
      /*
        当前这个reqgetsearchAPI 在调用获取服务器数时，至少需要传递一个参数
        params形参：是当用户派发action的时候，第二个参数传递过来，至少是一个空对象
      */
      if (data.code === 200) {
        console.log(data)
        commit('GETSEARCHLIST', data.data)
      }
    }
  },
  /*
    计算属性，项目中getters主要作用就是简化仓库中的数据
    可以把我们将来在组件当中需要用的数据简化一下[将来组件在获取数据时就方便了]
  */
  getters: {
    /*
      当前形参state，当前仓库中的state，并非大仓库的state
      如果服务器数据回来了，没问题时一个数组
      假如网络不给力或没有网 应该返回一个 undefined
      计算属性的属性值至少给来一个数组
    */
    attrsList (state) {
      return state.searchlist.attrsList || []
    },
    goodsList (state) {
      return state.searchlist.goodsList || []
    },
    trademarkList (state) {
      return state.searchlist.trademarkList || []
    }
  }
}
export default SearchModule

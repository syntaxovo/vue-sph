import { reqCategoryList, getmockListcontainer, reqgetfloors } from '../../../API/index'
const HomeModule = {
  state: {
    // state中数据初始值根据返回的值来定义
    categoryList: [], // 自定义的三级联动数据数组
    bannerList: [], // 自定义banner图数据数组
    floorslist: [] // 自定义floors楼层数据数组
  },
  mutations: {
    // 用于修改三级联动数据
    CATEGORYLIST (state, categoryList) {
      state.categoryList = categoryList
    },
    // 用于修改banner图数据数组
    GETBANNERLIST (state, bannerList) {
      state.bannerList = bannerList
    },
    // 用于修改floors数据
    GETFLOORSLIST (state, floorslist) {
      state.floorslist = floorslist
    }
  },
  actions: {
    // 通过 API里面的接口，向服务器发请求，获取服务器的数据
    async categoryList ({ commit }) {
      const data = await reqCategoryList()
      if (data.code === 200) {
        commit('CATEGORYLIST', data.data)
      }
    },
    // 向服务器发请求获得banner数据
    async getbannerlist ({ commit }) {
      const data = await getmockListcontainer()
      console.log(data)
      if (data.status === 200) {
      //  console.log(data.data)
        commit('GETBANNERLIST', data.data)
      }
    },
    // 向服务器发送请求获取服务器的数据
    async getfloorslist ({ commit }) {
      const { data: res } = await reqgetfloors()
      console.log(res)
      if (res.status === 200) {
        console.log(res.data)
        commit('GETFLOORSLIST', res.data)
      }
    }
  },
  getters: {}
}
export default HomeModule

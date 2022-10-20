import Vue from 'vue'
import VueRouter from 'vue-router'
import TypeNav from '@/components/TypeNav'
import { routes } from '@/router/router.js'
import store from '@/store'
// 将三级联动组件注册为全局组件
// 第一个参数：组件名 第二个：那个组件
Vue.component(TypeNav.name, TypeNav)
Vue.use(VueRouter)
// 先把 vueRouter原型对象的push、replace保存
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重写push|replace
// 第一个参数：告诉原来push方法跳往哪里
//   2      :成功的回调
//   3      ：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    console.log(this)
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 加载滚动行为
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { top: 0 }
  }
})
router.beforeEach(async (to, from, next) => {
  const token = store.state.login.token
  const userinfo = store.state.login.userinfo
  // 进行守卫导航
  if (token) {
    // 存在token，用户已经登录了想去login，停留在首页
    if (to.path === '/login' || to.path === '/register') {
      next('/home')
    } else {
      // 想去其他页面
      // 如果有用户名就放行
      if (userinfo) {
        next()
      } else {
        // 没有用户信息，派发action让仓库存储用户信息在跳转
        try {
          await store.dispatch('getuserlogininfo')
          // 放行
          next()
        } catch (error) {
          // toekn失效,要清除token，回到登录页
          store.dispatch('quitlogin')
          next('/login')
        }
      }
    }
  } else {
    // 用户未登录不能进入 /center /shopcart /paysuccess /pay 区域
    const topath = to.path
    if (topath.indexOf('/trade') !== -1 || topath.indexOf('/pay') !== -1) {
      next('/login?redirect=' + topath)
    } else {
      next()
    }
  }
})
export default router

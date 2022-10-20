import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav/index.vue'
import carousel from '@/components/carousel/index.vue'
import pagination from '@/components/Pagination/index.vue'
import '../public/css/reset.css'

// 引入MockServe.js ---- mock数据
import '@/mock/mockServe.js'
// 引入Swiper样式
import 'swiper/css/swiper.css'
// 全局引入接口项,统一接口API文件里的全部请求函数
// 统一进行引入
import * as API from '../API/index.js'
// 按需引入elementui
import { Button, MessageBox } from 'element-ui'
import VueLazyload from 'vue-lazyload'
// 引入自定义插件
import myPlugins from '@/views/plugins/myPlugins.js'
// 引入表单校验插件
import '@/views/plugins/validate.js'
Vue.use(myPlugins, {
  name: 'upper'
})
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// 定义全局组件，第一个参数 组件名 第二个参数：哪个组件
Vue.component(TypeNav.name, TypeNav)
// 封装的轮播图组件
Vue.component(carousel.name, carousel)
// 分页器全局组件
Vue.component(pagination.name, pagination)
// 引入插件
Vue.use(VueLazyload, {
  // 懒加载的默认图片
  loading: require('../public/css/2.png')
})
Vue.config.productionTip = false
new Vue({
  // 设置全局总线
  beforeCreate () {
    // 安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')

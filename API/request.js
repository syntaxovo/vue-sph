// 对于axios进行一次封装
import axios from 'axios'
import nProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入store仓库
import store from '@/store'
// 利用axios对象的create去创建一个axios实例
// request 就是axios
const request = axios.create({
  // 配置对象
// 基础路径api
  baseURL: '/api',
  // 代表超时时间
  timeout: 5000
})
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求前做一些事情
// 请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
request.interceptors.request.use((config) => {
  // 现在的问题是config是什么?配置对象
  // 可以让进度条开始动
  if (store.state.detail.uuid_token) {
    // 请求头添加一个字段(userTempId):和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带token带给服务器
  if (store.state.login.token) {
    config.headers.token = store.state.login.token
  }
  nProgress.start()
  return config
})

// 相应拦截器
request.interceptors.response.use((res) => {
  // 成功的回调，服务器相应数据回来之后，相应看拦截器可以检测到去做一些事情
  // 进度跳结束
  nProgress.done()
  return res.data
}, (Error) => {
  // 相应失败的信息
  return Promise.reject(new Error('flase'))
})

export default request

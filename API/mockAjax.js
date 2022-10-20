// 对于axios进行一次封装
import axios from 'axios'
// 利用axios对象的create去创建一个axios实例
// request 就是axios
const mockAjaxrequest = axios.create({
  // 配置对象
// 基础路径api
  baseURL: '/mock',
  // 代表超时时间
  timeout: 5000
})
export default mockAjaxrequest
// 封装一个用于mock请求的axios

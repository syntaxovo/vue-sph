import { v4 as uuidv4 } from 'uuid'
// 随机生成一个字符串，且每次执行不能发生变换，游客身份持久存储
export const getuuid = () => {
// 先从本地存储获取UUid，先看看本地存储是否含有
  let UuidToken = localStorage.getItem('UUIDTOKEN')
  // 如果没有
  if (!UuidToken) {
    // 就生成临时身份
    UuidToken = uuidv4()
    // 本地存储存储一次
    localStorage.setItem('UUIDTOKEN', UuidToken)
  }
  return UuidToken
}

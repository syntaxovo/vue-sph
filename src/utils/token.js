// 本地持久化存储token
export const setToken = (token) => {
  localStorage.setItem('Token', token)
}
// 向外暴露token
export const gettoken = () => {
  return localStorage.getItem('Token')
}

// 清除token
export const removetoken = () => {
  return localStorage.removeItem('Token')
}

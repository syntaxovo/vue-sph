// 当前模块进行API的统一管理
import request from './request'
import mock from './mockAjax.js'
// 三级联动接口 商品分类接口
/**
 *  home主页中三级联动，获取列表数据
 * @returns
 */
export const reqCategoryList = () => {
  // 发请求
  return request({
    // 发请求
    url: '/product/getBaseCategoryList'

  })
}

/**
 * mock模拟获取轮播图的接口
 * @returns promise对象
 */
export const getmockListcontainer = () => {
  return mock({
    url: '/banner'
  })
}

/**
 * mock模拟获取楼层部分的数据接口
 * @returns promise对象
 */
export const reqgetfloors = () => {
  return mock({
    url: '/floor'
  })
}

/**
 *axios 获取search商品数据
 * @param {*} params
 * @returns  promise 对象
 */
// 当前这个函数需要外部传参
// 当前这个接口(获取搜索模块的数据)，给服务器传递一个默认参数[至少是一个空对象]
export const reqgetsearchAPI = (params) => {
  return request({
    url: '/list',
    method: 'post',
    data: params
  })
}

/**
 *  获取商品详情接口
 * @param {*} skuId
 * @returns promise对象
 */
// 需要传入点击的商品id
export const reqgetgoodsAPI = (skuId) => {
  return request({
    url: `/item/${skuId}`,
    method: 'GET'
  })
}

/**
 * 添加到购物车的接口
 * @param {*} skuId
 * @param {*} skuNum
 * @returns promise对象
 */
// 7.添加到购物车(对已有物品进行数量改动)
export const addorupdateCarsAPI = (skuId, skuNum) => {
  return request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'POST'
  })
}

/** 获取购物车信息
 *
 * @returns promise
 */
// 获取个人购物车信息
export const getpersonalcarAPI = () => {
  return request({
    url: '/cart/cartList'
  })
}

/** 删除购物车商品接口
 *
 * @param {*} skuId
 * @returns promise对象
 */
// 删除购物车商品接口
export const delcartbyIdAPI = (skuId) => {
  return request({
    url: `/cart/deleteCart/${skuId}`,
    method: 'DELETE'
  })
}

/** 切换商品选中状态接口
 *
 * @param {*} skuId
 * @param {*} isChecked
 * @returns promise对象
 */
export const changegoodsischeckedAPI = (skuId, isChecked) => {
  return request({
    url: `/cart/checkCart/${skuId}/${isChecked}`
  })
}

/**
 *  获取注册手机号的验证码
 * @param {*} phone
 * @returns
 */
export const getregistercodeAPI = (phone) => {
  return request({
    url: `/user/passport/sendCode/${phone}`
  })
}

/** 用于请求登录的接口
 *
 * @param {*} data{ phone, password,code, confirmpsd}
 * @returns
 */
export const userregisterAPI = (data) => {
  return request({
    url: '/user/passport/register',
    data,
    method: 'POST'
  })
}

/**
 * 请求数据实现用户登录
 * @param {*} data
 * @returns promise对象
 */
export const userTologinAPI = (data) => {
  return request({
    url: '/user/passport/login',
    data,
    method: 'POST'
  })
}

/**
 * 添加了token校验获取用户登录信息
 * @returns promise对象
 */
export const getuserlogininfoAPI = () => {
  return request({
    url: '/user/passport/auth/getUserInfo'

  })
}

/**
 * 实现用户退出登录API
 * @returns promise
 */
export const outloginAPI = () => {
  return request({
    url: '/user/passport/logout'
  })
}

/**
 * 获取用户的地址信息
 * @returns promise对象
 */
export const getAddresslistAPI = () => {
  return request({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'GET'
  })
}

/** 获取用户订单信息
 *
 * @returns promise
 */
export const getorderinfoAPI = () => {
  return request({
    url: '/order/auth/trade'
  })
}

/** 12.提交订单
 *
 * @param {*} tradeNo
 * @param {*} data
 * @returns
 */
export const submitOrderAPI = (tradeNo, data) => {
  return request({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'POST'
  })
}

/** 13.获取订单支付信息
 *
 * @param {*} orderId
 */
export const getpayinfoAPI = (orderId) => {
  return request({
    url: `/payment/weixin/createNative/${orderId}`
  })
}

/** 14.查询支付订单状态
 *
 * @param {*} orderId
 * @returns promise对象
 */
export const lookorderinfoAPI = (orderId) => {
  return request({
    url: `/payment/weixin/queryPayStatus/${orderId}`
  })
}

/** 11.获取我的订单列表 API
 *
 * @param {*} page
 * @param {*} limit
 * @returns promise对象
 */
export const getmineorderinfoAPI = (page, limit) => {
  return request({
    url: `order/auth/${page}/${limit}`
  })
}

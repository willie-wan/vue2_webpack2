import {
  request
} from './module/request'

/**
 * user相关接口api
 * 
 */
// 登录
export const login = (obj) =>
  request({
    url: 'login.app',
    data: obj.data
  })
// 是否登录
export const isLogin = (obj) =>
request({
  url: 'isLogin.action',
  method: 'GET'
},0)

/**
 * 产品相关接口api
 */

// 利活宝产品详情
export const getProductDetail = () =>
  request({
    url: 'lhbFirstTimeRechargeDetail.app'
  })

// 利活宝产品列表
export const getLhbList = (obj) =>
  request({
    url: 'queryLhbPrd.app'
  })

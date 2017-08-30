import {
  request
} from './module/request'

// 获取产品详情
export const getProductDetail = () =>
  request({
    url: 'lhbFirstTimeRechargeDetail.app'
  })

// 登录
export const login = (obj) =>
  request({
    url: 'login.app',
    data: obj.data
  })
// 利活宝产品列表
export const getLhbList = (obj) =>
  request({
    url: 'queryLhbPrd.app'
  })

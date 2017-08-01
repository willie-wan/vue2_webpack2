import {
  request
} from './module/request'

// 获取产品详情
export const getProductDetail = () =>
  request({
    url: 'lhbFirstTimeRechargeDetail.app'
  })

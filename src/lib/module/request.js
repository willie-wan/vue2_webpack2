import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import {encrypts} from './leadbase'
let mpubData = { //公共请求参数
  "terminal": "H5",
  "custId": localStorage.CUSTID ? md5(localStorage.CUSTID) : "",
  "token": localStorage.TOKEN || "",
  "reqTime":"Wed, 01 Nov 2017 10:26:38 GMT",
  "clientVersion":"3.7",
  "version": "3.7",
  "saleMercId": "LD",
  "channelCode": "LD"
}

// M站接口公共入参合并并加密
function RSAmergeDate(data,url) {
  console.log("%c"+url+"接口原始req参数为：\n", "color: green; font-weight: bold;font-size: 16px;",Object.assign({}, mpubData, data));
  return encrypts(JSON.stringify(Object.assign({}, mpubData, data)))
}

axios.defaults.baseURL = window.location.origin+"/front-gateway-web/";
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

export const request = function({method='post',url,data={}},isJm=1) {
  // 默认 参数需要加密
  if(isJm){
    return axios({
      method,
      url,
      data: qs.stringify({
        data: RSAmergeDate(data,url)
      })
    })
  } else {
    // 参数不加密   isJm传0 | false
    return axios({
      method,
      url,
      params: Object.assign({}, mpubData, data)
    })
  }
}


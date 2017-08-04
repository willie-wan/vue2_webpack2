import axios from 'axios'
import qs from 'qs'
import * as LeadBaseADM from './leadbase'
let mpubData = { //公共请求参数
  "terminal": "H5",
  "saleMercId": "LD",
  "reqTime": "Thu, 22 Dec 2016 06:25:57 GMT",
  "channelCode": "LD",
  "clientVersion": "3.6",
  "version": "1.0",
  "custId": localStorage.CUSTID || "",
  "token": localStorage.TOKEN || ""
}

// M站接口公共入参合并并加密
function RSAmergeDate(data) {
  console.log(JSON.stringify(Object.assign({}, mpubData, data)));
  return LeadBaseADM.encrypts(JSON.stringify(Object.assign({}, mpubData, data)))
}

axios.defaults.baseURL = window.location.origin+"/front-gateway-web/";
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

export const request = ({method='post',url,data={}}) =>
  axios({
    method,
    url,
    data: qs.stringify({
      data: RSAmergeDate(data)
    })
  })



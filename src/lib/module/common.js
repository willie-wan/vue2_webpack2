import * as rqApi from '@/lib/api'
import router from '@/router/index'
// 是否登录
export const isLogin = () =>
    rqApi.isLogin()
        .then(function (response) {
            console.log(response);
            // 未登录
            if (response.data.respCode == "777") {
                router.push({ path: '/login' });
            } else{
                // 已登录
                return Promise.resolve(response);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
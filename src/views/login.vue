<template>
    <div class="page page-current">
        <m-header title-text="登录"></m-header>
        <div class="content ld-content pd-details-box1" v-if="!loading">
            <form @submit.prevent="login">
                <div class="list-block">
                    <ul>
                        <li>
                            <div class="item-content">
                                <div class="item-media">
                                    <i class="icon icon-form-name"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title label">账户</div>
                                    <div class="item-input">
                                        <input type="text" placeholder="请输入账户" v-model="name" v-validate="'required:账户|mobile:账户'" name="name">
                                    </div>
                                </div>
                            </div>
                        </li>
                        
                        <li>
                            <div class="item-content">
                                <div class="item-media">
                                    <i class="icon icon-form-password"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title label">密码</div>
                                    <div class="item-input">
                                        <input type="password" placeholder="请输入密码" v-model="password" name="password" v-validate="'required:密码|'">
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-show="errors.all()[0]">
                    <span class="color-danger">{{ errors.all()[0] }}</span>
                </div>
                <div class="content-block">
                    <p>
                        <button class="button button-big button-round" type="submit" style="width:100%;">登录</button>
                    </p>
                </div>
            </form>
        </div>
        <m-loading v-if="loading"></m-loading>
    </div>
</template>
<script>
import router from '@/router/index'
import * as rqApi from '@/lib/api'
import Validator from '@/lib/mValid'

import MHeader from '@/components/header'
import MLoading from '@/components/loading'

export default {
    components: {
        MHeader,
        MLoading
    },
    data: () => ({
        loginInf: {},
        loading: 0,
        name: "",
        password: ""
    }),
    mounted() {

    },
    created(){
       
    },
    methods: {
        login() {
            let vm = this;
            vm.$validator.validateAll().then(result => {
                if(result){
                    vm.loading = 1;
                    rqApi.login({ 
                        data: { 
                            custMobile: vm.name, 
                            custLoginPsw: vm.password 
                        } 
                    })
                    .then(function (req) {
                        if (req.data.respCode == '000') {
                            let loginInf = req.data.data;
                            localStorage.CUSTID=loginInf.userInfoBean.custId;
                            localStorage.TOKEN=loginInf.userInfoBean.token;
                            vm.loading = 0;
                            router.push({ path: '/'});
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            });
        }
    }
}
</script>
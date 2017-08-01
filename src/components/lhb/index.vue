<template>
    <div class="page page-current nl-lhb-detais">
        <m-header></m-header>
        <footer>
            <button class="button button-round ld-button-block" @click="getLhbDetails">充值</button>
        </footer>
        <div class="content ld-content pd-details-box1">
            <m-banner :url="detailsInf.activeImageUrl" :hasClose='1'></m-banner>
            <div class="ele base-inf">
                <div class="item1">
                    <p>
                        <span class="c-f4c fz20">利活宝</span>
                        <span v-text="detailsInf.lhbIntroduce"></span>
                    </p>
                    <a :href="detailsInf.lhbIntroduceUrl" external="" class="link-more">更多</a>
                </div>
                <ul class="advantage-list">
                    <li>
                        <div class="img-con">
                            <img src="../../assets/img/ad/1.png" alt="">
                        </div>
                        <h3>快速</h3>
                        <p>最快
                            <span class="c-f4c">5秒</span>到账</p>
                    </li>
                    <li>
                        <div class="img-con">
                            <img src="../../assets/img/ad/2.png" alt="">
                        </div>
                        <h3>安全</h3>
                        <p>精选
                            <span class="c-f4c">货币基金</span>
                        </p>
                    </li>
                    <li>
                        <div class="img-con">
                            <img src="../../assets/img/ad/3.png" alt="">
                        </div>
                        <h3>稳定</h3>
                        <p>
                            <span class="c-f4c">低风险</span>首选</p>
                    </li>
                </ul>
            </div>
            <div class="ele lhb-vs-bankPro">
                <h3>充值1万元每日收益</h3>
                <div class="item item1">
                    <div class="l">
                        <label for="">利活宝</label>
                        <span>{{`${detailsInf.annualYieldRate} 年化(${detailsInf.dayGainDate})`}}</span>
                    </div>
                    <div class="c"></div>
                    <div class="r c-f4c" v-text="detailsInf.dayGain+'元'"></div>
                </div>
                <div class="item item2">
                    <div class="l">
                        <label for="">银行活期</label>
                        <span>0.35% 年化</span>
                    </div>
                    <div class="c"></div>
                    <div class="r">0.1元</div>
                </div>
            </div>
            <div class="lhb-pro-baseInf">
                <span>华安汇财通货币</span> 七日年化
                <span class="c-f4c">4.1000%</span>
                <span class="td-u">更换</span>
            </div>
        </div>
    </div>
</template>
<script>
import MHeader from '../header.vue'
import MBanner from '../banner.vue'
import * as rqApi from '../../store/index'
export default {
    components: {
        MHeader,
        MBanner
    },
    data() {
        return {
            detailsInf:{}
        }
    },
    mounted(){
        this.getLhbDetails();
    },
    methods: {
        getLhbDetails() {
            let vm=this;
            rqApi.getProductDetail()
                .then(function (req) {
                    if (req.data.respCode == '000') {
                        vm.detailsInf=req.data.data;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}
</script>
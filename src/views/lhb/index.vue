<template>
	<div class="page page-current nl-lhb-detais">
		<m-header title-text="利活宝"></m-header>
		<footer>
			<button class="button button-round ld-button-block" @click="beginRecharge">充值</button>
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
				<span v-text="curPro.productAbbreviation"></span> 七日年化
				<span class="c-f4c" v-text="curPro.yearlyRose">4.1000%</span>
				<span class="td-u" @click="$refs.modal.show()">更换</span>
			</div>
		</div>
		<m-modal ref="modal" tit-text="充值基金" tip-text="充值基金将自动与您的利活宝账户绑定，暂不支持修改。" :list-data="lhbList.lhbPrdList"></m-modal>
		<m-loading ref="loding"></m-loading>
	</div>
</template>
<script>
import {
	mapGetters
} from 'vuex'
import router from '@/router/index'
import MHeader from '@/components/header'
import MBanner from '@/components/banner'
import MLoading from '@/components/loading'
import MModal from '@/components/modal'
import * as rqApi from '@/lib/api'
import Bus from '@/store/bus'
import {isLogin} from "@/lib/module/common";
export default {
	components: {
		MHeader,
		MBanner,
		MLoading,
		MModal
	},
	data() {
		return {
			detailsInf: {},
			lhbList:{},
			curPro:{}
		}
	},
	computed: {
		...mapGetters([
			'getUserInfo'
		])
	},
	//组件实例化之前: 举个栗子：可以在这加个loading事件 
	beforeCreate() {
		// console.log('组件实例化之前');
		// console.log(this);
	},
	//组件实例化了:  在这结束loading，还做一些初始化，实现函数自执行
	created() {
		// console.log('组件实例化了');
		// console.log(this);
		this.getLhbDetails();
		this.getLhblist();
		let vm=this;
		// 监听产品列表组件click触发事件
		Bus.$on('changeSelectPro', function (item) {
			vm.curPro=item;
		})
	},
	//组件写入dom结构了:  在这发起后端请求，拿回数据，配合路由钩子做一些事情
	mounted() {
		// console.log('组件写入dom结构');
		// console.log(this);
	},
	methods: {
		// 获取利活宝详情详情
		getLhbDetails() {
			let vm = this;
			rqApi.getProductDetail()
				.then(function (req) {
					if (req.data.respCode == '000') {
						vm.detailsInf = req.data.data;
						vm.$refs.loding.hide();
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		// 点击“充值”
		beginRecharge() {
			isLogin().then(function(data){
				router.push({ path: '/lhbDetails' });
			})
		},
		// 获取利活宝产品列表
		getLhblist(){
			let vm = this;
			rqApi.getLhbList()
				.then(function (req) {
					if (req.data.respCode == '000') {
						vm.lhbList = req.data.data;
						if(vm.lhbList.lhbPrdList.length>0){
							vm.curPro=vm.lhbList.lhbPrdList[0];
						}
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}
}
</script>

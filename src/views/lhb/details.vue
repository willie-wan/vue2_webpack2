<template>
	<div class="page-group" id="page_lhb_details">
        <div class="page page-current" id="details_page">
            <header class="bar bar-nav ld-bar-nav">
                <a class="button button-link button-nav pull-left" href="javascript:history.go(-1);" external>
                    <span class="icon icon-left"></span>
                </a>
                <a class="button button-link button-nav pull-right" href="tradingList.html" external>交易记录</a>
                <h1 class="title">利活宝</h1>
            </header>
            <div class="bar bar-tab ld-bar-tab" v-if="detailsData.persFinaProCode">
                <div class="buttons-row">
                    <a href="#" class="button" v-on:click.stop.prevent="redeeom">提现</a>
                    <a href="#" class="button" v-on:click.stop.prevent="buy">充值</a>
                </div>
            </div>
            <div class="content ld-content pd-details-box">
                <div class="inf-ele">
                    <div class="ele pd-base-inf">
                        <div>持有金额（元）<i class="ico ico-eye" @click="showOrHideNum" :class="{'ico-eye-close': view.numState==1}"></i></div>
                        <div class="zy-num" v-text="view.numState==1 ? '*****' : detailsData.holdingAmount"></div>
                        <div class="fz13" v-if="detailsData.transitAmount!='0.00'"><span v-text="view.numState==1 ? '***' : detailsData.transitAmount"></span>元在途</div>
                        <div class="row pd-earnings-inf">
                            <dl class="col-50">
                                <dt>昨日收益（元）</dt>
                                <dd class="c-f4c fz18" v-text="view.numState==1 ? '***' : detailsData.yesterdayIncome"></dd>
                            </dl>
                            <dl class="col-50">
                                <dt>累计收益（元）</dt>
                                <dd class="c-f4c fz18" v-text="view.numState==1 ? '***' : detailsData.allIncome"></dd>
                            </dl>
                        </div>
                    </div>
                    <div class="ele">
                        <div class="buttons-tab ld-buttons-tab">
                            <a href="#char_tab1" class="tab-link" v-on:click.stop.prevent="chartTab(1)" :class="{'active':tabCur==1}">七日年化</a>
                            <a href="#char_tab2" class="tab-link" v-on:click.stop.prevent="chartTab(2)" :class="{'active':tabCur==2}">万份收益</a>
                        </div>
                        <div class="content-block ld-content-block">
                            <div class="tabs">
                                <div id="char_tab1" class="tab active">
                                    <div class="content-block">
                                        <div class="pd-chart-box">
                                            <canvas id="myChart1" style="width: 330px;height: 150px;"></canvas>
                                        </div>
                                        <span v-text="tabCur==1 ? '七日年化(％)' : '万份收益(元)'" class="c-cb4"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="inf-ele">
                    <ul class="pd-other-inf-list">
                        <li class="single no-row-right">
                            <a>
                                <div class="r-con pull-right"><span class="c-f80" v-text="detailsData.minValue"></span>起充</div>
                                <span class="lab">充值</span>
                            </a>
                        </li>
                        <li>
                            <a  v-on:click.stop.prevent="jupmRule(1)">
                                <div class="r-con pull-right">
                                    <div class="ele">现在充值：<span class="c-f80" v-text="detailsData.startIncomeTime"></span>产生收益<br><span class="c-f80" v-text="detailsData.incomeArriveTime"></span>首笔收益到账</div>
                                </div>
                                <span class="lab">收益</span>
                            </a>
                        </li>
                        <li>
                            <a  v-on:click.stop.prevent="jupmRule(2)">
                                <div class="r-con pull-right">
                                    <div class="ele">快速提现：单笔限<span class="c-f80" v-text="detailsData.singleTradeMaxValue"></span><br>单日限<span class="c-f80" v-text="detailsData.tardeMaxTimes"></span> <span class="c-f80">2小时</span>到账</div>
                                </div>
                                <span class="lab">提现</span>
                            </a>
                        </li>
                        <li class="single no-row-right">
                            <a>
                                <div class="r-con pull-right" v-text="detailsData.persFinaProName"></div>
                                <span class="lab">绑定</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="more-tip-box"><a :href="detailsData.moreUrl" class="button button-round" external>了解更多</a></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import router from "@/router/index";
import MHeader from "@/components/header";
import MBanner from "@/components/banner";
import MLoading from "@/components/loading";
import MModal from "@/components/modal";
import * as rqApi from "@/lib/api";
import Bus from "@/store/bus";
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
      baseUrl: window.location.origin,
      detailsData: {},
      tabCur: 1,
      view: {
        numState: localStorage.lhbDetailsNumState || 0
      }
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"])
  },
  //组件实例化之前: 举个栗子：可以在这加个loading事件
  beforeCreate() {
    // console.log('组件实例化之前');
    // console.log(this);
  },
  //组件实例化了:  在这结束loading，还做一些初始化，实现函数自执行
  created() {
      isLogin().then(function(data){
          console.log(data);
      })
  },
  //组件写入dom结构了:  在这发起后端请求，拿回数据，配合路由钩子做一些事情
  mounted() {
    // console.log('组件写入dom结构');
    // console.log(this);
  },
  methods: {
    // 展示/隐藏金额
    showOrHideNum: function() {
      this.view.numState = localStorage.lhbDetailsNumState =
        this.view.numState == 0 ? 1 : 0;
    },
    getProductDeatilsData: function() {
      var self = this;

      mBase.ifLogin(
        function() {
          MobileWebPublic.jumpLogin();
        },
        function() {
          LeadBase.ajax({
            url: MobileWebPublic.requestUrl + "lhbAgainRechargeDetail.app",
            data: {
              data: MobileWebPublic.margeArgJm({
                clientId: md5(localStorage.CUSTID || "")
              })
            },
            success: function(data) {
              var objData = JSON.parse(data);
              if (objData.respCode == "000") {
                self.detailsData = Object.freeze(objData.data);
                self.chartTab(1);
              }
            }
          });
        }
      );
    },
    chartTab: function(i) {
      var self = this;
      // 获取图表数据
      var chartData1 = self.getChartData(self.detailsData.rateList1);
      var chartData2 = self.getChartData(self.detailsData.rateList2);
      if (i == 1) {
        self.tabCur = 1;
        self.creatChart(chartData1);
      } else {
        self.tabCur = 2;
        self.creatChart(chartData2);
      }
    },
    redeeom: function() {
      var self = this;
      mBase.ifLogin(
        function() {
          MobileWebPublic.jumpLogin();
        },
        function() {
          if (self.detailsData.isRedeem == "false") {
            $.toast("暂无可提现份额");
          } else {
            window.location.href =
              "redeem.html?id=" + self.detailsData.persFinaProCode;
          }
        }
      );
    },
    buy: function() {
      var self = this;
      mBase.ifLogin(
        function() {
          MobileWebPublic.jumpLogin();
        },
        function() {
          window.location.href =
            "buy.html?id=" + self.detailsData.persFinaProCode;
        }
      );
    },
    // 获取图表所需数据
    getChartData: function(arr) {
      var chartData = {
        x: [],
        y: []
      };
      for (var i = 0; i < arr.length; i++) {
        chartData.x.push(arr[i].dateTime);
        chartData.y.push(arr[i].totalyield);
      }
      return chartData;
    },
    // 绘制图表
    creatChart: function(obj) {
      var ctx = document.getElementById("myChart1").getContext("2d");

      new Chart(ctx).Line(
        {
          labels: obj.x,
          datasets: [
            {
              label: "万份收益",
              fillColor: "#f8d8d0",
              strokeColor: "#f74c4c",
              pointColor: "#f74c4c",
              pointStrokeColor: "#f74c4c",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "#f74c4c",
              scaleFontColor: "#c8b4b4",
              data: obj.y
            }
          ]
        },
        {
          scaleFontColor: "#c8b4b4",
          tooltipFillColor: "#f74c4c",
          scaleOverride: true, //是否用硬编码重写y轴网格线
          scaleSteps: 6, //y轴刻度的个数
          scaleStepWidth: ((Math.max.apply(Math, obj.y) -
            Math.min.apply(Math, obj.y)) /
            6
          ).toFixed(4), //y轴每个刻度的宽度
          scaleStartValue: Math.min.apply(Math, obj.y), //y轴的起始值
          scaleShowGridLines: false,
          pointDot: false,
          //Number - Radius of each point dot in pixels
          pointDotRadius: 2,

          //Number - Pixel width of point dot stroke
          pointDotStrokeWidth: 1,

          //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
          pointHitDetectionRadius: 2,

          //Boolean - Whether to show a stroke for datasets
          datasetStroke: true,

          //Number - Pixel width of dataset stroke
          datasetStrokeWidth: 1,

          //Boolean - Whether to fill the dataset with a colour
          datasetFill: true,
          responsive: true,
          tooltipTemplate: "<%= value %>",
          segmentShowStroke: false
          // customTooltips : function (tooltip) {
          //     console.log(tooltip);
          // }
        }
      );
    },
    jupmRule: function(i) {
      tabCur = i;
      $.router.load("#rule_page");
    }
  }
};
</script>

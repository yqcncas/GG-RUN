(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myWallet/recharge"],{"174c":function(e,t,n){"use strict";(function(e,c){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("4795"));function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n,c,a,i,r){try{var o=e[i](r),u=o.value}catch(s){return void n(s)}o.done?t(u):Promise.resolve(u).then(c,a)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(c,a){var i=e.apply(t,n);function o(e){r(i,c,a,o,u,"next",e)}function u(e){r(i,c,a,o,u,"throw",e)}o(void 0)}))}}var u=function(){n.e("components/uni-popup/uni-popup").then(function(){return resolve(n("8f1d"))}.bind(null,n)).catch(n.oe)},s={components:{uniPopup:u},onLoad:function(){this.initRecharge()},data:function(){return{isChoice:!1,rechargeList:[],currentIndex:-1,elsePrice:" ",circleTapIndex:1,popupflag:0,isChoiceItem:{}}},methods:{isReader:function(){this.isChoice=!this.isChoice},addActive:function(e,t){this.currentIndex!=t?(this.currentIndex=t,this.isChoiceItem=e):this.currentIndex=-1},confirm:function(){this.isChoice?(this.popupflag=1,this.$nextTick((function(){this.$refs.popup.open()}))):e.showToast({icon:"none",title:"请认真阅读充值协议"})},realRecharge:function(){this.popupflag=2,this.$refs.popups.open()},circleTap:function(e){this.circleTapIndex=e},change:function(e){},initRecharge:function(){var e=this;return o(a.default.mark((function t(){var n;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$fetch(e.$api.rechargeInfo,{},"POST","FORM");case 2:n=t.sent,c("log",n," at pages\\myWallet\\recharge.vue:129"),0==n.code&&(e.rechargeList=n.rows);case 5:case"end":return t.stop()}}),t)})))()},showTip:function(){-1!=this.currentIndex&&e.showToast({icon:"none",title:"您已选择固定充值金额，请取消后在点击"})},rechargeSubmit:function(){var t=this;return o(a.default.mark((function n(){var i,r;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(-1==t.currentIndex){n.next=11;break}return n.next=3,t.$fetch(t.$api.userRecharge,{money:t.isChoiceItem.amount,payType:t.circleTapIndex},"Post","Form");case 3:i=n.sent,c("log",t.isChoiceItem.amount," at pages\\myWallet\\recharge.vue:148"),c("log",t.circleTapIndex," at pages\\myWallet\\recharge.vue:149"),c("log",i," at pages\\myWallet\\recharge.vue:150"),1===t.circleTapIndex&&e.requestPayment({provider:"alipay",orderInfo:i.msg,success:function(t){c("log","success:"+JSON.stringify(t)," at pages\\myWallet\\recharge.vue:157"),e.showToast({icon:"success",title:"支付成功"}),setTimeout((function(){e.navigateBack({delta:1})}),1e3)},fail:function(e){}}),2===t.circleTapIndex&&e.requestPayment({provider:"wxpay",orderInfo:i.data,success:function(t){c("log","success:"+JSON.stringify(t)," at pages\\myWallet\\recharge.vue:178"),e.showToast({icon:"success",title:"支付成功"}),setTimeout((function(){e.navigateBack({delta:1})}),1e3)},fail:function(e){}}),n.next=17;break;case 11:return n.next=13,t.$fetch(t.$api.userRecharge,{money:t.elsePrice,payType:t.circleTapIndex},"Post","Form");case 13:r=n.sent,c("log",r," at pages\\myWallet\\recharge.vue:199"),1===t.circleTapIndex&&e.requestPayment({provider:"alipay",orderInfo:r.msg,success:function(t){c("log","success:"+JSON.stringify(t)," at pages\\myWallet\\recharge.vue:205"),e.showToast({icon:"success",title:"支付成功"}),setTimeout((function(){e.navigateBack({delta:1})}),1e3)},fail:function(e){c("log","fail:"+JSON.stringify(e)," at pages\\myWallet\\recharge.vue:217")}}),2===t.circleTapIndex&&e.requestPayment({provider:"wxpay",orderInfo:r.data,success:function(t){c("log","success:"+JSON.stringify(t)," at pages\\myWallet\\recharge.vue:226"),e.showToast({icon:"success",title:"支付成功"}),setTimeout((function(){e.navigateBack({delta:1})}),1e3)},fail:function(e){c("log","fail:"+JSON.stringify(e)," at pages\\myWallet\\recharge.vue:238")}});case 17:case"end":return n.stop()}}),n)})))()},goToRichText:function(t){e.navigateTo({url:"../rich-text/rich-text?id="+t})}}};t.default=s}).call(this,n("6e42")["default"],n("0de9")["default"])},"4ffb":function(e,t,n){"use strict";var c={"uni-popup":function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"8f1d"))}},a=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return c}))},"8c9d":function(e,t,n){"use strict";n.r(t);var c=n("4ffb"),a=n("8d8d");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("e8a9");var r,o=n("f0c5"),u=Object(o["a"])(a["default"],c["b"],c["c"],!1,null,"1aa6dc57",null,!1,c["a"],r);t["default"]=u.exports},"8d8d":function(e,t,n){"use strict";n.r(t);var c=n("174c"),a=n.n(c);for(var i in c)"default"!==i&&function(e){n.d(t,e,(function(){return c[e]}))}(i);t["default"]=a.a},bb39:function(e,t,n){},d7be:function(e,t,n){"use strict";(function(e){n("7207"),n("921b");c(n("66fd"));var t=c(n("8c9d"));function c(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},e8a9:function(e,t,n){"use strict";var c=n("bb39"),a=n.n(c);a.a}},[["d7be","common/runtime","common/vendor"]]]);
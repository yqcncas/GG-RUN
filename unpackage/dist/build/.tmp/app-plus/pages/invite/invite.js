(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/invite/invite"],{"350c":function(t,e,n){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=s(n("4795")),c=s(n("80ce"));function s(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,i,a,c,s){try{var r=t[c](s),o=r.value}catch(u){return void n(u)}r.done?e(o):Promise.resolve(o).then(i,a)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(i,a){var c=t.apply(e,n);function s(t){r(c,i,a,s,o,"next",t)}function o(t){r(c,i,a,s,o,"throw",t)}s(void 0)}))}}var u={onLoad:function(t){var e=t.qrcode.slice(1,t.qrcode.length);this.qrcode=c.default+e,this.avatar=t.avatar,""===t.avatar&&(this.avatar="../../static/img/order/avatar.png"),this.userName=t.userName,this.inviteCode=t.inviteCode,this.sharUrl="http://yonghu.gglaisong.com/?inviteCode="+this.inviteCode,this.initRichText(),this.invitedStatics()},data:function(){return{qrcode:"",avatar:"",userName:"",RichText:[],inviteCode:"",sharUrl:"",subNum:0,subAmount:0}},methods:{goToBack:function(){t.navigateBack({delta:1})},invitedStatics:function(){var t=this;return o(a.default.mark((function e(){var n;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$fetch(t.$api.invitedStatics,{},"POST","FORM");case 2:n=e.sent,t.subAmount=n.data.amount,t.subNum=n.data.subNum;case 5:case"end":return e.stop()}}),e)})))()},shareWX:function(){t.share({provider:"weixin",scene:"WXSceneSession",type:0,href:this.sharUrl,title:"GG来送",summary:"我正在使用GG来送，赶紧跟我一起来体验！",imageUrl:"../../static/96.png",success:function(e){t.showToast({icon:"success",title:"分享成功"})},fail:function(e){t.showToast({icon:"success",title:"取消分享"})}})},shareFriends:function(){t.share({provider:"weixin",scene:"WXSenceTimeline",type:0,href:this.sharUrl,title:"GG来送",summary:"我正在使用GG来送，赶紧跟我一起来体验！",imageUrl:"../../static/96.png",success:function(e){t.showToast({icon:"success",title:"分享成功"})},fail:function(e){t.showToast({icon:"success",title:"取消分享"})}})},saveImage:function(){t.downloadFile({url:this.qrcode,success:function(e){200===e.statusCode&&t.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(){t.showToast({icon:"success",title:"保存成功"})},fail:function(){t.showToast({title:"保存失败，请稍后重试",icon:"none"})}})}})},initRichText:function(){var t=this;return o(a.default.mark((function e(){var n;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$fetch(t.$api.articleType,{type:6},"Post","Form");case 2:n=e.sent,i("log",n," at pages\\invite\\invite.vue:175"),0==n.code&&(t.RichText=n.data);case 5:case"end":return e.stop()}}),e)})))()},goToRichText:function(e){t.navigateTo({url:"../rich-text/rich-text?id="+e})}}};e.default=u}).call(this,n("6e42")["default"],n("0de9")["default"])},"4c6a":function(t,e,n){"use strict";var i=n("fbfd"),a=n.n(i);a.a},"8f13":function(t,e,n){"use strict";n.r(e);var i=n("350c"),a=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);e["default"]=a.a},"993b":function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return i}))},aed7:function(t,e,n){"use strict";n.r(e);var i=n("993b"),a=n("8f13");for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);n("4c6a");var s,r=n("f0c5"),o=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=o.exports},c49e:function(t,e,n){"use strict";(function(t){n("7207"),n("921b");i(n("66fd"));var e=i(n("aed7"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},fbfd:function(t,e,n){}},[["c49e","common/runtime","common/vendor"]]]);
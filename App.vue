<script>
	import versionAdmin from '@/config/version-admin.js'
	import { baseURL } from "@/config"
	export default {
		data(){
			return{
				provider:[]
			}
		},
		onLaunch: function() {
			// 检查版本更新
			// #ifdef APP-PLUS
			let system = uni.getSystemInfoSync()
			if (system.platform === 'android') {
				this.$fetch(this.$api.version,{type:1,userType:2},"GET",'form').then(res => {
					// console.log(res)
					if (res.code !== 0) throw res.msg
					versionAdmin.init(JSON.parse(res.msg))
				})
			} else if (system.platform === 'ios') {
				this.$fetch(this.$api.version,{type:2,userType:2},"GET",'form').then(res => {
					// console.log(res)
					if (res.code !== 0) throw res.msg
					versionAdmin.init(JSON.parse(res.msg))
				})
			}
			// #endif 
			
			
			this.$fetch(this.$api.newNoticeMsg, {type: 2}, "POST", 'FORM').then((res) => {
				console.log(res)
				uni.setStorageSync('gundongText', res.data.content)
				uni.setStorageSync('gundongSpeed', res.data.params.rollingSpeed)
			})
			
			
			uni.getProvider({
				service: "push",
				success: (e) => {
					this.provider = e.provider;
					this.openPush()
				},
				fail: (e) => {
					console.log("获取推送通道失败", e);
				}
			});
					
			// 监听系统通知栏
			// #ifdef APP-PLUS
			plus.push.addEventListener('click',function(msg){
				//处理点击消息的业务逻辑代码  
				let platform =  uni.getSystemInfoSync().platform
				if(platform == 'android'){
					uni.switchTab({
						url:'./pages/index/index'
					})
				}else{
					var payload;
					if (msg.type == "click") { //APP离线点击包含click属性，这时payload是JSON对象  
						payload = msg.payload;  
					} else { //APP在线，收到消息不会包含type属性,这时的payload是JSON字符串，需要转为JSON对象  
						payload = JSON.parse(msg.payload);  
					} 
					if(payload != null || payload != undefined){
						uni.switchTab({
							url:'./pages/index/index'
						})
					}
				}
			},false)
			//监听接收透传消息事件  
			plus.push.addEventListener('receive', function(msg){  
				//处理透传消息的业务逻辑代码 
				 console.log("(receive):" + JSON.stringify(msg)); 
				// plus.nativeUI.confirm(JSON.stringify(msg))
				let platform =  uni.getSystemInfoSync().platform
				//安卓处理
				if(platform == 'android'){
					// plus.nativeUI.confirm('安卓')
					var payload = JSON.parse(msg.payload)
					var messageTitle = payload.title;  
					var messageContent = payload.titleText; 
					plus.push.createMessage(messageContent,msg.payload,{title:messageTitle})
				}else{
					//ios处理
					// plus.nativeUI.confirm('ios')
					var payload = msg.payload;
					if(msg.aps == null && msg.type == "receive"){
						var messageTitle = payload.title;  
						var messageContent = payload.titleText;  
						//创建本地消息,发送的本地消息也会被receive方法接收到，但没有type属性，且aps是null  
						plus.push.createMessage(messageContent, JSON.stringify(payload), {title: messageTitle});
					}
				}
			}, false);
			// #endif


			//锁定屏幕
			plus.screen.lockOrientation('portrait-primary');
			console.log('App Launch')
			uni.removeStorageSync('sendAddress')
			uni.removeStorageSync('endAddress')
			uni.removeStorageSync('shopInfo')
			uni.removeStorageSync('discount')
			uni.removeStorageSync('takeTimer')
			uni.removeStorageSync('newAddressFlag')
			uni.removeStorageSync('clickAddressFlag')
		},
		onShow: function() {
			console.log('App Show')
	
		},
		onHide: function() { 
			console.log('App Hide')
		},
		methods:{
			openPush() {
				uni.subscribePush({
					provider: this.provider[0],
					success: (e) => {
						
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	///* #ifndef APP-PLUS-NVUE */
	@import "uview-ui/index.scss";
	
	page{
		width: 100%;
		height: 100%; 
	}
	/* 顶部阴影 */
	page::after {
		content: "";
		position: fixed;
		top: 0;
		/*  #ifdef H5 */
		top: 44px;
		/*  #endif  */
		left: 0;
		box-shadow: inset 0 4upx 8upx 0 rgb(244, 244, 244);
		z-index: 999;
		width: 750upx;
		height: 8upx;
	}
	.uni-system-preview-image {
			display: block;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			width: 100%;
			height: 100%;
			background: #000;
		}
	/* #endif */
</style>

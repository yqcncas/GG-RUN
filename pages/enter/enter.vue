<template>
	<view class="enter">
		<view class="enter-scroll" >
			<view v-if="platform == 'android'" class="enter-scroll">
				<view class="scroll-item" :class="{on:scrollIndex === 0}"  @tap="handleScrollList(0)">微信授权登录</view>
				
				<view class="scroll-item phone " :class="{on:scrollIndex === 1}" @tap="handleScrollList(1)">手机账号登录</view>
			</view>
		</view>
		<!-- 手机登录 -->
		<view v-show="scrollIndex === 1">
			<view class="enter-main">
				<view class="enter-phone">
					<view class="phone-header">
						<view class="phone-icon">
							<image src="../../static/img/order/newphone.png" mode="aspectFill"></image>
						</view>
						<view class="phone-title">手机</view>
					</view>
					<input type="number" v-model="phone" class="phone-input" placeholder="请输入您的手机号" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);"/>
				</view>
				
				<view class="enter-password">
					<view class="password-header">
						<view class="password-icon">
							<image src="../../static/img/index/slock2.png" mode="widthFix"></image>
						</view>
						<view class="password-title">{{isYzm ? '验证码' : '密码'}}</view>
					</view>
					<view class="enter-password-box">
						<input type="password" v-model="pwd" class="password-input" :placeholder="isYzmPlaceHoler" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);"/>
						<view class="getQrCode" v-show="isYzm" :class="{ getQrCodeing: !getYzm }" @click="handleGetYzm">{{getYzm ? '获取验证码' : countTimer + 's'}}</view>
										
					</view>
					
				</view>
			</view>
			<view class="enter-center">
				<view class="center-left" @tap="goToForgetPwd">忘记密码</view>
				<view class="center-left" @tap="yzmLogin">{{isYzm ? '密码登录' : '验证码登录'}}</view>
				<view class="center-right" @tap="goToRegister">注册账号</view>
			</view>
			<view class="enter-login">
			<view class="enter-login-inside" @tap="login">登录</view>
		</view>
		</view>
		<!-- 微信登录 -->
		<view v-if="platform != 'ios'">
			<view class="wx-login" v-if="scrollIndex == 0" @tap="wxLogin">
				<image src="../../static/img/index/53.png" mode="aspectFill"></image>
				<text>微信登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import jsencrypt from '@/js_sdk/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	export default {
		onLoad() {
			
			// uni.setStorageSync('loginFlag', 1)
			if(uni.getStorageSync('user_phone')) {
				this.phone = uni.getStorageSync('user_phone')
			}
			let data = uni.getSystemInfoSync();
			this.platform = data.platform;
			console.log(this.platform == 'android')
		},
		onHide() {
			uni.setStorageSync('loginFlag', 1)
		},
		onShow() {
			let data = uni.getSystemInfoSync();
			this.platform = data.platform;
		},
		data () {
			return{
				phone: '',
				pwd: '',
				scrollIndex:1,
				cid: '',
				uniId: '',
				nickName: '',
				avatarUrl: '',
				platform: '',
				isYzm: false,
				isYzmPlaceHoler: '请输入您的密码',
				getYzm: true, // 判断是否点击获取验证码
				countTimer: 60,
			}
		},
		methods: {
			handleScrollList(scrollIndex){
				this.scrollIndex = scrollIndex
				this.pwd = ""
			},
			async handleGetYzm () {
				if(!this.$u.test.mobile(this.phone)) return uni.showToast({icon:'none',title:'请输入正确的手机号'})
				if (!this.getYzm) return
				console.log(this.phone)
				var pubblicData = jsencrypt.setEncrypt(this.$api.publiukey, this.phone);
				
			
				let res = await this.$fetch(this.$api.customerPhone,{mobile:pubblicData}, 'GET', 'form')
				console.log(res);
				this.countTimer = 60
				this.getYzm = false
				const timer = setInterval(() => {
					if (this.countTimer <= 0) {
						clearInterval(timer)
						this.getYzm = true
					} else {
						this.countTimer--
					}
				}, 1000)
			},
			//到注册页面
			goToRegister () {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			//到修改密码
			goToForgetPwd () {
				uni.navigateTo({
					url:'../my/changePwd?status=0'
				})
			},
			// 验证码登录
			yzmLogin () {
				this.isYzm = !this.isYzm
				if (this.isYzm) {
					this.isYzmPlaceHoler = '请输入您的验证码'
				} else {
					this.isYzmPlaceHoler = '请输入您的密码'
				}
			},
			//登录
			async login () {
				
				if (this.phone.trim() === '' || this.pwd.trim() === "") {
					uni.showToast({
						icon: 'none',
						title: '请先输入手机或密码'
					})
					return
				}
				this.cid = plus.push.getClientInfo().clientid
				let res
				if (this.isYzm) {
					res = await this.$fetch(this.$api.customer_mobile_login,{loginName: this.phone,checkCode : this.pwd,cid:this.cid},'POST',"Form")
				} else {
					res = await this.$fetch(this.$api.customerLogin,{loginName: this.phone,password: this.pwd,cid:this.cid},'POST',"Form")
				}
				this.resMsg = res.msg
				if (res.code == 0) {
					uni.setStorageSync('token',res.data.token)
					uni.setStorageSync('redInfoFlag', 1)
					uni.showToast({
						icon:'success',
						title: '登录成功'
					})
					setTimeout(() => {
						uni.switchTab({
							url:'../my/my'
						})
					},1500)
				} else {
					uni.showToast({
						icon:'none',
						title: res.msg
					})
					uni.setStorageSync('redInfoFlag', 0)
				}
				
			},
			wxLogin () {
				uni.showLoading({
					title: '正在登陆中...'
				})
				
				uni.login({
				  provider: 'weixin',
				  success:  async(loginRes) => {
					  console.log(loginRes.authResult)
					  this.uniId = loginRes.authResult.unionid
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success:  (infoRes) => {
				        
						this.nickName = infoRes.userInfo.nickName
						this.avatarUrl = infoRes.userInfo.avatarUrl

				      }
				    });
					uni.hideLoading()
					let res = await this.$fetch(this.$api.customerWx,{cid:this.cid,unionId:loginRes.authResult.unionid},'POST','FORM')
					
					if (res.code !== 0) {
						uni.showToast({
							icon:'none',
						    title: '暂未绑定手机号',
						});
						setTimeout(()=>{
							uni.navigateTo({
								url: '../register/register?wxlogin=' + 1 + '&unionId=' + this.uniId + '&nickName=' + this.nickName + '&avatarUrl=' + this.avatarUrl
							})
						},1000)
					} else {
						uni.setStorageSync('token',res.data.token)
						
						uni.switchTab({
							url: '../my/my'
						})
						
						
					}
					
				   
				  }
				});
			}
		}
	}
</script>

<style lang="less">
	.enter{
		width: 100%;
		.enter-scroll{
			width: 100%;
			height: 160rpx;
			display: flex;
			justify-content: center;align-items: center;
			.scroll-item{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,62,0.30);
				position: relative;
				padding-bottom: 10rpx;
				box-sizing: border-box;
				&.iosNoShow{
					display: none;
				}
				&.phone{
					margin-left: 90rpx;
					box-sizing: border-box;
				}
				&.on{
					font-family: PingFangSC-Semibold;
					font-size: 14px;
					color: #5468FF;
					&:after{
						width: 30%;
					}
				}
				&::after{
					content: '';
					width: 0;
					height: 0;
					border-bottom: 4rpx solid #5468FF;
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					transition: 0.5s;
				}
			}
		}
		.enter-main{
			padding-left: 80rpx;
			padding-right: 80rpx;
			padding-top: 110rpx;
			box-sizing: border-box;
			.enter-phone{
				border-bottom: 1rpx solid #F7F7FA;
				box-sizing: border-box;
				.phone-header{
					display: flex;
					align-items: center;
					margin-bottom: 38rpx;
					box-sizing: border-box;
					.phone-icon{
						image{
							width: 28rpx;
							height: 38rpx;
							
						}
					}
					.phone-title{
						font-family: PingFangSC-Semibold;
						font-size: 14px;
						color: #09023E;
						font-weight: bold;
						margin-left: 30rpx;
						box-sizing: border-box;
					}
				}
				.phone-input{
					width: 100%;
					margin-bottom: 20rpx;
					box-sizing: border-box;
					padding-left: 60rpx;
					box-sizing: border-box;
					font-size: 16px;
				}
			}
			.enter-password{
				padding-top: 40rpx;
				border-bottom: 1rpx solid #F7F7FA;
				box-sizing: border-box;
				.password-header{
					display: flex;
					align-items: center;
					margin-bottom: 38rpx;
					box-sizing: border-box;
					.password-icon{
						
						image{
							width: 28rpx;
							height: 38rpx;
							transform: translateY(-2rpx);
						}
					}
					.password-title{
						font-family: PingFangSC-Semibold;
						font-size: 14px;
						color: #09023E;
						font-weight: bold;
						margin-left: 30rpx;
						box-sizing: border-box;
					}
				}
				.enter-password-box{
					display: flex;
					justify-content: space-between;
				}
				.password-input{
					width: 100%;
					margin-bottom: 20rpx;
					box-sizing: border-box;
					padding-left: 60rpx;
					box-sizing: border-box;
					font-size: 16px;
					position: relative;
				}
				.getQrCode{
					width: 180rpx;
					height: 48rpx;
					text-align: center;
					line-height: 48rpx;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #5468FF;
					border: 2rpx solid #5468FF;
					border-radius: 2px;
					
					&.getQrCodeing{
						color: #909399;
						border: 2rpx solid #909399;
					}
				}
			}
		}
		.enter-center{
			width: 100%;
			padding: 0 80rpx;
			padding-top: 40rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.center-left,.center-right{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,62,0.30);
			}
		}
		.enter-login{
			margin: 0 auto;
			margin-top: 150rpx;
			width: 532rpx;
			height: 92rpx;
			line-height: 92rpx;
			text-align: center;
			transform: rotate(-360deg);
			border: 1px solid #5468FF;
			border-radius: 23px;
			border-radius: 23px;
			box-sizing: border-box;
			padding: 4rpx;
			.enter-login-inside{
				width: 100%;
				height: 100%;
				text-align: center;
				line-height: 86rpx;
				border-radius: 23px;
				border-radius: 23px;
				background-color: #5468FF;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
			}
			
		}
		.wx-login{
				margin: 400rpx 30rpx 0 30rpx;
				width: 690rpx;
				height: 90rpx;
				background: #5468FF;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				color: #FFFFFF;
				border-radius: 22px;
				image{
					width: 58rpx;
					height: 46rpx;
					margin-right: 20rpx;
				}
			}
	}
</style>

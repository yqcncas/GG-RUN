<template>
	<view class="register">
		<!-- <input type="number" maxlength="11"  v-model="userPhone" class="register-item" placeholder="请输入手机号" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);letter-spacing: -0.34px;"></input> -->
		<view class="input-box">
			<input type="number" maxlength="11"  v-model="userPhone"  placeholder="请输入手机号" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);letter-spacing: -0.34px;"></input>
		</view>
		<view class="code-box">
			<input type="text"  v-model="code" class="register-oode" placeholder="请输入验证码" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);letter-spacing: -0.34px;"></input>
			<view class="get-code" @tap="getCode" :class="{timer:computedTimer}">{{getYzm?'获取验证码':computedTimer+'s'}}</view>
		</view>
		<view class="input-box" v-if="!wxlogin">
			<input type="password"  v-model="userPwd" class="register-item" placeholder="请输入密码" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);letter-spacing: -0.34px;">
		</view>
		<view class="input-box" v-if="!wxlogin">
			<input type="password"  v-model="userSecPwd" class="register-item" placeholder="请重复密码" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: rgba(9,2,62,0.30);letter-spacing: -0.34px;">
		</view>
		<view class="register-center">
			<view class="register-circle" :class="{on:isReader}" @tap="handleIsReader"></view>
			<view class="register-agree" @tap="handleIsReader">已阅读并同意</view>
			<view class="register-protocol" @tap="goToRichText">《平台用户协议》</view>
		</view>
		<view class="register-submit" @tap="formSubmit">确定</view>
	</view>
</template>

<script>
	import jsencrypt from '@/js_sdk/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	export default {
		onLoad (options) {
			console.log(plus.push.getClientInfo())
			this.cid = plus.push.getClientInfo().clientid
			console.log(options)
			if( options.wxlogin) {
				console.log('进入')
				this.wxlogin = options.wxlogin
				this.uniId = options.unionId
				this.nickName = options.nickName
				this.avatarUrl = options.avatarUrl
			}
			
		},
		data () {
			return {
				//是否是微信进来
				wxlogin: '',
				uniId: '',
				
				isReader: true,
				//验证码，倒计时
				getYzm: true,
				computedTimer: 0,
				//手机号
				userPhone: '',
				//验证码
				code: '',
				yzm: '',
				//密码
				userPwd: '',
				//重复密码
				userSecPwd: '',
				//邀请码
				inviteCode: '',
				resMsg: '',
				cid: '',
				checkPhone: '',
				nickName: '',
				avatarUrl: ''
			}
		},
		methods: {
			checkPhoneNumber() {
				let reg = /^1[3456789]\d{9}$/;
				if (reg.test(this.userPhone)) {
					this.checkPhone = false
					return true
				} else {
					this.checkPhone = true
					return false
				}
			},
			//改阅读
			handleIsReader() {
				this.isReader = !this.isReader
			},
			//验证码
			async getCode () {
				this.checkPhoneNumber()
				
				if (!this.getYzm) return
				
				if(this.userPhone.trim() == '' ) {
					uni.showToast({
						icon: 'none',
						title: '请先输入手机号'
					})
					return
				} 
				
				if (this.checkPhone) {
					uni.showToast({
						icon: 'none',
						title: '请检查手机号输入是否正确'
					})
					return
				}
				
				this.getYzm = false 
				this.computedTimer = 60
				const timer = setInterval(() => {
					if (this.computedTimer === 0) {
						clearInterval(timer)
						this.getYzm = true
					} else {
						this.computedTimer--
					}
				},1000)
				var pubblicData= jsencrypt.setEncrypt(this.$api.publiukey,this.userPhone);
				let res = await this.$fetch(this.$api.customerPhone,{mobile:pubblicData},'GET','form')
				console.log(res)
				this.yzm = res.msg
			},
			//提交
			async formSubmit () {
				if (!this.wxlogin) {
					
				
				if (this.userPhone.trim() == '' || this.code.trim() == '' || this.userPwd == '' || this.userSecPwd == '') {
					uni.showToast({
						icon:'none',
						title:'请填写信息后进行注册'
					})
					return
				}
				if (this.userPwd != this.userSecPwd) {
					uni.showToast({
						icon:'none',
						title: '两次输入的密码不一致'
					})
					return
				}
				// if (this.yzm !== this.code) {
				// 	uni.showToast({
				// 		icon:'none',
				// 		title: '验证码输入错误'
				// 	})
				// 	return
				// }
				if (!this.isReader){
					uni.showToast({
						icon:'none',
						title: '请认真阅读平台用户协议'
					})
					return
				}
				let res = await this.$fetch(this.$api.customerUser,{mobile: this.userPhone,checkCode: this.code,password: this.userPwd,inviteCode: this.inviteCode,cid:this.cid},'POST','form')
				if (res.code === 0) {
					uni.showToast({
						icon: 'success',
						title: '注册成功'
					})
					
					let msg = await this.$fetch(this.$api.customerLogin,{loginName: this.userPhone,password: this.userPwd,cid:this.cid},'POST',"Form")
					if (msg.code == 0) {
						uni.setStorageSync('token',msg.data.token)
						// uni.showToast({
						// 	icon:'success',
						// 	title: '登录成功'
						// })
						setTimeout(() => {
							uni.switchTab({
								url:'../my/my'
							})
						},1500)
					} else {
						uni.showToast({
							icon:'none',
							title: msg.msg
						})
					}
					
					// setTimeout(() => {
					// 	uni.reLaunch({
					// 		url: '../enter/enter'
					// 	})
					// },1500)
				} else {
					uni.showToast({
						icon: 'none',
						title: res.msg
					})
				}
				} else {
					//微信注册
					console.log({avatarUrl:this.avatarUrl,nickName:this.nickName,mobile: this.userPhone,checkCode: this.code,inviteCode: this.inviteCode,cid:this.cid,unionId:this.uniId})
					let res = await this.$fetch(this.$api.customerUser,{avatarUrl:this.avatarUrl,nickName:this.nickName,mobile: this.userPhone,checkCode: this.code,inviteCode: this.inviteCode,cid:this.cid,unionId:this.uniId},'POST','form')
					
					if (res.code === 0) {
						
						
						
						let msg = await this.$fetch(this.$api.customerWx,{cid:this.cid,unionId:this.uniId},'POST','FORM')
						
						
						if (msg.code === 0) {
							uni.setStorageSync('token',msg.data.token)
							uni.switchTab({
								url: '../my/my'
							})
						} else {
							uni.showToast({
								icon:'none',
								title:res.msg
							})
						}
						
					} else {
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
				}
			},
			//协议
			async goToRichText () {
				
				uni.navigateTo({
					url: '../rich-text/rich-text?id='+ 2
				})
			}
		}
	}
</script>

<style lang="less">
	.register{
		padding: 0 30rpx;
		box-sizing: border-box;
		// .register-item{
		// 	width: 100%;
		// 	height: 100rpx;
		// 	border-bottom: 1rpx solid #F7F7FA;
		// 	box-sizing: border-box;
		// 	font-size: 16px;
		// }
		.input-box{
			width: 100%;
			height: 100rpx;
			// padding: 0 30rpx;
			font-size: 16px;
			border-bottom: 1rpx solid #F7F7FA;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;

		}
		.code-box{
			display: flex;
			width: 100%;
			height: 100rpx;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #F7F7FA;
			box-sizing: border-box;
			.register-oode{
				width: 70%;
				font-size: 14px;
			}
			.get-code{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #5468FF;
				letter-spacing: 0;
				text-align: right;
				&.timer{
					color: #ccc;
				}
			}
		}
		.register-center{
		
			padding-top: 150rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.register-circle{
				width: 32rpx;
				height: 32rpx;
				border-radius: 50%;
				border: 1rpx solid #ccc;
				box-sizing: border-box;
				&.on{
					background: url(../../static/img/my/choice.png) no-repeat;
					background-size: cover;
					border: none;
					box-sizing: border-box;
				}
			}
			.register-agree{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,-2147483648,0.30);
				line-height: 20px;
				margin-left: 20rpx;
				box-sizing: border-box;
			}
			.register-protocol{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #7888ff;
				line-height: 20px;
			}
		}
		.register-submit{
			margin-top: 40rpx;
			box-sizing: border-box;
			width: 690rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: #5468FF;
			border-radius: 4px;
			border-radius: 4px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #FFFFFF;
		}
	}
	
</style>

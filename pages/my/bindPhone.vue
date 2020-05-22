<template>
	<view class="bindPhone">
		<view class="bindPhone-header">
			<view class="my-phone">我的手机号</view>
			<view class="phone-number">{{phone}}</view>
		</view>
		<view class="change-box">
			<view class="changButton-pwd" @tap="goToChangePwd">使用密码更换手机号</view>
			<view class="changButton-phone" @tap="goToChangPhone">使用手机号更换手机号</view>
		</view>
		<pwdModel :show = "pwdmodelShow" @close = "close" @pwd = "pwd" :phone = "phone"></pwdModel>
		<phoneModel :show = "phoneModelShow" @close = "closePhone" @code = "code" :phone = "phone" :phoneYzm = "phoneYzm"></phoneModel>
	</view>
</template>

<script>
	import pwdModel from '@/components/pwdModel/pwdModel.vue'
	import phoneModel from '@/components/verification/verification.vue'
	export default {
		onLoad () {
			
				let phone = uni.getStorageSync('user_phone')
				this.phone = phone
				
				console.log(this.phone)
			
		},
		data () {
			return {
				pwdmodelShow: false,
				phoneModelShow: false, 
				phone: '',
				phoneYzm: ''
				
			}
		},
		components:{
			pwdModel,
			phoneModel
		},
		methods: {
			//用手机号
			async goToChangPhone () {
				this.phoneModelShow = true
				let res = await this.$fetch(this.$api.customerPhone,{mobile:this.phone,length:6},'GET','form')
				console.log(res);
				if (res.code == 0) {
					// this.phoneYzm = res.msg
				} else {
					uni.showToast({
						icon: 'none',
						title: '获取验证码失败'
					})
				}
				
			},
			//用密码
			goToChangePwd () {
				this.pwdmodelShow = true
			},
			//关闭密码弹框
			close () {
				this.pwdmodelShow = false
			},
			//关闭手机弹框
			closePhone () {
				this.phoneModelShow = false
			},
			//验证密码
			async pwd (index) {
				
				let token = uni.getStorageSync('token')
				let res = await this.$fetch(this.$api.checkPwd,{mobile:this.phone,pwd:index,token:token},"POST","form")
				
				if (res.code === 0) {
					uni.showToast({
						icon:'success',
						title: res.msg
					})
					setTimeout(() => {
						uni.redirectTo({
							url:'./changePhone'
						})
					},1500)
				} else {
					uni.showToast({
						icon:'none',
						title: res.msg
					})
				}
			},
			async code (index) {
				
				
					let token = uni.getStorageSync('token')
					let res = await this.$fetch(this.$api.checkMobile,{mobile:this.phone,checkCode: index,token:token},"POST","form")
					
					if (res.code === 0) {
						uni.showToast({
							icon:'success',
							title: res.msg
						})
						setTimeout(() => {
							uni.redirectTo({
								url:'./changePhone'
							})
						},1500)
					}else {
						uni.showToast({
						icon: 'none',
						title: res.msg
					})
				}
			
				
			}
			
			
		},
		
		
	}
</script>

<style lang="less">
	.bindPhone{
		width: 100%;
		height: 100%;
		background-color: rgb(246,246,250);
		.bindPhone-header{
			width: 100%;
			height: 100rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			box-sizing: border-box;
			.my-phone{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023E;
				letter-spacing: -0.34px;
			}
			.phone-number{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023E;
				letter-spacing: -0.34px;
				text-align: right;
			}
		}
		.change-box{
			width: 100%;
			display: flex;
			margin-top: 50rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			.changButton-pwd{
				width: 330rpx;
				height: 90rpx;
				line-height: 90rpx;
				background: #FF8516;
				border-radius: 2px;
				border-radius: 2px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
				text-align: center;
			}
			.changButton-phone{
				width: 330rpx;
				height: 90rpx;
				line-height: 90rpx;
				margin-left: 30rpx;
				box-sizing: border-box;
				background: #5468FF;
				border-radius: 2px;
				border-radius: 2px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
				text-align: center;
			}
		}
	}
</style>

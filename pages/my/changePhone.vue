<template>
	<view class="changePhone">
		<view class="changePhone-header">
			<view class="set-phone">设置新号码</view>
			<view class="phone-tip">更换手机号后，个人信息不变，需要使用新号码重新登录。</view>
		</view>
		<view class="changePhone-item">
			<view class="item-left">新手机号</view>
			<input type="number" class="item-right" v-model="userPhone" maxlength="11" style="width: 70%;"></input>
		</view>
		<view class="changePhone-item">
			<view class="item-left">
				<view>验证码</view>
				<!-- <view class="getCode" @tap="getCode" :class="{timer:computedTime}">{{getYzm? '获取验证码': computedTime+'s'}}</view> -->
				<view class="getCode" @tap="getCode" :class="{timer:computedTimer}">{{getYzm?'获取验证码':computedTimer+'s'}}</view>
			</view>
			<input class="joinCode" v-model="yzm" placeholder="请输入验证码" style="text-align: right; color: #000000;" placeholder-style="text-align: right;" ></input>
		</view>
		<view class="submit" @tap="submit">确定</view>
	</view>
</template>

<script>
	export default {
		data () {
			return{
				computedTimer: 0,
				getYzm: true,
				userPhone: '',
				code: '',
				yzm: ''
			}
		},
		methods: {
			//获取验证码
			async getCode () {
				if (!this.getYzm) return
				
				if(this.userPhone.trim() == '' ) {
					uni.showToast({
						icon: 'none',
						title: '请先输入手机号'
					})
					return
				} else if (this.userPhone.length != 11 ) {
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
				let res = await this.$fetch(this.$api.customerPhone,{mobile:this.userPhone},'GET','form')
				if (res.code === 0) {
					this.code = res.msg
				}
				
			},
			//提交
			async submit () {
				let token = uni.getStorageSync('token')
				if (this.userPhone.trim() == '' || this.yzm.trim() === '') {
					uni.showToast({
						icon: 'none',
						title: '请先填写相关信息'
					})
					return
				}
				
				
				let res = await this.$fetch(this.$api.updMobile,{checkCode:this.yzm,mobile:this.userPhone,token:token},"POST","form")
			
				if (res.code === 0) {
					uni.showToast({
						icon: 'success',
						title: '修改成功'
					})
					uni.removeStorageSync('token');
					
					setTimeout(() => {
						uni.reLaunch({
							url:'../enter/enter'
						})
					},1500)
				} else {
					uni.showToast({
						icon: 'none',
						title: res.msg
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.changePhone{
		width: 100%;
		height: 100%;
		background-color: rgb(246,246,250);
		.changePhone-header{
			width: 100%;
			height: 208rpx;
			padding: 30rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid rgb(246,246,250);
			background-color: #fff;
			.set-phone{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #09023E;
				letter-spacing: -0.41px;
				font-weight: bold;
				margin-bottom: 20rpx;
				box-sizing: border-box;
			}
			.phone-tip{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,62,0.30);
				letter-spacing: -0.34px;
			}
		}
		.changePhone-item{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			border-bottom: 1rpx solid rgb(246,246,250);
			&:last-child {
				border-bottom: none;
			}
			.item-left{
				display: flex;
				align-items: center;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023E;
				letter-spacing: -0.34px;
			}
			.item-right{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023E;
				letter-spacing: -0.34px;
				text-align: right;
			}
			.joinCode{
				width: 200rpx;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,62,0.30);
				letter-spacing: -0.34px;
				text-align: right;
			}
			.getCode{
				width: 260rpx;
				margin-left: 30rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #5468FF;
				letter-spacing: 0;
				text-align: left;
				&.timer{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					letter-spacing: 0;
				}
			}
		}
		.submit{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 750rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: #5468FF;
			border-radius: 2px;
			border-radius: 2px;
			box-sizing: border-box;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #FFFFFF;
		}
	}
</style>

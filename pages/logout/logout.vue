<template>
	<view class="logout">
		<view class="logout-title">
			账号注销后，将清空以下权益和资产：
		</view>
		<view class="font-box">
			<view>1、账户优惠券及余额等权益</view>
			<view>2、身份、账号、会员及权益信息</view>
			<view>3、账户优惠券3余额等权益</view>
			<view>4、GG产品将无法使用原注册手机号登录及注册</view>
		</view>
		<view class="logout-bottom">
			<view class="circle" v-show="isCircle" @tap="handleCircle"></view>
			<image src="../../static/img/my/choice.png" mode="aspectFill" v-show="!isCircle" @tap="handleCircle"></image>
			<view @tap="handleCircle" class="reader">已阅读并同意</view>
			<view class="protocol">《用户注销协议》</view>
		</view>
		<view class="next">下一步</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				isCircle: true
			}
		},
		methods: {
			handleCircle () {
				this.isCircle = !this.isCircle
				console.log(this.isCircle)
			}
		}
	}
</script>

<style lang="less">
	.logout{
		padding: 30rpx;
		box-sizing: border-box;
		.logout-title{
			font-family: PingFangSC-Semibold;
			font-size: 17px;
			font-weight: bold;
			color: #09023E;
			letter-spacing: -0.41px;
		}
		.font-box{
			margin: 30rpx 0;
			box-sizing: border-box;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #09023E;
			letter-spacing: -0.34px;
			view{
				margin-top: 20rpx;
				box-sizing: border-box;
			}
		}
		.logout-bottom{
			width: 100%;
			height: 40rpx;
			display: flex;
			align-items: center;
			.circle{
				width: 32rpx;
				height: 32rpx;
				border-radius: 50%;
				border: 1rpx solid #ccc;
				box-sizing: border-box;
			}
			.reader{
				margin-left: 20rpx;
				box-sizing: border-box;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(9,2,-2147483648,0.30);
				line-height: 20px;
			}
			.protocol{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #5569ff;
				line-height: 20px;
			}
			image{
				width: 32rpx;
				height: 32rpx;
			}
		}
		.next{
			width: 100%;
			height: 90rpx;
			text-align: center;
			line-height: 90rpx;
			background: #5468FF;
			border-radius: 2px;
			border-radius: 2px;
			box-sizing: border-box;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #FFFFFF;
			position: fixed;
			left: 0;
			bottom: 0;
		}
	}
</style>

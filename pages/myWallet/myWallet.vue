<template>
	<view class="my-wallet">
		<view class="wallet-header">
			<view class="all">总余额</view>
			<view class="price">¥{{totalPrice}}</view>
			<view class="recharge" @tap="goToRecharge">去充值</view>
		</view>
		<view class="wallet-item" @tap="goTobillDetail">
			<view class="item-left" >账单明细</view>
			<image src="../../static/img/my/right.png" mode="aspectFill" ></image>
		</view>
		<view class="wallet-item" @tap="goToDiscount">
			<view class="item-left">优惠券</view>
			<image src="../../static/img/my/right.png" mode="aspectFill" ></image>
		</view>
	<!-- 	<view class="wallet-item" @tap="goToRechargeDiscount">
			<view class="item-left">充值优惠券</view>
			<image src="../../static/img/my/right.png" mode="aspectFill" ></image>
		</view> -->
		<view class="wallet-item" @tap="goToInvioce">
			<view class="item-left">发票管理</view>
			<image src="../../static/img/my/right.png" mode="aspectFill" ></image>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.initMyInfo()
		},
		onShow() {
			this.initMyInfo()
		},
		data () {
			return {
				
				totalPrice: ''
			}
		},
		onPullDownRefresh () {
			this.initMyInfo()
			uni.stopPullDownRefresh()
		},
		methods: {
			//跳转充值
			goToRecharge () {
				uni.navigateTo({
					url: './recharge'
				})
			},
			//账单明细
			goTobillDetail () {
				uni.navigateTo({
					url: './billDetail'
				})
			},
			//开票管理
			goToInvioce () {
				uni.navigateTo({
					url: 'invioce'
				})
			},
			//到优惠券
			goToDiscount () {
				uni.navigateTo({
					url:'../discount/discount?status=' + 0
				})
			},
			//到充值优惠券
			goToRechargeDiscount () {
				uni.navigateTo({
					url:'../rechargeDiscount/rechargeDiscount'
				})
			},
			async initMyInfo () {

					let res = await this.$fetch(this.$api.currentUser,{},"GET","form")
					console.log(res)
					if (res.code === 0) {
						
						this.totalPrice = res.data.amount.toFixed(2)
					
					} else {
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
			},
		}
	}
</script>

<style lang="less">
	page::after{
		display: none;
	}
	.my-wallet{
		width: 100%;
		height: 100%;
		background-color: rgb(246,246,250);
		.wallet-header{
			width: 100%;
			height: 356rpx;
			background: url(../../static/img/my/mywallet.png) no-repeat;
			background-size: cover;
			display: flex;
			flex-direction: column;
			// justify-content: space-between;
			align-items: center;
			.all{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(255,255,255,0.70);
				margin-top: 60rpx;
				box-sizing: border-box;
			}
			.price{
				font-family: PingFangSC-Semibold;
				font-size: 30px;
				color: #FDCB2E;
				margin: 20rpx 0;
				box-sizing: border-box;
			}
			.recharge{
				border: 1px solid rgba(255,255,255,0.40);
				border-radius: 15px;
				border-radius: 15px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				margin-bottom: 72rpx;
				padding: 10rpx 38rpx;
				box-sizing: border-box;
			}
		}
		.wallet-item{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			padding: 0 30rpx;
			border-bottom: 1rpx solid rgb(246,246,250);
			&:last-child {
				border-bottom: none;
			}
			box-sizing: border-box;
			.item-left{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #09023E;
				letter-spacing: -0.34px;
			}
			image{
				width: 16rpx;
				height: 26rpx;
			}
		}
	}
</style>

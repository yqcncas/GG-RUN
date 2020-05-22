<template>
	<view class="history-detail">
		<view class="hd-header">
			<view class="hd-title">{{type == 0 ? "电子发票" : "纸质发票"}}</view>
			<view class="hd-header-box">
				<view class="box-item">
					<view class="item-left">发票抬头</view>
					<view class="item-right">{{historyInfo.invoiceRise}}</view>
				</view>
				<view class="box-item">
					<view class="item-left">企业税号</view>
					<view class="item-right">{{historyInfo.dutyParagraph}}</view>
				</view>
				<view class="box-item">
					<view class="item-left">发票金额</view>
					<view class="item-right">¥{{historyInfo.totalAmount}}</view>
				</view>
				<view class="box-item">
					<view class="item-left">申请时间</view>
					<view class="item-right">{{historyInfo.createTime}}</view>
				</view>
			</view>
		</view>
		<view class="hd-middle" v-if="type == 1">
			<view class="middle-title">接收信息</view>
			<view class="middle-item">
				<view class="item-left user">收件人</view>
				<view class="item-right">{{historyInfo.name}}</view>
			</view>
			<view class="middle-item">
				<view class="item-left">联系电话</view>
				<view class="item-right">{{historyInfo.mobile}}</view>
			</view>
			<view class="middle-item">
				<view class="item-left">详细地址</view>
				<view class="item-right">{{historyInfo.address}}</view>
			</view>
		</view>
		<view class="hd-bottom" @tap="goToNewInvioceDetail(historyInfo.orderIds)">
			<view class="bottom-left">包含{{historyInfo.orderIds.length}}个订单</view>
			<image src="../../static/img/my/right.png" mode="aspectFill"></image>
		
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.type = options.type
			this.historyInfo = JSON.parse(options.info)
			console.log(this.historyInfo)
			this.historyInfo.orderIds = this.historyInfo.orderIds.split(",")
		},
		data () {
			return {
				type: '',
				historyInfo: {}
			}
		},
		methods:{
			goToNewInvioceDetail (orderIds) {
				uni.navigateTo({
					url: 'historyNewDeatail?orderIds=' + JSON.stringify(orderIds)
				})
			} 
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgb(247,247,250);
	}
	.history-detail{
		.hd-header{
			background-color: #fff;
			padding: 40rpx 0 30rpx 30rpx ;
			border-bottom: 1rpx solid #F7F7FA;
			box-sizing: border-box;
			.hd-title{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #09023E;
				font-weight: bold;
			}
			.hd-header-box{
				
				.box-item{
					margin-top: 20rpx;
					box-sizing: border-box;
					display: flex;
					.item-left{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(9,2,62,0.30);
						letter-spacing: -0.34px;
					}
					.item-right{
						margin-left: 30rpx;
						box-sizing: border-box;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #09023E;
						letter-spacing: -0.34px;
					}
				}
			}
		}
		.hd-middle{
			background-color: #fff;
			padding: 40rpx 0 30rpx 30rpx;
			box-sizing: border-box;
			.middle-title{
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #09023E;
				letter-spacing: -0.41px;
				font-weight: bold;
			}
			.middle-item{
				display: flex;
				margin-top: 20rpx;
				box-sizing: border-box;
				.item-left{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(9,2,62,0.30);
					margin-right: 30rpx;
					box-sizing: border-box;
					&.user{
						letter-spacing: 6.26px;
						margin-right: 18rpx;
						box-sizing: border-box;
					}
				}
				.item-right{
					
					
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #09023E;
					letter-spacing: -0.34px;
				}
			}
		}
		.hd-bottom{
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx;
			border-top: 1rpx solid #F7F7FA;
			box-sizing: border-box;
			background-color: #fff;
			.bottom-left{
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
